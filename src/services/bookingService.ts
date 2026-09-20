import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';
import { db, BARBERSHOP_ID } from '../lib/firebase';
import { AppointmentRecord, AppointmentEventRecord, PublicAvailabilityRecord } from '../types';
import { generateSlotKey } from './barbershopData';

export interface BookingSubmissionParams {
  barbershopId?: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  price: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
}

export interface BookingResult {
  success: boolean;
  appointmentId?: string;
  slotKey?: string;
  error?: 'SLOT_ALREADY_TAKEN' | 'NETWORK_ERROR' | 'UNKNOWN';
  message?: string;
}

/**
 * Real-time listener for public availability of a selected date.
 * Note: Only reads the 'publicAvailability' collection/subcollection,
 * which contains ONLY slotKey and status, COMPLETELY PROTECTING customer privacy!
 */
export function subscribeToPublicAvailability(
  dateStr: string,
  onUpdate: (occupiedSlots: Set<string>) => void,
  onError?: (err: Error) => void
) {
  // Query public availability documents for this barbershop and this specific date
  const publicCol = collection(db, 'barbershops', BARBERSHOP_ID, 'publicAvailability');
  const q = query(publicCol, where('date', '==', dateStr));

  return onSnapshot(
    q,
    (snapshot) => {
      const occupied = new Set<string>();
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as PublicAvailabilityRecord;
        if (data.status === 'occupied') {
          occupied.add(data.slotKey);
        }
      });
      onUpdate(occupied);
    },
    (err) => {
      console.warn('Real-time availability listener warning:', err);
      if (onError) onError(err);
    }
  );
}

/**
 * ATOMIC FIRESTORE TRANSACTION:
 * Guarantees that even if 2 users click confirm at the exact same millisecond:
 * 1. Verifies availability in transaction.
 * 2. Creates the deterministic slot in publicAvailability atomically.
 * 3. Saves the private appointment record.
 * 4. Dispatches the notification event for the future Push Notification / Barbershop Owner Panel.
 */
export async function bookAppointmentAtomic(params: BookingSubmissionParams): Promise<BookingResult> {
  const barbershopId = params.barbershopId || BARBERSHOP_ID;
  const slotKey = generateSlotKey(params.date, params.time);

  // References inside the barbershop subcollections
  const slotDocRef = doc(db, 'barbershops', barbershopId, 'publicAvailability', slotKey);
  const appointmentDocRef = doc(collection(db, 'barbershops', barbershopId, 'appointments'));
  const eventDocRef = doc(collection(db, 'barbershops', barbershopId, 'appointmentEvents'));

  try {
    await runTransaction(db, async (transaction) => {
      // 1. Check if the slot is already occupied
      const slotSnapshot = await transaction.get(slotDocRef);

      if (slotSnapshot.exists()) {
        const slotData = slotSnapshot.data();
        if (slotData?.status === 'occupied') {
          throw new Error('SLOT_ALREADY_TAKEN');
        }
      }

      // 2. Prepare atomic payload for public availability (privacy-safe, no personal info)
      const publicAvailabilityData: PublicAvailabilityRecord = {
        slotKey,
        barbershopId,
        date: params.date,
        time: params.time,
        status: 'occupied',
        updatedAt: serverTimestamp()
      };

      // 3. Prepare complete appointment record
      const appointmentData: AppointmentRecord = {
        appointmentId: appointmentDocRef.id,
        barbershopId,
        customerName: params.customerName.trim(),
        customerPhone: params.customerPhone.trim(),
        serviceId: params.serviceId,
        serviceName: params.serviceName,
        price: params.price,
        date: params.date,
        time: params.time,
        slotKey,
        status: 'confirmed',
        createdAt: serverTimestamp(),
        source: 'booking-biosite'
      };

      // 4. Prepare Event record for the future Owner Notification Panel & Cloud Functions FCM
      const eventData: AppointmentEventRecord = {
        eventId: eventDocRef.id,
        eventType: 'APPOINTMENT_CREATED',
        barbershopId,
        appointmentId: appointmentDocRef.id,
        customerName: params.customerName.trim(),
        customerPhone: params.customerPhone.trim(),
        serviceName: params.serviceName,
        price: params.price,
        date: params.date,
        time: params.time,
        slotKey,
        createdAt: serverTimestamp(),
        consumedByPush: false
      };

      // Execute atomic writes
      transaction.set(slotDocRef, publicAvailabilityData);
      transaction.set(appointmentDocRef, appointmentData);
      transaction.set(eventDocRef, eventData);
    });

    return {
      success: true,
      appointmentId: appointmentDocRef.id,
      slotKey
    };
  } catch (error: any) {
    if (error?.message === 'SLOT_ALREADY_TAKEN') {
      return {
        success: false,
        error: 'SLOT_ALREADY_TAKEN',
        message: 'Esse horário acabou de ser reservado 😕'
      };
    }
    console.error('Error during atomic booking transaction:', error);
    return {
      success: false,
      error: 'NETWORK_ERROR',
      message: 'Não foi possível conectar ao sistema de agendamentos. Tente novamente.'
    };
  }
}

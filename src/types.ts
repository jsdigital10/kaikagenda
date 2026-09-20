export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  durationMinutes: number;
  description: string;
  badge?: string;
  iconType: 'fade' | 'scissors' | 'beard' | 'sparkles' | 'eyebrows' | 'razor';
}

export interface AppointmentSlot {
  slotKey: string; // e.g. "2026-09-20_10-15"
  date: string; // "YYYY-MM-DD"
  time: string; // "10:15"
  status: 'available' | 'occupied';
  isPast?: boolean;
}

export interface CustomerData {
  name: string;
  phone: string;
}

export interface AppointmentRecord {
  appointmentId: string;
  barbershopId: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  price: number;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:mm"
  slotKey: string;
  status: 'confirmed';
  createdAt: any; // Firestore serverTimestamp
  source: 'booking-biosite';
}

export interface AppointmentEventRecord {
  eventId: string;
  eventType: 'APPOINTMENT_CREATED';
  barbershopId: string;
  appointmentId: string;
  customerName: string;
  customerPhone: string;
  serviceName: string;
  price: number;
  date: string;
  time: string;
  slotKey: string;
  createdAt: any;
  consumedByPush: boolean;
}

export interface PublicAvailabilityRecord {
  slotKey: string;
  barbershopId: string;
  date: string;
  time: string;
  status: 'occupied';
  updatedAt: any;
}

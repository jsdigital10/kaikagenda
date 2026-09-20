import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';

// Initialize Firebase App instance safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Target Firestore Database instance
// Use custom firestoreDatabaseId if configured in project, otherwise default
const firestoreDbId = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? firebaseConfig.firestoreDatabaseId
  : undefined;

export const db = firestoreDbId ? getFirestore(app, firestoreDbId) : getFirestore(app);

// Unique Barbershop identifier prepared for future multi-tenant owner panel
export const BARBERSHOP_ID = 'barber_elite_central';
export const BARBERSHOP_PHONE = '5538998146155';
export const BARBERSHOP_PHONE_DISPLAY = '(38) 99814-6155';

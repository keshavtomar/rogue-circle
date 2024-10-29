import { db } from "../admin/firebase"; // Import your Firebase config
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';

// Function to increment appointmentsCount after adding an appointment
export async function incrementAppointmentCount() {
  const statsRef = doc(db, 'stats', '1');
  await updateDoc(statsRef, {
    appointmentsCount: increment(1), // Increments by 1
  });
}

// Function to decrement appointmentsCount after deleting an appointment
export async function decrementAppointmentCount() {
  const statsRef = doc(db, 'stats', '1');
  await updateDoc(statsRef, {
    appointmentsCount: increment(-1), // Decrements by 1
  });
}
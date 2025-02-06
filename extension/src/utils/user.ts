import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

// Generate a random 5-digit number
function generateUserId(): string {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

// Check if user ID exists and generate a new one if it does
export async function getUniqueUserId(): Promise<string> {
  let userId = generateUserId();
  let exists = true;
  
  while (exists) {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('user_id', '==', userId));
    const querySnapshot = await getDocs(q);
    
    exists = !querySnapshot.empty;
    if (exists) {
      userId = generateUserId();
    }
  }
  
  return userId;
}

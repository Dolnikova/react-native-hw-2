import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA-8N_QM7fkNhXGtBU3pSFAaUcnM6aPK-4',
  authDomain: 'rn-social-c6424.firebaseapp.com',
  projectId: 'rn-social-c6424',
  storageBucket: 'rn-social-c6424.appspot.com',
  messagingSenderId: '246187138688',
  appId: '1:246187138688:web:d3609f92e8ae7b6ac09065',
  measurementId: 'G-5SDNGWQF8X',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);
export const auth = getAuth(firebase);
export const user = auth.currentUser;

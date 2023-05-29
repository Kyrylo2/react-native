import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCYxykxOlzKXTJoD-VY6iPLN2WVe3bOmvY',
  authDomain: 'rn-hw-5723b.firebaseapp.com',
  projectId: 'rn-hw-5723b',
  storageBucket: 'rn-hw-5723b.appspot.com',
  messagingSenderId: '237066552676',
  appId: '1:237066552676:web:b84b1994b718bb56d1a671',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// /

// export default app;
const auth = getAuth();
// const analytics = getAnalytics(app);
// const auth = getAuth(app);

const storage = getStorage(firebase);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebase);

export default firebase;

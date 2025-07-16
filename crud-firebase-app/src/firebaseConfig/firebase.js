import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCsxMTXUKIOcT3MPad6NI1orAWWaebOFp4",
  authDomain: "react-crud-db-2210a.firebaseapp.com",
  projectId: "react-crud-db-2210a",
  storageBucket: "react-crud-db-2210a.firebasestorage.app",
  messagingSenderId: "510587913187",
  appId: "1:510587913187:web:c9fc4a360819dee39a96d6"
};

const app = initializeApp(firebaseConfig);

// conexion a la base de datos
export const db = getFirestore(app)
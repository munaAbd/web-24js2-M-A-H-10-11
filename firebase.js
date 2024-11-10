import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; 
const firebaseConfig = {
  apiKey: "AIzaSyBYfM-rE0-YySeomIYfXrWTas1MaoSW8tk",
  authDomain: "myreactapp-1e39d.firebaseapp.com",
  databaseURL: "https://myreactapp-1e39d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "myreactapp-1e39d",
  storageBucket: "myreactapp-1e39d.appspot.com",
  messagingSenderId: "849724674597",
  appId: "1:849724674597:web:4d5a262f5478a84547e5cc",
  measurementId: "G-PEXCJCHRRG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app); 
export { db, analytics };

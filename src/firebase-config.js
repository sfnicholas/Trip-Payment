// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBtJHI1OqYLGpAJwcJ5iL3DOvsfilajWg",
  authDomain: "trip-payment-bcca6.firebaseapp.com",
  projectId: "trip-payment-bcca6",
  storageBucket: "trip-payment-bcca6.appspot.com",
  messagingSenderId: "479403437471",
  appId: "1:479403437471:web:017190a3b43f82d56c21aa",
  measurementId: "G-P2Q3QHZLG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);  

export { db };
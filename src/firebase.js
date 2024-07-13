// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getMessaging, getToken } from "firebase/messaging";
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
// const analytics = getAnalytics(app);

// Add the public key generated from the console here.
getToken(messaging, {vapidKey: 
  process.env.REACT_APP_WEB_PUSH_CERT
});

// Initialize Cloud Firestore and get a reference to the service
export const db = getDatabase(app);
export const init = () => {
  console.log("Firebase Init");
}
export function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      messaging
        .getToken({ vapidKey: process.env.REACT_APP_WEB_PUSH_CERT })
        .then((token) => {
          console.log(`푸시 토큰 발급 완료 : ${token}`)
        })
        .catch((err) => {
          console.log('푸시 토큰 가져오는 중에 에러 발생')
        })
    } else if (permission === 'denied') {
      console.log('푸시 권한 차단')
    }
  })
}
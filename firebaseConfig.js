// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD1UrKo3tkLcAvM0PIK8eNVEJlCttEg6GI",
    authDomain: "studentassessmentdashboa-23340.firebaseapp.com",
    projectId: "studentassessmentdashboa-23340",
    storageBucket: "studentassessmentdashboa-23340.appspot.com",
    messagingSenderId: "382351852374",
    appId: "1:382351852374:web:015d481b1b5e3933858cf7",
    measurementId: "G-MJQH7M305F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };


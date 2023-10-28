import {initializeApp} from "firebase/app";
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestoreDB = getFirestore(app);
export default auth;








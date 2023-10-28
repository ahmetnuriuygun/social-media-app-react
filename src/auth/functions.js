import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import auth, {firebase, firestoreDB} from "./firebase";

import {addDoc, collection, orderBy, query} from "firebase/firestore";

export const userConverter = {
    toFirestore: function (dataInApp) {
        return {
            firstName: dataInApp.firstName,
            lastName: dataInApp.lastName,
            email: dataInApp.email,
            password: dataInApp.password,
            birthDate: dataInApp.birthDate,
            gender: dataInApp.gender,
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return {...data, id: snapshot.id, ref: snapshot.ref}
    }
};
export const createUser = async (firstName,lastName,email,password,birthDate,gender,navigate) => {
    try {
        let userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        addUser(firstName,lastName,email,password,birthDate,gender);
        navigate("/home");
        console.log(userCredential);
    } catch (err) {
        alert(err.message)
    }
}

export const signIn = async(email,password,navigate) =>{
    try{
        let userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        navigate("/home");
        // sessionStorage.setItem("user",JSON.stringify(userCredential.user));
    }catch(err){
        alert(err.message)
    }
}

export const logOut = () =>{
    signOut(auth)
        .then(()=>{

        })
        .catch((error)=>{
            alert(error.message)
        });
}

export const userObserver = (setCurrentUser) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrentUser(user);
        } else {
            // User is signed out
            setCurrentUser(false);
        }
    });
};

export function addUser(firstName,lastName,email,password,birthDate,gender){
    const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        birthDate: birthDate,
        gender: gender,
    }
    const collectionRef = collection(firestoreDB, 'Users').withConverter(userConverter)

    try {
        addDoc(collectionRef, newUser);
        console.log("add dummy person done");
    } catch {
        console.log("ERROR add dummy person NOT done")
    }
}


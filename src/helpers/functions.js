import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import auth, {firestoreDB} from "./firebase";
import {serverTimestamp} from 'firebase/firestore'

import {addDoc, arrayUnion, collection, updateDoc} from "firebase/firestore";
import {toastErrorNotify, toastInfoNotify, toastSuccessNotify} from "./toastNotify";


export const userConverter = {
    toFirestore: function (dataInApp) {
        return {
            firstName: dataInApp.firstName,
            lastName: dataInApp.lastName,
            email: dataInApp.email,
            password: dataInApp.password,
            birthDate: dataInApp.birthDate,
            gender: dataInApp.gender,
            friends: [],
            posts: [],
            postsAmount: 0,
            friendsAmount: 0,
            isPremium: 'start',
            profileImg: "",
            city: "",
            country: "",
            receiveFriendRequest: [],
            sendFriendRequest: [],
            workPlace: "",
            highschool: "",
            university: "",
            hometown: "",
            relationship: "",
            phoneNumber: "",
            biography: "",
            hobby: "",
            lastLikeInfo: "",
            lastCommentInfo: ""
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return {...data, id: snapshot.id, ref: snapshot.ref}
    }
};


export const postConverter = {
    toFirestore: function (dataInApp) {
        return {
            text: dataInApp.text,
            comments: [],
            likesAmount: 0,
            ownerId: dataInApp.ownerId,
            photoUrl: dataInApp.photoUrl,
            arrayOfLikedUsers: [],
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return {...data, id: snapshot.id, ref: snapshot.ref}
    }
};


export const createUser = async (firstName, lastName, email, password, birthDate, gender, navigate) => {
    try {
        let userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        addUser(firstName, lastName, email, password, birthDate, gender);
        navigate("/home");
        toastSuccessNotify("Welcome Friend Space family!🥳")

    } catch (err) {
        toastErrorNotify(`${err.message}`)
    }
}

export const signIn = async (email, password, navigate) => {
    try {
        let userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        toastSuccessNotify("You signed in successfully!");

        navigate("/home");

    } catch (err) {
        toastErrorNotify(`${err.message}`)
    }
}

export const logOut = async (navigate) => {
    signOut(auth)
        .then(() => {
            navigate("/");
            toastSuccessNotify(`You signed out successfully`)
        })
        .catch((error) => {
            toastErrorNotify(`${error.message}`)
        });
}

export const userObserver = (setSigned) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setSigned(user);
        } else {
            setSigned(false);
        }
    });
};

export function addUser(firstName, lastName, email, password, birthDate, gender) {
    const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        birthDate: birthDate,
        gender: gender,
        posts: [],
        friends: [],
        postsAmount: 0,
        friendsAmount: 0,
        isPremium: 'start',
        profileImg: "",
        city: "",
        country: "",
        receiveFriendRequest: [],
        sendFriendRequest: [],
        arrayOfLikedUsers: [],
        workPlace: "",
        highschool: "",
        university: "",
        hometown: "",
        relationship: "",
        phoneNumber: "",
        biography: "",
        hobby: "",
        lastLikeInfo: "",
        lastCommentInfo: ""
    }
    const collectionRef = collection(firestoreDB, 'Users').withConverter(userConverter)

    try {
        addDoc(collectionRef, newUser);
    }
    catch(err) {
        toastErrorNotify(err.message)
    }
}

export const addPost = async (text, ownerId, photoUrl, currentUser,navigate) => {
    try{
        const date = serverTimestamp();
        const docRef = await addDoc(collection(firestoreDB, "Posts"), {
            text: text,
            comments: [],
            likesAmount: 0,
            ownerId: ownerId,
            photoUrl: photoUrl,
            arrayOfLikedPersons: [],
            created: date,
        });
        updateDoc(currentUser.ref, {posts: arrayUnion(docRef.id)}).then(()=>{
            navigate("/home");
            toastInfoNotify("Post shared successfully.")
        })
    }

    catch(err){
        toastErrorNotify("Oops,A problem is occurred while sharing post")
    }
}




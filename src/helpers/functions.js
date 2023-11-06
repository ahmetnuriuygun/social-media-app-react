import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import auth, {firestoreDB} from "./firebase";

import {addDoc, arrayUnion, collection, updateDoc} from "firebase/firestore";


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
    } catch (err) {
        alert(err.message)
    }
}

export const signIn = async (email, password, navigate) => {
    try {
        let userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        navigate("/home");
    } catch (err) {
        alert(err.message)
    }
}

export const logOut = (navigate) => {
    signOut(auth)
        .then(() => {
            navigate("/");
        })
        .catch((error) => {
            alert(error.message)
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
    }
    const collectionRef = collection(firestoreDB, 'Users').withConverter(userConverter)

    try {
        addDoc(collectionRef, newUser);
    } catch {
    }
}

export async function addPost(text, ownerId, photoUrl, currentUser) {

    const docRef = await addDoc(collection(firestoreDB, "Posts"), {
        text: text,
        comments: [],
        likesAmount: 0,
        ownerId: ownerId,
        photoUrl: photoUrl,
        arrayOfLikedPersons: [],

    });
    updateDoc(currentUser.ref, {posts: arrayUnion(docRef.id)})


}




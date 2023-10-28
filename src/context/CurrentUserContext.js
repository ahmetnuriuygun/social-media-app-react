import {createContext, useContext, useEffect, useState} from "react";
import {collection, orderBy, query} from "firebase/firestore";
import {firestoreDB} from "../auth/firebase";
import {userConverter, userObserver} from "../auth/functions";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {AuthContext} from "./AuthContext";

export const CurrentUserContext = createContext();

const CurrentUserProvider = ({children}) => {
    const collectionRef = collection(firestoreDB, 'Users').withConverter(userConverter)
    const queryRef = query(collectionRef, orderBy("firstName"))
    const [users, loading, error] = useCollectionData(queryRef);

    const signedUser = useContext(AuthContext);
    const currentUser =   users?.filter(u=>signedUser.currentUser.email===u.email)



    return(
        <CurrentUserContext.Provider value={currentUser}>
            {children}
        </CurrentUserContext.Provider>
    )
}
export default CurrentUserProvider;
import {createContext, useContext, useEffect, useState} from "react";
import {collection, orderBy, query} from "firebase/firestore";
import {firestoreDB} from "../helpers/firebase";
import {userConverter, userObserver} from "../helpers/functions";
import {useCollectionData} from "react-firebase-hooks/firestore";

export const CurrentUserContext = createContext();

const CurrentUserProvider = ({children}) => {
    const collectionRef = collection(firestoreDB, 'Users').withConverter(userConverter)
    const queryRef = query(collectionRef, orderBy("firstName"))
    const [users, loading, error] = useCollectionData(queryRef);
    const [signed, setSigned] = useState();

    useEffect(() => {
        // setCurrentUser(JSON.parse(sessionStorage.getItem("user")));
        userObserver(setSigned);
    }, []);

    const signedUser = {signed}
    const currentUser =   users?.filter(u=>signedUser.signed.email===u.email)[0]



    return(
        <CurrentUserContext.Provider value={currentUser}>
            {children}
        </CurrentUserContext.Provider>
    )
}
export default CurrentUserProvider;
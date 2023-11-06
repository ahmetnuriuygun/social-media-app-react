import {createContext} from "react";
import {collection, orderBy, query} from "firebase/firestore";
import {firestoreDB} from "../helpers/firebase";
import {userConverter} from "../helpers/functions";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {CurrentUserContext} from "./CurrentUserContext";

export const UsersContext = createContext();

const UsersProvider = ({children}) => {
    const collectionRef = collection(firestoreDB, 'Users').withConverter(userConverter)
    const queryRef = query(collectionRef, orderBy("firstName"))
    const [users] = useCollectionData(queryRef);
    return (
        <UsersContext.Provider value={users}>
            {children}
        </UsersContext.Provider>
    )
}

export default UsersProvider;
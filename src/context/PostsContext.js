import {createContext} from "react";
import {collection, orderBy, query} from "firebase/firestore";
import {firestoreDB} from "../helpers/firebase";
import {postConverter, userConverter} from "../helpers/functions";
import {useCollectionData} from "react-firebase-hooks/firestore";

export  const PostsContext = createContext();

const PostsProvider = ({children}) =>{
    const collectionRef = collection(firestoreDB, 'Posts').withConverter(postConverter)
    const queryRef = query(collectionRef, orderBy("ownerId"))
    const [posts, loading, error] = useCollectionData(queryRef);
    console.log(posts)
    return(
        <PostsContext.Provider value={posts}>
            {children}
        </PostsContext.Provider>
    )
}

export default PostsProvider;
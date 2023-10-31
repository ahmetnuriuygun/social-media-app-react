import {NavigationBar} from "../Components/Navbar";
import {LeftSidebar} from "../Components/LeftSidebar";
import {RandomPictures} from "../Components/RandomPictures";
import {PostInput} from "../Components/PostInput";
import {Posts} from "../Components/Posts";
import {useContext, useMemo} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {RightSidebar} from "../Components/RightSidebar";
import {ThemeContext} from "../context/ThemeContext";
import {collection, orderBy, query} from "firebase/firestore";
import {firestoreDB} from "../helpers/firebase";
import {userConverter} from "../helpers/functions";
import {useCollectionData} from "react-firebase-hooks/firestore";


export function Home(props) {
    const {posts,users} = props;
    const [{theme,isDark},toggleTheme] = useContext(ThemeContext);
    const collectionRef = collection(firestoreDB, 'Users').withConverter(userConverter)
    const queryRef = useMemo(() =>
        query(collectionRef, orderBy("firstName")), [collectionRef]);

    const [persons, loading, error] = useCollectionData(queryRef);
    console.log(persons)
    return (
        <>
            <NavigationBar/>
            <div className="container">
                <div className="row">
                    <div className="d-none d-xl-block col-xl-3">
                        <LeftSidebar />
                    </div>
                    <div className="main col-sm-12 col-lg-10  col-xl-6 " style={{background:theme.backgroundColor,color:theme.color}}>
                        <RandomPictures/>
                        <PostInput/>
                        <Posts posts={posts} users={users}/>
                    </div>
                    <div className="d-none d-lg-block col-lg-1 col-xl-3">
                        {/*<RightSidebar users={users}/>*/}
                    </div>
                </div>
            </div>

        </>

    )

}
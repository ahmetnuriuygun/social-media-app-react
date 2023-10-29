import {NavigationBar} from "../Components/Navbar";
import {LeftSidebar} from "../Components/LeftSidebar";
import {RandomPictures} from "../Components/RandomPictures";
import {PostInput} from "../Components/PostInput";
import {Posts} from "../Components/Posts";
import {useContext} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {RightSidebar} from "../Components/RightSidebar";


export function Home(props) {
    const {posts,users} = props;
    return (
        <>
            <NavigationBar/>
            <div className="container">
                <div className="row">
                    <div className="d-none d-xl-block col-xl-3">
                        <LeftSidebar />
                    </div>
                    <div className="main col-sm-12 col-lg-10  col-xl-6 ">
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
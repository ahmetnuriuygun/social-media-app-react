import {NavigationBar} from "../Components/Navbar";
import {LeftSidebar} from "../Components/LeftSidebar";
import {RightSidebar} from "../Components/RightSidebar";
import {RandomPictures} from "../Components/RandomPictures";
import {PostInput} from "../Components/PostInput";
import {PostCard} from "../Components/PostCard";

export function Home(props) {
    const {activeUser,users,posts} = props;
    return (
        <>
            <NavigationBar/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <LeftSidebar user={activeUser}/>
                    </div>
                    <div className="main col-lg-6">
                        <RandomPictures/>
                        <PostInput user={activeUser}/>
                        <PostCard posts={posts} users={users}/>

                    </div>
                    <div className="col-lg-3">
                        <RightSidebar users={users}/>
                    </div>
                </div>
            </div>

        </>

    )

}
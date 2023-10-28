import {NavigationBar} from "../Components/Navbar";
import {LeftSidebar} from "../Components/LeftSidebar";
import {RightSidebar} from "../Components/RightSidebar";
import {RandomPictures} from "../Components/RandomPictures";
import {PostInput} from "../Components/PostInput";
import {Posts} from "../Components/Posts";

export function Home(props) {
    const {activeUser,users,posts} = props;
    return (
        <>
            <NavigationBar/>
            <div className="container">
                <div className="row">
                    <p>yonelndirildi</p>
                    {/*<div className="d-none d-xl-block col-xl-3">*/}
                    {/*    <LeftSidebar user={activeUser}/>*/}
                    {/*</div>*/}
                    {/*<div className="main col-sm-12 col-lg-10  col-xl-6 ">*/}
                    {/*    <RandomPictures/>*/}
                    {/*    <PostInput user={activeUser}/>*/}
                    {/*    <Posts posts={posts} users={users}/>*/}
                    {/*</div>*/}
                    {/*<div className="d-none d-lg-block col-lg-1 col-xl-3">*/}
                    {/*    <RightSidebar users={users} activeUser={activeUser}/>*/}
                    {/*</div>*/}
                </div>
            </div>

        </>

    )

}
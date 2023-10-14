import {NavigationBar} from "../Components/Navbar";
import {LeftSidebar} from "../Components/LeftSidebar";
import {RightSidebar} from "../Components/RightSidebar";
import {RandomPictures} from "../Components/RandomPictures";
import {PostInput} from "../Components/PostInput";

export function Home() {
    return (
        <>
            <NavigationBar/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <LeftSidebar/>
                    </div>
                    <div className="main col-lg-6">
                        <RandomPictures/>
                        <PostInput/>
                    </div>
                    <div className="col-lg-3">
                        <RightSidebar/>
                    </div>
                </div>
            </div>

        </>

    )

}
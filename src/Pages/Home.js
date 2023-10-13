import {NavigationBar} from "../Components/Navbar";
import {LeftSidebar} from "../Components/LeftSidebar";
import {RightSidebar} from "../Components/RightSidebar";
import {RandomPictures} from "../Components/RandomPictures";

export function Home() {
    return (
        <>
            <NavigationBar/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <LeftSidebar/>
                    </div>
                    <div className="col-lg-4">
                        <RandomPictures/>
                    </div>
                    <div className="col-lg-4">
                        <RightSidebar/>
                    </div>
                </div>
            </div>

        </>

    )

}
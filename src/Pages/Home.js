import {NavigationBar} from "../Components/Navbar";
import {RightSidebar} from "../Components/RightSidebar";

export function Home(){
    return(
        <div className="w-full">
            <div className="fixed top-0 z-10 w-full bg-white">
                <NavigationBar></NavigationBar>
            </div>
            <div className="flex bg-gray-100">
                <div className="flex-auto w-[20%] fixed top-12">
                    <RightSidebar></RightSidebar>
                </div>
            </div>
        </div>
        )

}
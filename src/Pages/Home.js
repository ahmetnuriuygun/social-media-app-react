import {NavigationBar} from "../Components/Navbar";
import {LeftSidebar} from "../Components/LeftSidebar";
import {RandomPictures} from "../Components/RandomPictures";
import {PostInput} from "../Components/PostInput";
import {Posts} from "../Components/Posts";
import {useContext} from "react";
import {RightSidebar} from "../Components/RightSidebar";
import {ThemeContext} from "../context/ThemeContext";


export function Home(props) {

    const [{theme}] = useContext(ThemeContext);

    return (
        <>
            <NavigationBar/>
            <div className="container">
                <div className="row">
                    <div className="d-none d-xl-block col-xl-3">
                        <LeftSidebar/>
                    </div>
                    <div className="main col-sm-12 col-lg-10  col-xl-6 "
                         style={{background: theme.backgroundColor, color: theme.color}}>
                        <RandomPictures/>
                        <PostInput/>
                        <Posts/>
                    </div>
                    <div className="d-none d-lg-block col-lg-1 col-xl-3">
                        <RightSidebar/>
                    </div>
                </div>
            </div>
        </>

    )

}
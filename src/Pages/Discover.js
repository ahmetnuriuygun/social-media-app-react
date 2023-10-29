import {NavigationBar} from "../Components/Navbar";
import {LeftSidebar} from "../Components/LeftSidebar";
import {Tab, Tabs} from "react-bootstrap";
import {RightSidebar} from "../Components/RightSidebar";
import React from "react";

export function Discover(){
    return(
        <>

            <NavigationBar/>
            <div className="container">
                <div className="row">
                    <div className="d-none d-xl-block col-xl-3">
                        <LeftSidebar/>
                    </div>
                    <div className="main col-sm-12 col-lg-10  col-xl-6 ">
                       </div>
                    <div className="d-none d-lg-block col-lg-1 col-xl-3">
                        {/*<RightSidebar />*/}
                    </div>
                </div>
            </div>

        </>

    )
}
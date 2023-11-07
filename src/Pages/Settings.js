import {NavigationBar} from "../Fragments/NavigationBar";
import {LeftSidebar} from "../Fragments/LeftSidebar";
import {Tab, Tabs} from "react-bootstrap";
import React, {useContext} from "react";
import {ThemeContext} from "../context/ThemeContext";
import {RightSidebar} from "../Fragments/RightSidebar";
import {AccountManagement} from "../Components/AccountManagement";
import {PremiumContent} from "../Components/PremiumContent";
import {UpdateProfile} from "../Components/UpdateProfile";


export function Settings() {
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
                        <Tabs
                            defaultActiveKey="profile"
                            id="fill-tab-example"
                            className="mb-3"
                            fill
                        >
                            <Tab eventKey="profile" title="Profile">
                                <UpdateProfile/>
                            </Tab>
                            <Tab eventKey="be-premium" title="Be Premium">
                                <PremiumContent/>
                            </Tab>
                            <Tab eventKey="account-management" title="Settings">
                                <AccountManagement/>
                            </Tab>

                        </Tabs>
                    </div>
                    <div className="d-none d-lg-block col-lg-1 col-xl-3">
                        <RightSidebar/>
                    </div>
                </div>
            </div>

        </>

    )
}
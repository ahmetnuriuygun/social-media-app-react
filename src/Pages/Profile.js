import {NavigationBar} from "../Fragments/NavigationBar";
import {CurrentUserContext} from "../context/CurrentUserContext";
import React, {useContext, useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {UsersContext} from "../context/UsersContext";

import {ProfileCoverSection} from "../Components/ProfileCoverSection";
import {ProfilePostsTab} from "../Components/ProfilePostsTab";
import {ProfileAboutTab} from "../Components/ProfileAboutTab";
import {ProfileFriendsTab} from "../Components/ProfileFriendsTab";

export function Profile() {
    const currentUser = useContext(CurrentUserContext);
    const {id} = useParams();

    const [key, setKey] = useState('home');
    const users = useContext(UsersContext);
    let user;
    users.forEach(u => {
        if (u.id === id) {
            user = u;
        }
    })

    return (
        <>
            <NavigationBar/>
            <ProfileCoverSection user={user} currentUser={currentUser}/>

            <hr/>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3 ms-5"
            >
                <Tab eventKey="home" title="Posts">
                    <ProfilePostsTab user={user}></ProfilePostsTab>
                </Tab>
                <Tab eventKey="profile" title="About">
                    <ProfileAboutTab user={user}></ProfileAboutTab>
                </Tab>
                <Tab eventKey="friends" title="Friends">
                    <ProfileFriendsTab user={user}> </ProfileFriendsTab>
                </Tab>
            </Tabs>


        </>
    )
}
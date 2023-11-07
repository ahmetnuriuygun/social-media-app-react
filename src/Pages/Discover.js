import {NavigationBar} from "../Fragments/NavigationBar";
import {LeftSidebar} from "../Fragments/LeftSidebar";
import React, {useContext} from "react";


import {CurrentUserContext} from "../context/CurrentUserContext";
import {UsersContext} from "../context/UsersContext";
import {RightSidebar} from "../Fragments/RightSidebar";
import {FriendsSuggestions} from "../Components/FriendsSuggestions";


export function Discover() {
    const currentUser = useContext(CurrentUserContext)
    const users = useContext(UsersContext)

    function friendSuggestionFilter() {
        return users?.filter(u =>
            u.id !== currentUser.id
            && !currentUser.sendFriendRequest.includes(u.id)
            && !currentUser.friends.includes(u.id)
            && !currentUser.receiveFriendRequest.includes(u.id))
    }

    return (
        <>
            <NavigationBar/>
            <div className="container">
                <div className="row">
                    <div className="d-none d-xl-block col-xl-3">
                        <LeftSidebar/>
                    </div>
                    <div className="main col-sm-12 col-lg-10  col-xl-6 ">
                        <FriendsSuggestions users={friendSuggestionFilter()}/>
                    </div>
                    <div className="d-none d-lg-block col-lg-1 col-xl-3">
                        <RightSidebar/>
                    </div>
                </div>
            </div>

        </>

    )
}
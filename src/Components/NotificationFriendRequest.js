import React, {useContext} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {UsersContext} from "../context/UsersContext";

export function NotificationFriendRequest() {
    const currentUser = useContext(CurrentUserContext);
    const users = useContext(UsersContext);

    let firstName;
    let lastName;
    let profileImg;
    users?.forEach(u => {
        currentUser.receiveFriendRequest?.forEach(r => {
            if (u.id === currentUser.receiveFriendRequest[0]) {
                firstName = u.firstName
                lastName = u.lastName
                profileImg = u.profileImg
            }
        })

    })


    return (
        currentUser.receiveFriendRequest.map(r =>
            <div><p className='dropdown-font'><span><img className='dropdown-img'
                                                         src={profileImg ? profileImg : `images/blank-profile.jpg`}/></span><span
                className='text-capitalize'>{firstName} {lastName}</span> send you a friend request</p></div>
        )
    )

}
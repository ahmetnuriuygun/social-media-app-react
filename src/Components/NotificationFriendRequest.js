import React, {useContext} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {UsersContext} from "../context/UsersContext";
import {Link} from "react-router-dom";

export function NotificationFriendRequest() {
    const currentUser = useContext(CurrentUserContext);
    const users = useContext(UsersContext);

    let firstName;
    let lastName;
    let profileImg;
    let id;
    users?.forEach(u => {
        currentUser.receiveFriendRequest?.forEach(r => {
            if (u.id === currentUser.receiveFriendRequest[0]) {
                firstName = u.firstName
                lastName = u.lastName
                profileImg = u.profileImg
                id = u.id;
            }
        })

    })


    return (
        currentUser.receiveFriendRequest.map(r =>
            <Link to={`/profile/${id}`}>
                <div><p className='dropdown-font'><span><img className='dropdown-img'
                                                             src={profileImg ? profileImg : `images/blank-profile.jpg`}/></span><span
                    className='text-capitalize'>{firstName} {lastName}</span> send you a friend request</p></div>
            </Link>

        )
    )

}
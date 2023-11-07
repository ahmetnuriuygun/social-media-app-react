import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCakeCandles} from "@fortawesome/free-solid-svg-icons";

import React, {useContext, useState} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {UsersContext} from "../context/UsersContext";
import {ThemeContext} from "../context/ThemeContext";
import {Link} from "react-router-dom";
import {FriendRequestCard} from "../Components/FriendRequestCard";

export function RightSidebar() {

    let userWaitingToResponse = {};
    const currentUser = useContext(CurrentUserContext);
    const users = useContext(UsersContext);
    const [{theme}] = useContext(ThemeContext);

    const [show, isShow] = useState(currentUser?.receiveFriendRequest.length !== 0);
    const friendsArray = []
    users?.forEach(u => {
        currentUser?.friends.forEach(id => {
            if (u.id === id) {
                friendsArray.push(u)
            }
        })
    })
    return (
        <div className="row-offcanvas row-offcanvas-right"
             style={{background: theme.backgroundColor, color: theme.color}}>
            <div id="sidebar-right" className="sidebar-offcanvas">
                <div>
                    <h3 className="ms-2">Birthdays</h3>
                    <p className="ms-2"><FontAwesomeIcon className='fs-5 me-2' icon={faCakeCandles}/>Today is the
                        birthday of Jane Austin </p>
                </div>
                <hr/>
                {show ?
                    <div>
                        <h3 className='ms-4 d-inline'>Friend Requests</h3><a className='ms-3'>See all</a>
                        <ul>
                            <FriendRequestCard userWaitingToResponse={userWaitingToResponse} onShow={isShow}/>
                        </ul>
                    </div>
                    : ""}

                <div>
                    <h3 className='ms-4'>Friends</h3>
                    <ul>
                        {friendsArray.map(f => <FriendsList key={f.id} friend={f}></FriendsList>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function FriendsList(props) {
    const {friend} = props;
    return (
        <div key={friend.id}>
            <Link to={`/profile/${friend.id}`}>
                <li className='text-capitalize'><img
                    src={friend?.profileImg ? friend?.profileImg : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`}
                    alt="profile_picture"/>
                    {friend.firstName} {friend.lastName}
                </li>
            </Link>

        </div>

    );
}


import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCakeCandles} from "@fortawesome/free-solid-svg-icons";

import {arrayUnion, collection, orderBy, query, updateDoc,arrayRemove} from "firebase/firestore";
import {firestoreDB} from "../helpers/firebase";
import {userConverter} from "../helpers/functions";
import React, {useContext, useMemo, useState} from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {Button, Card} from "react-bootstrap";
import {UsersContext} from "../context/UsersContext";
import {ThemeContext} from "../context/ThemeContext";
import {Link, useNavigate} from "react-router-dom";

export function RightSidebar() {

    let userWaitingToResponse = {};
    const currentUser = useContext(CurrentUserContext);
    const users = useContext(UsersContext);
    const [{theme,isDark},toggleTheme] = useContext(ThemeContext);

    const [show,isShow] = useState(currentUser?.receiveFriendRequest.length!==0);
    const friendsArray = []
    users?.forEach(u=>{currentUser?.friends.forEach(id=>{if(u.id===id){friendsArray.push(u)}})})
    return (
        <div className="row-offcanvas row-offcanvas-right"  style={{background:theme.backgroundColor,color:theme.color}}>
            <div id="sidebar-right" className="sidebar-offcanvas">
                <div>
                    <h3 className="ms-2">Birthdays</h3>
                    <p className="ms-2"><FontAwesomeIcon icon={faCakeCandles}/>Today is the birthday of Jane Austin </p>
                </div>
                <hr/>
                { show?
                <div>
                    <h3 className='ms-4 d-inline'>Friend Requests</h3><a className='ms-3'>See all</a>
                    <ul>

                        <FriendRequestCard userWaitingToResponse={userWaitingToResponse} onShow={isShow}/>
                    </ul>
                </div>
                   : ""   }

                <div>
                    <h3 className='ms-4'>Friends</h3>
                    <ul>
                        {friendsArray.map(f=><FriendsList key={f.id} friend={f}></FriendsList>)}
                    </ul>


                </div>
            </div>
        </div>
    )
}

function FriendRequestCard(props) {
    const {userWaitingToResponse,onShow} = props;
    const currentUser = useContext(CurrentUserContext);
    const users = useContext(UsersContext);



    users?.forEach(u => {
        currentUser?.receiveFriendRequest.forEach(r => {
            if (u.id === currentUser?.receiveFriendRequest[0]) {
                userWaitingToResponse['firstName'] = u.firstName
                userWaitingToResponse['lastName'] = u.lastName
                userWaitingToResponse['profileImg'] = u.profileImg
                userWaitingToResponse['id'] = u.id;
            }
        })

    })

    const addFriend = () =>{

        updateDoc(currentUser?.ref, {friends:arrayUnion(userWaitingToResponse.id)},
            updateDoc(currentUser?.ref,    {friendsAmount:currentUser?.friendsAmount+1}),
            updateDoc(currentUser?.ref,  {receiveFriendRequest:arrayRemove(userWaitingToResponse.id)}))

        users?.forEach(u => {
            currentUser?.receiveFriendRequest?.forEach(r => {
                if (u.id === currentUser?.receiveFriendRequest[0]) {
                    updateDoc(u.ref, {friends:arrayUnion(currentUser?.id)},
                    updateDoc(u.ref,{sendFriendRequest:arrayRemove(currentUser?.id)}),
                    updateDoc(u.ref,{friendsAmount:u.friendsAmount+1}))
                }
            })
        })
        onShow(false)


    }

    const removeFriend = () =>{

        updateDoc(currentUser?.ref,{receiveFriendRequest:arrayRemove(userWaitingToResponse.id)})
        users?.forEach(u => {
            currentUser?.receiveFriendRequest?.forEach(r => {
                if (u.id === currentUser.receiveFriendRequest[0]) {
                    updateDoc(u.ref,{sendFriendRequest:arrayRemove(currentUser.id)})

                }
            })
        })
        onShow(false)

    }

    return (

    <Card style={{width: '18rem'}} className='rounded mt-3 p-2'>
        <div className='d-flex m-3'>
            <img src={userWaitingToResponse?.profileImg ? userWaitingToResponse?.profileImg : `images/blank-profile.jpg`} width='80rem' height='50px' className='img-thumbnail'/>
            <h6 className='my-auto mx-auto'>{userWaitingToResponse?.firstName?.charAt(0).toUpperCase() + userWaitingToResponse?.firstName?.slice(1)} {userWaitingToResponse?.lastName?.charAt(0).toUpperCase() + userWaitingToResponse?.lastName?.slice(1)}</h6>
        </div>
        <div className='d-flex ms-2'>
            <Button className='btn btn-primary me-2 w-50' onClick={addFriend}>Accept</Button>
            <Button className='btn btn-secondary w-50' onClick={removeFriend}>Cancel</Button>
        </div>

    </Card>



    )
}

function FriendsList(props) {
    const {friend} = props;
    const navigate = useNavigate();
    console.log(friend)
    return (
        <div key={friend.id}>
            <Link to={`/profile/${friend.id}`}>
                <li ><img src={friend?.profileImg ? friend?.profileImg : `images/blank-profile.jpg`}/>
                    {friend?.firstName?.charAt(0).toUpperCase() + friend?.firstName?.slice(1)} {friend?.lastName?.charAt(0).toUpperCase() + friend?.lastName?.slice(1)}
                </li>
            </Link>

        </div>

    );
}


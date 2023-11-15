import {useNavigate, useParams} from "react-router-dom";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMessage, faPen} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useState} from "react";
import * as PropTypes from "prop-types";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {UsersContext} from "../context/UsersContext";
import {acceptFriend, refuseFriend} from "../helpers/functions";
import {arrayUnion, updateDoc} from "firebase/firestore";
import {toastErrorNotify, toastInfoNotify} from "../helpers/toastNotify";

export function ProfileCoverSection(props) {
    const {id} = useParams();
    const users = useContext(UsersContext);
    const {user, currentUser} = props;
    const navigate = useNavigate();


    const [show, onShow] = useState(currentUser?.receiveFriendRequest.length !== 0);


    // const { onShow} = props;
    const userWaitingToResponse = {};


    users.forEach(u => {
        currentUser?.receiveFriendRequest.forEach(r => {
            if (u.id === currentUser?.receiveFriendRequest[0]) {
                userWaitingToResponse['firstName'] = u.firstName
                userWaitingToResponse['lastName'] = u.lastName
                userWaitingToResponse['profileImg'] = u.profileImg
                userWaitingToResponse['id'] = u.id;
            }
        })

    })

    const sendFriendRequest = async () => {
        try{
            updateDoc(currentUser.ref, {sendFriendRequest: arrayUnion(user.id)})
            updateDoc(user.ref, {receiveFriendRequest: arrayUnion(currentUser.id)})
                .then(()=>{
                    toastInfoNotify(`You sent friend request to ${user.firstName} ${user.lastName}`)
                })
        }catch(err){
            toastErrorNotify(err.message)
        }



    }

    return (
        <div className="d-flex flex-column flex-lg-row justify-content-lg-around mt-5">
            <div className="d-flex flex-row ">
                <img alt="profile_picture"
                     src={user.profileImg ? user.profileImg : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`}
                     className="img-fluid rounded-circle border border-dark border-3"
                     style={{width: "15rem", height: "15rem"}}/>
                <div className="d-flex flex-column ms-4 mt-5">
                    <h1 className="text-capitalize ">{user.firstName} {user.lastName}</h1>
                    <h3 className="text-muted">{user.friendsAmount} friends</h3>
                </div>
            </div>
            {user.id === currentUser.id ?
                <div className="mt-5 ms-3 ms-lg-0 me-lg-2">
                    <Button className="btn btn-secondary" onClick={() => navigate(`/settings/${id}`)}><FontAwesomeIcon
                        icon={faPen} className="me-2"/>Edit Profile</Button>
                </div>
                : ""}
                {currentUser.friends.includes(user.id)  ?
                        <div className="mt-5 ms-3 ms-lg-0 me-lg-2">
                            <Button className="btn btn-primary"><FontAwesomeIcon
                                icon={faMessage} className="me-2"/>Send a message</Button>
                        </div> : ""

                }

            {!currentUser.friends.includes(user.id) && user.id!==currentUser.id && !currentUser.sendFriendRequest.includes(user.id) && !currentUser.receiveFriendRequest.includes(user.id)  ?
                <div className="mt-5 ms-3 ms-lg-0 me-lg-2">
                    <Button variant="primary" className='btn btn-primary' onClick={sendFriendRequest}>Add friend</Button>
                </div> : ""

            }

            {currentUser.sendFriendRequest.includes(user.id) && user.id!==currentUser.id ?
                <div className="mt-5 ms-3 ms-lg-0 me-lg-2">
                    <Button variant="warning" className='btn btn-primary' >Friend Requested Sent</Button>
                </div> : ""

            }
                {currentUser.receiveFriendRequest.includes(user.id) ?
                        <div className="mt-5 ms-3 ms-lg-0 me-lg-2">
                            <Button className='btn btn-primary me-2 w-50' onClick={()=>acceptFriend(currentUser,userWaitingToResponse,users,onShow)}>Accept</Button>
                            <Button className='btn btn-secondary mt-2 w-50' onClick={()=>refuseFriend(currentUser,userWaitingToResponse,users,onShow)}>Cancel</Button>

                        </div> : ""
                }

        </div>
    );
}

ProfileCoverSection.propTypes = {
    user: PropTypes.any,
    currentUser: PropTypes.any,

};
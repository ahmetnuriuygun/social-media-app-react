import React, {useContext} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {UsersContext} from "../context/UsersContext";
import {arrayRemove, arrayUnion, updateDoc} from "firebase/firestore";
import {Button, Card} from "react-bootstrap";
import {toastErrorNotify, toastInfoNotify, toastSuccessNotify} from "../helpers/toastNotify";

export function FriendRequestCard(props) {
    const {userWaitingToResponse, onShow} = props;
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

    const acceptFriend = async () => {
        try {
            updateDoc(currentUser?.ref, {friends: arrayUnion(userWaitingToResponse.id)},
                updateDoc(currentUser?.ref, {friendsAmount: currentUser?.friendsAmount + 1}),
                updateDoc(currentUser?.ref, {receiveFriendRequest: arrayRemove(userWaitingToResponse.id)}))

            users?.forEach(u => {
                currentUser?.receiveFriendRequest?.forEach(r => {
                    if (u.id === currentUser?.receiveFriendRequest[0]) {
                        updateDoc(u.ref, {friends: arrayUnion(currentUser?.id)},
                            updateDoc(u.ref, {sendFriendRequest: arrayRemove(currentUser?.id)}),
                            updateDoc(u.ref, {friendsAmount: u.friendsAmount + 1}));
                    }
                })
            })
        } catch (err) {
            toastErrorNotify(err.message);
        }

        onShow(false);
        toastInfoNotify(`You accepted friend request`);

    }

    const refuseFriend = () => {
        updateDoc(currentUser?.ref, {receiveFriendRequest: arrayRemove(userWaitingToResponse.id)})
        users?.forEach(u => {
            currentUser?.receiveFriendRequest?.forEach(r => {
                if (u.id === currentUser.receiveFriendRequest[0]) {
                    updateDoc(u.ref, {sendFriendRequest: arrayRemove(currentUser.id)});

                }
            })
        })
        onShow(false)
    }

    return (

        <Card style={{width: '18rem'}} className='rounded mt-3 p-2'>
            <div className='d-flex m-3'>
                <img
                    src={userWaitingToResponse?.profileImg ? userWaitingToResponse?.profileImg : `images/blank-profile.jpg`}
                    width='80rem' height='50px' className='img-thumbnail'/>
                <h6 className='my-auto mx-auto'>{userWaitingToResponse?.firstName?.charAt(0).toUpperCase() + userWaitingToResponse?.firstName?.slice(1)} {userWaitingToResponse?.lastName?.charAt(0).toUpperCase() + userWaitingToResponse?.lastName?.slice(1)}</h6>
            </div>
            <div className='d-flex ms-2'>
                <Button className='btn btn-primary me-2 w-50' onClick={acceptFriend}>Accept</Button>
                <Button className='btn btn-secondary w-50' onClick={refuseFriend}>Cancel</Button>
            </div>

        </Card>


    )
}
import {Dropdown} from "react-bootstrap";
import React, {useContext} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";

export function NotificationPostLike() {
    const currentUser = useContext(CurrentUserContext);


    return (
        <>

            <Dropdown.ItemText>
                <img
                    src={currentUser.lastLikeInfo.notificationImgUrl ? currentUser.lastLikeInfo.notificationImgUrl : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png} className='img-fluid rounded`}
                    width='50rem'/>
                <span className='dropdown-font'>
                        <span
                            className='text-capitalize'>{currentUser.lastLikeInfo.firstName} {currentUser.lastLikeInfo.lastName}</span> liked your post
                    </span>
            </Dropdown.ItemText>
        </>

    );
}
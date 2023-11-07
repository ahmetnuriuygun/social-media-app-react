import {DropdownItemText} from "react-bootstrap";
import React from "react";

export function NotificationPostComment(props) {
    const {currentUser} = props;


    return (
        <>
            <DropdownItemText><img
                src={currentUser.lastCommentInfo.notificationImgUrl ? currentUser.lastCommentInfo.notificationImgUrl : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png} className='img-fluid rounded`}
                className='img-fluid rounded' width='50rem'/>
                <span
                    className='dropdown-font'><span
                    className='text-capitalize'>{currentUser.lastCommentInfo.firstName} {currentUser.lastCommentInfo.lastName}</span> commented your post</span>
            </DropdownItemText>
        </>


    );
}
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMessage, faPen} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import * as PropTypes from "prop-types";

export function ProfileCoverSection(props) {
    const {id} = useParams();

    const {user, currentUser} = props;
    const navigate = useNavigate();
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
                </div> :

                <div className="mt-5 ms-3 ms-lg-0 me-lg-2">
                    <Button className="btn btn-primary"><FontAwesomeIcon
                        icon={faMessage} className="me-2"/>Send a message</Button>
                </div>

            }
        </div>
    );
}

ProfileCoverSection.propTypes = {
    user: PropTypes.any,
    currentUser: PropTypes.any,

};
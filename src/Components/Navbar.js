import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBell, faCat, faEnvelope, faGear, faHouse, faMagnifyingGlass, faUser} from "@fortawesome/free-solid-svg-icons";
import React, {useContext} from "react";
import {Dropdown, DropdownItemText, Nav, Navbar} from "react-bootstrap";
import {logOut} from "../helpers/functions";
import {useNavigate, useParams} from "react-router-dom";
import {ThemeContext} from "../context/ThemeContext";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {UsersContext} from "../context/UsersContext";
import {PostsContext} from "../context/PostsContext";

function NotificationFriendRequest() {
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
            <div><p className='dropdown-font'><span><img  className='dropdown-img'
                                                         src={profileImg ? profileImg : `images/blank-profile.jpg`}/></span><span
                className='text-capitalize'>{firstName} {lastName}</span> send you a friend request</p></div>
        )
    )

}

function NotificationPostLike(props) {
    const {currentUser} = props;


    return (
        <>

                <Dropdown.ItemText>
                    <img src={currentUser.lastLikeInfo.notificationImgUrl ? currentUser.lastLikeInfo.notificationImgUrl : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png} className='img-fluid rounded`}
                                        width='50rem'/>
                    <span className='dropdown-font'>
                        <span className='text-capitalize'>{currentUser.lastLikeInfo.firstName} {currentUser.lastLikeInfo.lastName}</span> liked your post
                    </span>
                </Dropdown.ItemText>
        </>

    );
}

function NotificationPostComment(props) {
    const {currentUser} = props;



    return (
        <>
            <DropdownItemText><img src={currentUser.lastCommentInfo.notificationImgUrl ? currentUser.lastCommentInfo.notificationImgUrl : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png} className='img-fluid rounded`} className='img-fluid rounded' width='50rem'/>
                <span
                    className='dropdown-font'><span
                    className='text-capitalize'>{currentUser.lastCommentInfo.firstName} {currentUser.lastCommentInfo.lastName}</span> commented your post</span>
            </DropdownItemText>
        </>


    );
}

export function NavigationBar() {
    const navigate = useNavigate();
    const [{theme}] = useContext(ThemeContext);
    const currentUser = useContext(CurrentUserContext);








    return (
        <Navbar expand='md' className="navbar-light  bg-faded justify-content-center"
                style={{background: theme.backgroundColor, color: theme.color}}>
            <Navbar.Brand>
                <a onClick={() => navigate("/home")}
                   className="d-flex w-50 mr-auto header-logo text-primary text-decoration-none">FRIEND
                    SPACE<FontAwesomeIcon icon={faCat} bounce/></a>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav">
                <span className="navbar-toggler-icon"></span>
            </Navbar.Toggle>

            <Nav className="w-100 d-none d-lg-inline-flex mr-auto justify-content-center align-items-center">
                <div className="nav-item active">
                    <a className="nav-link" onClick={() => navigate("/home")}><FontAwesomeIcon icon={faHouse}
                                                                                               style={{color: 'black'}}
                                                                                               className='fs-4'/></a>
                </div>
                <div className="nav-item">
                    <a className="nav-link" href="//codeply.com"><FontAwesomeIcon icon={faEnvelope}
                                                                                  style={{color: 'black'}}
                                                                                  className='fs-4'/></a>
                </div>
                <div className=" d-none d-xl-block">
                    <div className="input-group search ">
                        <div className="form-outline">
                            <input type="search" id="search-input" className="form-control"
                                   placeholder="Search friends"/>
                        </div>
                        <button type="button" className="btn btn-dark">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='fs-5'/>
                        </button>
                    </div>
                </div>
            </Nav>

            <Navbar.Collapse className="w-50" id="basic-navbar-nav">

                <Nav className="mr-auto w-75 justify-content-end  d-md-flex ">
                    <div className="nav-item">
                        <a onClick={() => navigate(`/profile/${currentUser.id}`)}><FontAwesomeIcon className='fs-5 '
                                                                                                   icon={faUser}/></a>
                    </div>
                    <div className="nav-item ">
                        <Dropdown>

                            <Dropdown.Toggle variant="secondary-outline" id="dropdown-basic">
                                <FontAwesomeIcon icon={faGear} className='mt-1 fs-5 ms-2 ms-md-0'/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='dropdown-menu'>
                                <Dropdown.Item onClick={() => navigate(`/settings/${currentUser.id}`)}><p
                                    className='dropdown-font'>Settings</p></Dropdown.Item>
                                <Dropdown.Divider/>
                                <Dropdown.Item onClick={() => logOut(navigate)}><p
                                    className='dropdown-font'>Logout</p></Dropdown.Item>
                            </Dropdown.Menu>

                        </Dropdown>

                    </div>

                    <div className="nav-item">
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary-outline" id="dropdown-basic">
                                <FontAwesomeIcon icon={faBell} className='mt-1 fs-5 ms-2 ms-md-0'/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='w-100'>

                                <Dropdown.ItemText className='text-capitalize '>
                                    <p className='dropdown-font'>Welcome {currentUser?.firstName} {currentUser?.lastName}</p>
                                </Dropdown.ItemText>

                                {!currentUser?.receiveFriendRequest ? "" : <NotificationFriendRequest/>}

                                {currentUser.lastLikeInfo ? <NotificationPostLike currrentUser={currentUser}/> : ""}

                                {currentUser.lastCommentInfo ? <NotificationPostComment currrentUser={currentUser} /> : "" }


                            </Dropdown.Menu>

                        </Dropdown>

                    </div>
                </Nav>
            </Navbar.Collapse>

        </Navbar>

    );
}


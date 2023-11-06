import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBell, faCat, faEnvelope, faGear, faHouse, faMagnifyingGlass, faUser} from "@fortawesome/free-solid-svg-icons";
import React, {useContext} from "react";
import {Container, Dropdown, DropdownItemText, Nav, Navbar} from "react-bootstrap";
import {logOut} from "../helpers/functions";
import {useNavigate} from "react-router-dom";
import {ThemeContext} from "../context/ThemeContext";
import {CurrentUserContext} from "../context/CurrentUserContext";

import {UsersContext} from "../context/UsersContext";
import {PostsContext} from "../context/PostsContext";

function NotificationFriendRequest() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
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

function NotificationPostLike(props) {
    const {postsOfCurrentUser} = props;
    const currentUser = useContext(CurrentUserContext);
    const usersContext = useContext(UsersContext);
    let idOfHasLikedUser;
    let firstName;
    let lastName;


    postsOfCurrentUser.forEach(p => {
        idOfHasLikedUser = p.arrayOfLikedPersons;
    })

    console.log(idOfHasLikedUser)
    usersContext?.forEach(u => {
        if (idOfHasLikedUser[idOfHasLikedUser?.length - 1] === u.id) {
            firstName = u.firstName;
            lastName = u.lastName;
        }
    })

    console.log(firstName, lastName)
    return (
        <DropdownItemText><p className='dropdown-font'><span
            className='text-capitalize'>{firstName} {lastName}</span> liked your post</p></DropdownItemText>

    );
}

function NotificationPostComment(props) {
    const {postsOfCurrentUser} = props;
    const currentUser = useContext(CurrentUserContext);
    const postsContext = useContext(PostsContext);
    const usersContext = useContext(UsersContext);
    let idOfHasCommentedUser;
    let firstName;
    let lastName;


    postsOfCurrentUser.forEach(p => {
        idOfHasCommentedUser = p.comments[p.comments.length - 1]?.commentOwner;
    })


    usersContext.forEach(u => {
        if (idOfHasCommentedUser === u.id) {
            firstName = u.firstName;
            lastName = u.lastName;
        }
    })

    console.log(firstName, lastName)
    return (
        <DropdownItemText><p className='dropdown-font'><span
            className='text-capitalize'>{firstName} {lastName}</span> commented your post</p></DropdownItemText>

    );
}

export function NavigationBar() {
    const navigate = useNavigate();
    const [{theme, isDark}, toggleTheme] = useContext(ThemeContext);
    const currentUser = useContext(CurrentUserContext);
    let postsOfCurrentUser = []
    const postsContext = useContext(PostsContext);


    postsContext.forEach(p => {
        if (p.ownerId === currentUser.id) {
            postsOfCurrentUser.push(p);
        }
    })

    console.log(postsOfCurrentUser)


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
                <li className="nav-item active">
                    <a className="nav-link" onClick={() => navigate("/home")}><FontAwesomeIcon icon={faHouse}/></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="//codeply.com"><FontAwesomeIcon icon={faEnvelope}/></a>
                </li>
                <li className=" d-none d-xl-block">
                    <div className="input-group search ">
                        <div className="form-outline">
                            <input type="search" id="search-input" className="form-control"
                                   placeholder="Search friends"/>
                        </div>
                        <button type="button" className="btn btn-dark">
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </button>
                    </div>
                </li>
            </Nav>
            <Navbar.Collapse className="w-50" id="basic-navbar-nav">

                <Nav className="mr-auto w-75 justify-content-end  d-md-flex ">
                    <div className="nav-item">
                        <a onClick={() => navigate(`/profile/${currentUser.id}`)} href="#"><FontAwesomeIcon
                            icon={faUser}/></a>
                    </div>
                    <div className="nav-item ">
                        {/*<DropdownButton id="dropdown-basic-button" title={<FontAwesomeIcon icon={faGear} />} >*/}
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary-outline" id="dropdown-basic">
                                <FontAwesomeIcon icon={faGear}/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='dropdown-menu'>
                                <Dropdown.Item onClick={() => navigate("/settings")} ><p
                                    className='dropdown-font'>Settings</p></Dropdown.Item>
                                <Dropdown.Divider/>
                                <Dropdown.Item onClick={() => logOut(navigate)} ><p
                                    className='dropdown-font'>Logout</p></Dropdown.Item>
                            </Dropdown.Menu>

                        </Dropdown>

                    </div>

                    <div className="nav-item">
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary-outline" id="dropdown-basic">
                                <FontAwesomeIcon icon={faBell}/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='w-100'>
                                <Dropdown.ItemText className='text-capitalize '  >
                                    <p className='dropdown-font'>Welcome {currentUser?.firstName} {currentUser?.lastName}</p>
                                </Dropdown.ItemText>
                                {!currentUser?.receiveFriendRequest ? "" :
                                    <NotificationFriendRequest></NotificationFriendRequest>}
                                {postsOfCurrentUser[postsOfCurrentUser?.length - 1]?.likesAmount > 0 ?
                                    <NotificationPostLike
                                        postsOfCurrentUser={postsOfCurrentUser}></NotificationPostLike> : ""}
                                {postsOfCurrentUser[postsOfCurrentUser?.length - 1]?.comments ? <NotificationPostComment
                                    postsOfCurrentUser={postsOfCurrentUser}></NotificationPostComment> : ""}
                                <Dropdown.Divider/>
                            </Dropdown.Menu>

                        </Dropdown>

                    </div>
                </Nav>
            </Navbar.Collapse>

        </Navbar>

    );
}


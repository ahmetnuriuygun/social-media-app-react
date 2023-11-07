import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBell, faCat, faEnvelope, faGear, faHouse, faMagnifyingGlass, faUser} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useState} from "react";
import {Dropdown, Form, InputGroup, Nav, Navbar} from "react-bootstrap";
import {logOut} from "../helpers/functions";
import {useNavigate} from "react-router-dom";
import {ThemeContext} from "../context/ThemeContext";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {NotificationFriendRequest} from "../Components/NotificationFriendRequest";
import {NotificationPostLike} from "../Components/NotificationPostLike";
import {NotificationPostComment} from "../Components/NotificationPostComment";
import * as PropTypes from "prop-types";

function NavbarCenter() {
    const navigate = useNavigate();
    const [searchValue,setSearchValue] = useState();
    const searchUser = (e) =>{
        e.preventDefault()
        navigate(`/search/${searchValue}`)
    }

    const handleChange = (e)=>{
        setSearchValue(e.target.value);
    }

    return (
        <Nav className="w-100 d-none d-lg-inline-flex mr-auto justify-content-center align-items-center">
            <div className="nav-item active">
                <a className="nav-link" onClick={() => navigate("/home")}><FontAwesomeIcon icon={faHouse}
                                                                                           style={{color: "black"}}
                                                                                           className="fs-4"/></a>
            </div>
            <div className="nav-item">
                <a className="nav-link" href="//codeply.com"><FontAwesomeIcon icon={faEnvelope}
                                                                              style={{color: "black"}}
                                                                              className="fs-4"/></a>
            </div>
            <div className=" d-none d-xl-block">
                <Form onSubmit={searchUser}>
                    <InputGroup>
                        <Form.Control type="search" id="search-input" className="form-control"
                                   placeholder="Search friends" onChange={handleChange}/>
                        <button type="submit" className="btn btn-dark">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="fs-5"/>
                        </button>
                    </InputGroup>
                </Form>
            </div>
        </Nav>
    );
}


function ActionDropDown(props) {
    const {currentUser} = props;
    const navigate = useNavigate();

    return (
        <Dropdown>

            <Dropdown.Toggle variant="secondary-outline" id="dropdown-basic">
                <FontAwesomeIcon icon={faGear} className="mt-1 fs-5 ms-2 ms-md-0"/>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu">
                <Dropdown.Item onClick={() => navigate(`/settings/${currentUser.id}`)}><p
                    className="dropdown-font">Settings</p></Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={() => logOut(navigate)}><p
                    className="dropdown-font">Logout</p></Dropdown.Item>
            </Dropdown.Menu>

        </Dropdown>
    );
}

ActionDropDown.propTypes = {currentUser: PropTypes.any};

NotificationDropDown.propTypes = {currentUser: PropTypes.any};

function NotificationDropDown(props) {
    const {currentUser} = props;
    return (
        <Dropdown>
            <Dropdown.Toggle variant="secondary-outline" id="dropdown-basic">
                <FontAwesomeIcon icon={faBell} className="mt-1 fs-5 ms-2 ms-md-0"/>
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">

                <Dropdown.ItemText className="text-capitalize ">
                    <p className="dropdown-font">Welcome {currentUser?.firstName} {currentUser?.lastName}</p>
                </Dropdown.ItemText>

                {currentUser?.receiveFriendRequest ? "" : <NotificationFriendRequest/>}

                {currentUser.lastLikeInfo ? <NotificationPostLike /> : ""}

                {currentUser.lastCommentInfo ?
                    <NotificationPostComment /> : ""}


            </Dropdown.Menu>

        </Dropdown>
    )
}

function NavbarEnd(props) {
    const {currentUser} = props;
    const navigate = useNavigate();

    return (
        <Nav className="mr-auto w-75 justify-content-end  d-md-flex ">
            <div className="nav-item">
                <a onClick={() => navigate(`/profile/${currentUser.id}`)}><FontAwesomeIcon className="fs-5 "
                                                                                           icon={faUser}/></a>
            </div>
            <div className="nav-item ">
                <ActionDropDown currentUser={currentUser}/>

            </div>

            <div className="nav-item">
                <NotificationDropDown currentUser={currentUser}/>
            </div>
        </Nav>
    );
}

NavbarEnd.propTypes = {
    currentUser: PropTypes.any
};

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

            <NavbarCenter/>

            <Navbar.Collapse className="w-50" id="basic-navbar-nav">
                <NavbarEnd currentUser={currentUser}/>
            </Navbar.Collapse>

        </Navbar>

    );
}


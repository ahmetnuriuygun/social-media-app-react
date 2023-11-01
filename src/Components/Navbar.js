
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBell, faCat, faEnvelope, faGear, faHouse, faMagnifyingGlass, faUser} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useMemo} from "react";
import {Dropdown, DropdownButton, Nav, NavDropdown} from "react-bootstrap";
import {logOut, userConverter} from "../helpers/functions";
import {useNavigate} from "react-router-dom";
import {ThemeContext} from "../context/ThemeContext";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {collection, orderBy, query} from "firebase/firestore";
import {firestoreDB} from "../helpers/firebase";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {forEach} from "react-bootstrap/ElementChildren";
import {UsersContext} from "../context/UsersContext";

 function NotificationFriendRequest(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const currentUser = useContext(CurrentUserContext);
    const users = useContext(UsersContext);

    let firstName;
    let lastName;
    let profileImg;
    users?.forEach(u=>{
        currentUser.receiveFriendRequest?.forEach(r=>{
            if(u.id===currentUser.receiveFriendRequest[0]){
                firstName = u.firstName
                lastName = u.lastName
                profileImg = u.profileImg
            }
        })

    })


    return(
        currentUser.receiveFriendRequest.map(r=>
            <Dropdown.Item > <p className='dropdown-font'><span><img className='dropdown-img' src={profileImg ? profileImg : `images/blank-profile.jpg`}/></span><span className='text-capitalize'>{firstName} {lastName}</span> send you a friend request</p></Dropdown.Item>
        )
    )

}
export function NavigationBar(){
    const navigate = useNavigate();
    const [{theme,isDark},toggleTheme] = useContext(ThemeContext);
    const currentUser = useContext(CurrentUserContext);



    return (


        <nav className="navbar navbar-light navbar-expand-sm bg-faded justify-content-center" style={{background:theme.backgroundColor,color:theme.color}}>
            <a onClick={()=>navigate("/home")} className="navbar-brand d-flex w-50 mr-auto header-logo text-primary">FRIEND SPACE<FontAwesomeIcon icon={faCat} bounce /></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar3">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse w-100" id="collapsingNavbar3">
                <ul className="navbar-nav w-100 justify-content-center">
                    <li className="nav-item active">
                        <a className="nav-link" onClick={()=>navigate("/home")}><FontAwesomeIcon icon={faHouse} /></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="//codeply.com"><FontAwesomeIcon icon={faEnvelope} /></a>
                    </li>
                    <li className=" d-none d-xl-block">
                        <div className="input-group search ">
                            <div className="form-outline">
                                <input type="search" id="search-input" className="form-control" placeholder="Search friends"/>
                            </div>
                            <button type="button" className="btn btn-dark">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </li>
                </ul>
                <ul className="nav navbar-nav ml-auto w-100 justify-content-end d-sm-none d-md-flex ">
                    <li className="nav-item">
                        <a href="#"><FontAwesomeIcon icon={faUser} /></a>
                    </li>
                    <li className="nav-item me-2">
                        {/*<DropdownButton id="dropdown-basic-button" title={<FontAwesomeIcon icon={faGear} />} >*/}
                        <Dropdown >
                            <Dropdown.Toggle variant="secondary-outline" id="dropdown-basic">
                                <FontAwesomeIcon icon={faGear} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>navigate("/settings")} eventKey="4.1"><p className='dropdown-font'>Settings</p></Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={()=>logOut(navigate)} eventKey="4.4"><p className='dropdown-font'>Logout</p></Dropdown.Item>
                            </Dropdown.Menu>

                        </Dropdown>

                        {/*</DropdownButton >*/}
                    </li>

                    <li className="nav-item">
                        <Dropdown >
                            <Dropdown.Toggle variant="secondary-outline" id="dropdown-basic">
                                <FontAwesomeIcon icon={faBell} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu >
                                <Dropdown.Item className='text-capitalize'  eventKey="4.4"><p className='dropdown-font'>Welcome {currentUser?.firstName} {currentUser?.lastName}</p></Dropdown.Item>

                                {!currentUser?.receiveFriendRequest ? "" : <NotificationFriendRequest></NotificationFriendRequest>

                                }
                                <Dropdown.Divider />
                            </Dropdown.Menu>

                        </Dropdown>

                    </li>
                </ul>
            </div>

        </nav>

    );
}


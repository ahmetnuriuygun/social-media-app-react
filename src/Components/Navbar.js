import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBell, faCat, faEnvelope, faGear, faHouse, faMagnifyingGlass, faUser} from "@fortawesome/free-solid-svg-icons";
import {Button, Dropdown, Form} from "react-bootstrap";
import React from "react";


export function NavigationBar(){
    return (
        <div className="topnav">

            <div className="topnav-centered">
                <a href="#" className="home"><FontAwesomeIcon icon={faHouse} /></a>
                <a href="#" className="message"><FontAwesomeIcon icon={faEnvelope} /></a>
                <div className="input-group search">
                    <div className="form-outline">
                        <input type="search" id="form1" className="form-control" placeholder="Search friends"/>
                    </div>
                    <button type="button" className="btn btn-dark">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </div>

            <a href="#">Nudge<FontAwesomeIcon icon={faCat} bounce /></a>


            <div className="topnav-right">
                <a href="#"><FontAwesomeIcon icon={faUser} /></a>
                <a href="#"><FontAwesomeIcon icon={faGear} /></a>
                <a href="#"><FontAwesomeIcon icon={faBell} /></a>
                <a>
                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            Profile
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Logout</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Invite friends</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </a>

            </div>

        </div>
    );
}
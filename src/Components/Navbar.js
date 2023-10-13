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


        <nav className="navbar navbar-light navbar-expand-md bg-faded justify-content-center">
            <a href="/" className="navbar-brand d-flex w-50 mr-auto header-logo text-primary">POKE<FontAwesomeIcon icon={faCat} bounce /></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar3">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse w-100" id="collapsingNavbar3">
                <ul className="navbar-nav w-100 justify-content-center">
                    <li className="nav-item active">
                        <a className="nav-link" href="#"><FontAwesomeIcon icon={faHouse} /></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="//codeply.com"><FontAwesomeIcon icon={faEnvelope} /></a>
                    </li>
                    <li className=" d-md-none d-lg-block">
                        <div className="input-group search">
                            <div className="form-outline">
                                <input type="search" id="form1" className="form-control" placeholder="Search friends"/>
                            </div>
                            <button type="button" className="btn btn-dark">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </li>
                </ul>
                <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
                    <li className="nav-item">
                        <a href="#"><FontAwesomeIcon icon={faUser} /></a>
                    </li>
                    <li className="nav-item">
                        <a href="#"><FontAwesomeIcon icon={faGear} /></a>
                    </li>
                    <li className="nav-item">
                        <a href="#"><FontAwesomeIcon icon={faBell} /></a>
                    </li>
                </ul>
            </div>
        </nav>

    );
}
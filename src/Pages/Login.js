import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faCat, faEnvelope, faGear, faHouse, faMagnifyingGlass, faUser} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {Button, Card, Col, Form, FormCheck, FormGroup, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";

function LogInNavbar() {
    return <nav className="navbar login-navbar navbar-expand-sm  justify-content-center">

        <div className='login-header-div'>
            <a href="/" className="navbar-brand d-flex login-header text-white">POKE</a>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar3">
            <span className="navbar-toggler-icon"></span>
        </button>


        <div className="navbar-collapse collapse w-100 " id="collapsingNavbar3">
            <ul className="nav navbar-nav ml-auto w-100 d-md-flex justify-content-end ">
                <li>
                    <Form className="d-flex">
                        <Form.Group className="ms-3" controlId="formBasicEmail">
                            <Form.Label className="text-white">Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"/>
                        </Form.Group>

                        <Form.Group className="ms-3" controlId="formBasicPassword">
                            <Form.Label className="text-white">Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"/>
                            <Form.Text>
                                <p href="#" className="text-muted">Forgotten password</p>
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <input className="btn btn-primary m-4" type="submit" value="Submit"/>
                        </Form.Group>

                    </Form>
                </li>
            </ul>
        </div>
    </nav>;
}

export function Login() {
    return (
        <>
            <LogInNavbar/>
            <main className='d-flex login-main justify-content-center'>
                <div className='login-main-info m-5 h-100'>
                    <h3 className='login-text-info'>Poke helps you connect and share <br/>
                        <span>with the people in your life</span></h3>
                    <img className='mt-3 border-none' src={`images/facebook-login-main.png`}/>
                </div>

                <div className='mt-5 h-100'>
                    <h2 className='fw-bold mb-3'>Create an account</h2>
                    <h4 className='mb-3 text-muted'>It's free and always will be</h4>

                    <Form>
                        <Row>
                            <Col md='6'>
                                <Form.Control placeholder='First Name' type='text'/>
                            </Col>

                            <Col>
                                <Form.Control placeholder='Last Name' type='text'/>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Control className='mt-3' placeholder='Email adress' id='form3' type='text'/>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Control className='mt-3' placeholder='Password' type='password'/>
                            </Col>
                        </Row>

                        <Row>
                            <Col className='mt-3'>
                                <Form.Label className='d-block fw-bold'>Date of Birth</Form.Label>
                                <Form.Control type="date" name="dob" placeholder='Date of birth' />

                            </Col>
                        </Row>

                        <Row>
                            <Col className='mt-3'>
                                <Form.Label className='d-block fw-bold'>Gender: </Form.Label>
                                <Form.Check type='radio' name='inlineRadio' id='inlineRadio1' value='option1'
                                            label='Female' inline/>
                                <Form.Check type='radio' name='inlineRadio' id='inlineRadio2' value='option2'
                                            label='Male' inline/>
                                <Form.Check type='radio' name='inlineRadio' id='inlineRadio3' value='option3'
                                            label='Other' inline/>
                            </Col>
                        </Row>


                        <input className="btn btn-success m-4" type="submit" value="Create an account"/>
                    </Form>

                </div>
            </main>
        </>


    )
}
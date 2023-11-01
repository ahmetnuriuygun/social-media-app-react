import React, {useState} from "react";
import {Col, Form, Row} from "react-bootstrap";
import {createUser, signIn} from "../helpers/functions.js";
import {useNavigate} from "react-router-dom";


function LogInRegisterNavbar() {


    const [info, setInfo] = useState({
        email: "",
        password: "",
    })
    const{email,password} = info;
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn(email,password,navigate)
    }
    const handleChange = (e) => {
        setInfo({...info, [e.target.name]: e.target.value})
    }
    return (
        <nav className="navbar login-navbar navbar-expand-sm  justify-content-center" >

            <div className='login-header-div'>
                <a href="/" className="navbar-brand d-flex login-header text-white">FRIEND SPACE</a>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar3">
                <span className="navbar-toggler-icon"></span>
            </button>


            <div className="navbar-collapse collapse w-100 " id="collapsingNavbar3">
                <ul className="nav navbar-nav ml-auto w-100 d-md-flex justify-content-end ">
                    <li>
                        <Form className="d-flex" onSubmit={handleSubmit}>
                            <Form.Group className="ms-3" controlId="formBasicEmail">
                                <Form.Label className="text-white">Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email"
                                              onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group className="ms-3" controlId="formBasicPassword">
                                <Form.Label className="text-white">Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password"
                                              onChange={handleChange}/>
                                <Form.Text>
                                    <p href="#" className="text-muted">Forgotten password</p>
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <input className="btn btn-primary m-4" type="submit" value="Log In"/>
                            </Form.Group>

                        </Form>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

function LoginRegisterInfo() {
    return (
        <div className="login-main-info m-5 h-100">
            <h3 className="login-text-info">Friend Space helps you connect and share <br/>
                <span>with the people in your life</span></h3>
            <img className="mt-3 border-none" src={`images/facebook-login-main.png`}/>
        </div>
    );
}

function LoginRegisterForm() {


    const [info, setInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        birthDate: "",
        gender: "",
    })

    const navigate = useNavigate();
    const {firstName, lastName, email, password, birthDate, gender} = info;

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(firstName,lastName,email,password,birthDate,gender,navigate);
    }

    const handleChange = (e) => {
        setInfo({...info, [e.target.name]: e.target.value})
    }

    return <div className="mt-5 h-100">
        <h2 className="fw-bold mb-3">Create an account</h2>
        <h4 className="mb-3 text-muted">It's free and always will be</h4>

        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md="6">
                    <Form.Control placeholder="First Name" type="text" required name="firstName"
                                  onChange={handleChange}/>
                </Col>

                <Col>
                    <Form.Control placeholder="Last Name" type="text" required name="lastName"
                                  onChange={handleChange}/>
                </Col>
            </Row>

            <Row>
                <Col className="mt-3">
                    <Form.Control  placeholder="Email adress" type="email" required name="email"
                                  onChange={handleChange}/>
                </Col>
            </Row>

            <Row>
                <Col className="mt-3">
                    <Form.Control  placeholder="Password" type="password" required name="password"
                                  onChange={handleChange}/>
                </Col>
            </Row>

            <Row>
                <Col className="mt-3">
                    <Form.Label className="d-block fw-bold">Date of Birth</Form.Label>
                    <Form.Control type="date" placeholder="Date of birth" required name="birthDate"
                                  onChange={handleChange}/>
                </Col>
            </Row>

            <Row>
                <Col className="mt-3">
                    <Form.Label className="d-block fw-bold">Gender: </Form.Label>
                    <Form.Check type="radio" name="gender" id="inlineRadio1" value="female" label="Female" inline
                                onChange={handleChange}/>
                    <Form.Check type="radio" name="gender" id="inlineRadio2" value="male" label="Male" inline
                                onChange={handleChange}/>
                    <Form.Check type="radio" name="gender" id="inlineRadio3" value="other" label="Other" inline
                                onChange={handleChange}/>
                </Col>
            </Row>

            <input className="btn btn-success m-4" type="submit" value="Create an account"/>
        </Form>

    </div>;
}

export function LoginRegister() {
    return (
        <>
            <LogInRegisterNavbar/>
            <main className='d-flex login-main justify-content-center'>
                <LoginRegisterInfo/>
                <LoginRegisterForm/>
            </main>
        </>
    )
}
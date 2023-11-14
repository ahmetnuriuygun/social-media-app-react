import React, {useState} from "react";
import {Col, Container, Form, Nav, Navbar, Row} from "react-bootstrap";
import {createUser, signIn} from "../helpers/functions.js";
import {useNavigate} from "react-router-dom";
import {toastSuccessNotify} from "../helpers/toastNotify";
import * as PropTypes from "prop-types";


function LoginForm() {

    const [info, setInfo] = useState({
        email: "",
        password: "",
    })
    const {email, password} = info;
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn(email, password, navigate)
    }
    const handleChange = (e) => {
        setInfo({...info, [e.target.name]: e.target.value})
    }

    return (

        // <ul className="nav navbar-nav ml-auto w-100 d-md-flex justify-content-end ">
        //     <li>
        <Container>
            <Row className='mt-3 mt-lg-0'>
                <Form className="d-lg-flex" onSubmit={handleSubmit}>
                    <Col className='col-12 col-lg-4'>
                        <Form.Group className="ms-3" controlId="formBasicEmail">
                            <Form.Label className="text-black text-lg-white">Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email"
                                          onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col className='col-12 col-lg-4'>
                        <Form.Group className="ms-3" controlId="formBasicPassword">
                            <Form.Label className=" text-black text-lg-white">Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password"
                                          onChange={handleChange}/>
                            <Form.Text>
                                <p href="#" className="text-muted">Forgotten password</p>
                            </Form.Text>
                        </Form.Group>

                    </Col>
                    <Col className='col-12 col-lg-4'>
                        <Form.Group>
                            <input className="btn btn-primary btn-sm-block m-4" type="submit" value="Log In"/>
                        </Form.Group>
                    </Col>
                    </Form>

            </Row>
        </Container>

        //     </li>
        // </ul>

)
}



function LogInRegisterNavbar() {


    return (
        <Navbar expand="lg" className="navbar login-navbar justify-content-center">
            <Container>

                <Navbar.Brand className='login-header-div'>
                    <a href="/" className="text-decoration-none d-flex login-header text-white ">FRIEND SPACE</a>
                </Navbar.Brand>
                {/*<Navbar.Toggle className="navbar-toggler" type="button" aria-controls="basic-navbar-nav">*/}
                {/*    <span className="navbar-toggler-icon"></span>*/}
                {/*</Navbar.Toggle>*/}

            <div className='d-none d-lg-block'>
                <LoginForm />
            </div>


            </Container>
        </Navbar>
    );
}

function LoginRegisterInfo() {
    return (
        <div className="login-main-info m-5 h-100">
            <h3 className="login-text-info">Friend Space helps you connect and share <br/>
                <span>with the people in your life</span></h3>
            <img className="mt-3 border-none" src={`images/facebook-login-main.png`} alt='main_picture'/>
        </div>
    );
}

function RegisterForm() {


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
        createUser(firstName, lastName, email, password, birthDate, gender, navigate);
    }

    const handleChange = (e) => {
        setInfo({...info, [e.target.name]: e.target.value})
    }

    return <div className="m-5 h-100 m-lg-0 mt-lg-5">
        <h2 className="fw-bold mb-3">Create an account</h2>
        <h4 className="mb-3 text-muted">It's free and always will be</h4>

        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md="6">
                    <Form.Control placeholder="First Name" type="text" required name="firstName"
                                  onChange={handleChange}/>
                </Col>

                <Col>
                    <Form.Control placeholder="Last Name" type="text" required name="lastName" className='mt-2 mt-lg-0'
                                  onChange={handleChange}/>
                </Col>
            </Row>

            <Row>
                <Col className="mt-3">
                    <Form.Control placeholder="Email adress" type="email" required name="email"
                                  onChange={handleChange}/>
                </Col>
            </Row>

            <Row>
                <Col className="mt-3">
                    <Form.Control placeholder="Password" type="password" required name="password"
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
    const [showRegisterForm,setShowRegisterForm] = useState(true);
    console.log(showRegisterForm);
   const register = () =>{
       const loginForm = document.getElementById("login-form");
       const registerForm = document.getElementById("register-form");
       loginForm.classList.replace('d-block','d-none')
       registerForm.classList.replace('d-none','d-block');
   }

    return (
        <>
            <LogInRegisterNavbar/>
            <main className='d-flex login-main justify-content-center'>
                <div className='d-none d-lg-block'>
                    <LoginRegisterInfo/>
                </div>
                <div className=' d-block d-lg-none' id="login-form">
                    <LoginForm/>
                    <p className='d-lg-none'>Don't have an account? <span><a className='text-primary' onClick={()=>register()} >Create an account</a></span></p>
                </div>

                <div className='d-none  d-lg-block' id="register-form" >
                    <RegisterForm/>
                </div>
            </main>
        </>
    )
}
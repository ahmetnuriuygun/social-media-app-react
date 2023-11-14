import React, {useContext, useState} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {useNavigate} from "react-router-dom";
import {updateDoc} from "firebase/firestore";
import {Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBriefcase,
    faCity,
    faGraduationCap,
    faHeart,
    faHouseChimneyUser,
    faPhone,
    faSchool
} from "@fortawesome/free-solid-svg-icons";
import {toastInfoNotify, toastSuccessNotify, toastWarnNotify} from "../helpers/toastNotify";

export function ProfileAboutTab(props) {
    const {user} = props;
    const currentUser = useContext(CurrentUserContext);

    const [isReadOnly, setIsReadOnly] = useState(!(currentUser?.id === user?.id))

    const [userToEdit, setUserToEdit] = useState(user);

    const navigate = useNavigate();
    const handleSubmit = async  () => {

        updateDoc(userToEdit.ref, userToEdit);
        navigate("/home");
        toastInfoNotify("You updated your profile information.")
    }

    const handleChange = (e) => {
        setUserToEdit({...userToEdit, [e.target.name]: e.target.value})
    }
    return (
        <Container>
            <Row>
                <Col className='col-10'>
                    <h4>About</h4>
                    <Form onSubmit={handleSubmit}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faBriefcase}/></InputGroup.Text>
                            <Form.Control
                                placeholder="Workplace.." readOnly={isReadOnly} type='text' onChange={handleChange}
                                name='workPlace' value={userToEdit.workPlace}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faSchool}/></InputGroup.Text>
                            <Form.Control
                                placeholder="Highschool.." readOnly={isReadOnly} type='text' onChange={handleChange}
                                name='highschool' value={userToEdit.highschool}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon
                                icon={faGraduationCap}/></InputGroup.Text>
                            <Form.Control
                                placeholder="University"
                                type='text' onChange={handleChange} readOnly={isReadOnly} name='university'
                                value={userToEdit.university}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faCity}/></InputGroup.Text>
                            <Form.Control
                                placeholder="City..."
                                type='text' onChange={handleChange} readOnly={isReadOnly} value={userToEdit.city}
                                name='city'
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon
                                icon={faHouseChimneyUser}/></InputGroup.Text>
                            <Form.Control
                                placeholder="Hometown..."
                                type='text' onChange={handleChange} readOnly={isReadOnly} name='hometown'
                                value={userToEdit.hometown}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faPhone}/></InputGroup.Text>
                            <Form.Control
                                placeholder="Phone Number..."
                                type='text' onChange={handleChange} readOnly={isReadOnly} name='phoneNumber'
                                value={userToEdit.phoneNumber}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faHeart}/></InputGroup.Text>
                            <Form.Control
                                placeholder="Relationship..."
                                type='text' onChange={handleChange} readOnly={isReadOnly} name='relationship'
                                value={userToEdit.relationship}
                            />
                        </InputGroup>

                        <Row>
                            <Col className="mb-3 d-flex justify-content-center flex-column">
                                {!isReadOnly ?
                                    <input className="btn btn-success m-3 btn-block " type="submit"
                                           value="Update"/> : ""}
                            </Col>
                        </Row>
                    </Form>
                </Col>


            </Row>
        </Container>
    );
}
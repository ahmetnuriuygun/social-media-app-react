import {Button, Card, Col, Container, Form, Modal, Row} from "react-bootstrap";
import React, {useContext, useState} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {updateDoc} from "firebase/firestore";
import {toastErrorNotify, toastInfoNotify} from "../helpers/toastNotify";
import {useNavigate} from "react-router-dom";



export function PremiumContent() {
    const currentUser = useContext(CurrentUserContext);
   const [plan,setPlan] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleStart = () => {setShow(true);setPlan("start")}
    const handleBasic = () => {setShow(true);setPlan("basic")}
    const handleMedium = () => {setShow(true);setPlan("medium")}
    const handleExpert = () => {setShow(true);setPlan("expert")}

    console.log(show)



    return (
        <div>
            <div className='mt-2 text-center'>
                <h1>Pricing Plans</h1>
                <p>Friend Space premium packages gives you a big opportunity to discover and make connect with your
                    friends.</p>
            </div>

            <Container>
                <Row className='ms-5  ms-lg-0 '>
                    <Col className='col-12 col-md-6 '>
                        <Card className="text-center premium-cards" style={{width: '18rem', height: '23rem'}}>
                            <Card.Header>Start</Card.Header>
                            <Card.Body>
                                <Card.Title>Free</Card.Title>
                                <Card.Text>
                                    <ul className='list-group'>
                                        <li className='list-group-item'>50 friends</li>
                                        <li className='list-group-item'>25 posts</li>
                                        <li className='list-group-item'>5 marketplace shopping</li>
                                        <li className='list-group-item'>Unlimited message</li>
                                    </ul>
                                </Card.Text>
                                {currentUser.isPremium==="start" ? "" : <Button onClick={handleStart} variant="danger">Get Plan</Button>}
                            </Card.Body>
                            <Card.Footer className="text-muted">You are using free plan </Card.Footer>
                        </Card>

                    </Col>
                    <Col className='mt-3 mt-lg-0 '>
                        <Card className="text-center premium-cards" style={{width: '18rem', height: '23rem'}}>
                            <Card.Header>Basic</Card.Header>
                            <Card.Body>
                                <Card.Title>14.99&euro;    </Card.Title>
                                <Card.Text>
                                    <ul className='list-group'>
                                        <li className='list-group-item'>250 friends</li>
                                        <li className='list-group-item'>50 posts</li>
                                        <li className='list-group-item'>10 marketplace shopping</li>

                                        <li className='list-group-item'>See who viewed your profile</li>
                                    </ul>
                                </Card.Text>
                                {currentUser.isPremium==="basic" ? "" : <Button onClick={handleBasic} variant="danger">Get Plan</Button>}
                            </Card.Body>
                            <Card.Footer className="text-muted">Try basic plan for one month</Card.Footer>
                        </Card>

                    </Col>
                </Row>
                <Row className='ms-5 mt-3 ms-lg-0 '>
                    <Col>
                        <Card className="text-center premium-cards" style={{width: '18rem', height: '23rem'}}>
                            <Card.Header>Medium</Card.Header>
                            <Card.Body>
                                <Card.Title>49.99&euro;    </Card.Title>
                                <Card.Text>
                                    <ul className='list-group'>
                                        <li className='list-group-item'>1000 friends</li>
                                        <li className='list-group-item'>200 posts</li>
                                        <li className='list-group-item'>25 marketplace shopping</li>
                                    </ul>
                                </Card.Text>
                                {currentUser.isPremium==="medium" ? "" : <Button onClick={handleMedium} variant="danger">Get Plan</Button>}
                            </Card.Body>
                            <Card.Footer className="text-muted">Invite 10 friends to use medium plan 3 month
                                free</Card.Footer>
                        </Card>
                    </Col>
                    <Col className='mt-3 mt-lg-0 '>
                        <Card className="text-center premium-cards" style={{width: '18rem', height: '23rem'}}>
                            <Card.Header>Expert</Card.Header>
                            <Card.Body>
                                <Card.Title>129.99&euro;</Card.Title>
                                <Card.Text>
                                    <ul className='list-group'>
                                        <li className='list-group-item'>Unlimited friends</li>
                                        <li className='list-group-item'>Unlimited posts</li>
                                        <li className='list-group-item'>Unlimited marketplace shopping</li>
                                    </ul>
                                </Card.Text>
                                {currentUser.isPremium==="expert" ? "" : <Button onClick={handleExpert} variant="danger">Get Plan</Button>}
                            </Card.Body>
                            <Card.Footer className="text-muted">Invite 30 friends to use medium plan 3 month
                                free</Card.Footer>
                        </Card>

                    </Col>
                </Row>
            </Container>

            <PlanModal handleClose={handleClose} show={show} plan={plan} currentUser={currentUser}/>
        </div>
    )
}

function PlanModal(props) {
    const {handleClose,show,plan,currentUser} = props;
    const navigate = useNavigate();
    const handleSubmit = async () => {
        try{
            updateDoc(currentUser.ref,{isPremium:plan})
        }catch(err){
            toastErrorNotify(err.message)
        }
        navigate("/home");
        toastInfoNotify(`You changed your plan to ${plan}.`)
    }


    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Change Your Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to change your plan to {plan.toUpperCase()} ?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Form onSubmit={handleSubmit}>
                    <Button variant="primary"  type='submit'>
                        Save Changes
                    </Button>
                </Form>

            </Modal.Footer>
        </Modal>
    )
}
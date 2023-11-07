import {Button, Card, Col, Container, Row} from "react-bootstrap";
import React from "react";

export function PremiumContent() {

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
                                <Button variant="danger">Get Plan</Button>
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
                                <Button variant="danger">Get Plan</Button>
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
                                <Button variant="danger">Get Plan</Button>
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
                                <Button variant="danger">Get Plan</Button>
                            </Card.Body>
                            <Card.Footer className="text-muted">Invite 30 friends to use medium plan 3 month
                                free</Card.Footer>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}
import {Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart, faShare} from "@fortawesome/free-solid-svg-icons";

export function PostCard() {
    return(
        <div>
            <Card className='post-card'>
                <Card.Body>
                    <Card.Title>
                        <img className='profile-img-card rounded-circle' src="/images/profile.jpg"/> <span className='h5'>Fjodor Dostojevski</span>
                    </Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Card.Img style={{height:"500px"}}  src="https://picsum.photos/200/377" />
                </Card.Body>
                <Card.Footer>
                    <div className='d-flex justify-content-around '>
                        <p><FontAwesomeIcon icon={faHeart}/> Like</p>
                        <p><FontAwesomeIcon icon={faComment} />Comment</p>
                        <p><FontAwesomeIcon icon={faShare} />Share</p>
                    </div>
                </Card.Footer>
            </Card>
        </div>
    )
}
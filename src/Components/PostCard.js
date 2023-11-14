import React, {useContext, useState} from "react";
import {ThemeContext} from "../context/ThemeContext";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {UsersContext} from "../context/UsersContext";
import {useNavigate} from "react-router-dom";
import {arrayUnion, updateDoc} from "firebase/firestore";
import {Button, Card, Collapse, Form, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart, faPaperPlane, faShare} from "@fortawesome/free-solid-svg-icons";
import {toastInfoNotify, toastSuccessNotify} from "../helpers/toastNotify";

export function PostCard(props) {
    const {post} = props;
    const [{theme}] = useContext(ThemeContext);
    const currentUser = useContext(CurrentUserContext);
    const users = useContext(UsersContext);
    const [openCommentSection, setOpenCommentSection] = useState(false);
    const [comment, setComment] = useState();
    const navigate = useNavigate();

    let firstName;
    let lastName;
    let profileImg;
    let user;
    users?.forEach(u => {
        if (post.ownerId === u.id) {
            firstName = u.firstName
            lastName = u.lastName
            profileImg = u.profileImg
            user = u;
        }


    })

    const [isLiked, setIsLiked] = useState(false);
    const [likeCounter, setLikeCounter] = useState(3)

    const likePost = () => {

        const lastLikeInfo = {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            post: post.id,
            notificationImgUrl: post.photoUrl ? post.photoUrl : currentUser.profileImg

        }

        setLikeCounter(likeCounter + 1);

        if (likeCounter % 2 === 0) {
            updateDoc(post.ref, {likesAmount: post.likesAmount - 1});
            setIsLiked(false);
        }
        else {
            updateDoc(post.ref, {likesAmount: post.likesAmount + 1});
            updateDoc(post.ref, {arrayOfLikedPersons: arrayUnion(currentUser.id)})
            updateDoc(user.ref, {lastLikeInfo: lastLikeInfo})
            setIsLiked(true);
        }
    }


    const shareComment = async (e) => {
        e.preventDefault();
        const newComment = {
            text: comment,
            commentOwner: currentUser.id
        };

        const lastCommentInfo = {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            post: post.id,
            notificationImgUrl: post.photoUrl ? post.photoUrl : currentUser.profileImg
        }

        const id = document.getElementById('text-input')
        id.value = ""
        navigate("/home")
        updateDoc(post.ref, {comments: arrayUnion(newComment)})
        updateDoc(user.ref, {lastCommentInfo: lastCommentInfo}).then(()=>{
            toastInfoNotify(`You gave a comment the post of ${firstName} ${lastName}`)
        })
    }


    let firstNameUserOfCommented = ""
    let lastNameUserOfCommented = ""
    let profileImgUserOfCommented = ""
    let commentToWrite = ""

    users.forEach(u => {
        if (u.id === post.comments[post.comments.length - 1]?.commentOwner) {
            if (post.comments.length > 0) {
                commentToWrite = post.comments[post.comments.length - 1].text
                firstNameUserOfCommented = u.firstName;
                lastNameUserOfCommented = u.lastName;
                profileImgUserOfCommented = u.profileImg;
            }

        }
    })


    return (
        <Card className='post-card border border-secondary rounded p-2' style={{background: theme.backgroundColor, color: theme.color}}>
            <Card.Body>
                <Card.Title onClick={() => navigate(`/profile/${user.id}`)}>
                    <img className='profile-img-card rounded-circle'
                         src={profileImg ? profileImg : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`}/>
                    <span className='h5 text-capitalize ms-3'>{firstName} {lastName}</span>
                </Card.Title>
                <Card.Text>
                    {post.text}
                </Card.Text>
                {post.photoUrl ? <Card.Img style={{height: "20rem"}} src={`${post.photoUrl}`}/> : ""}

            </Card.Body>
            <Card.Footer>
                <div className='d-flex justify-content-around '>
                    <p><FontAwesomeIcon size="xl" className='me-2' style={isLiked ? {color: 'red'} : {color: 'black'}}
                                        icon={faHeart} onClick={likePost}/> Like({post.likesAmount})</p>
                    <p><FontAwesomeIcon size="xl" className='me-2' icon={faComment}
                                        onClick={() => setOpenCommentSection(!openCommentSection)}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={openCommentSection}/>Comment</p>
                    <p><FontAwesomeIcon size="xl" className='me-2' icon={faShare}/>Share</p>
                </div>

                <div>

                    <Collapse in={openCommentSection} dimension="width">
                        <div id="example-collapse-text">
                            <Card body style={{background: theme.backgroundColor, color: theme.color, width: 'inherit'}}>
                                <Form.Group className='input-box'>
                                    <Card.Title>
                                        <img className='profile-img-card rounded-circle'
                                             src={profileImgUserOfCommented ? profileImgUserOfCommented : `images/blank-profile.jpg`}/>
                                    </Card.Title>

                                    <InputGroup className="mb-3">

                                        <div id="commentDisplay">
                                            <h5 className='text-capitalize'>{firstNameUserOfCommented + " " + lastNameUserOfCommented} </h5>
                                            <h6>{commentToWrite}</h6>
                                        </div>
                                    </InputGroup>
                                </Form.Group>

                                <Form onSubmit={shareComment}>
                                    <InputGroup className="mb-3">
                                        <Form.Control aria-describedby="basic-addon2" name="text" id='text-input'
                                                      onChange={(e) => setComment(e.target.value)}
                                        />
                                        <Button variant="outline-secondary" id="button-addon2" type='submit'>
                                            <FontAwesomeIcon icon={faPaperPlane}/>
                                        </Button>
                                    </InputGroup>
                                </Form>
                            </Card>
                        </div>
                    </Collapse>
                </div>
            </Card.Footer>
        </Card>
    )
}
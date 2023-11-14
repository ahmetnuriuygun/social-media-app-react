import {Button, Card, Form, InputGroup, Modal} from "react-bootstrap";
import React, {useContext, useState} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFaceSmile, faImage, faVideo} from "@fortawesome/free-solid-svg-icons";
import {addPost, createUser} from "../helpers/functions";
import {useNavigate, useParams} from "react-router-dom";
import {arrayUnion, updateDoc} from "firebase/firestore";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../helpers/firebase";
import {toastErrorNotify} from "../helpers/toastNotify";
import {ThemeContext} from "../context/ThemeContext";

function PhotoShareModal(props) {
    const {showPhotoModal, onShowPhotoModal} = props;

    const currentUser = useContext(CurrentUserContext);
    const ownerId = currentUser?.id
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const navigate = useNavigate();
    const [description, setDescription] = useState("");

    const handlePhotoShareChange = (e) => {
        setImage(e.target.files[0])
    }

    const handlePhotoShareSubmit = (e) => {
        e.preventDefault()
        const storageRef = ref(storage, "images/" + image.name);
        uploadBytes(storageRef, image).then((snapshot) => {
            getDownloadURL(storageRef)
                .then((url) => {
                    setUrl(url);
                    addPost(description, ownerId, url, currentUser,navigate);
                    updateDoc(currentUser.ref, {postsAmount: currentUser.postsAmount + 1})

                })
                .catch((error) => {
                    toastErrorNotify(error.message)

                });
            setImage(null);
            onShowPhotoModal(false);
        })

    }


    return (
        <Modal show={showPhotoModal} onHide={() => onShowPhotoModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handlePhotoShareSubmit}>
                    <Form.Group>
                        <Form.Label>Write description to your photo ...</Form.Label>
                        <Form.Control type='text' onChange={(e) => setDescription(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group className='mt-3'>
                        <Form.Control type='file' name='photoUrl' onChange={handlePhotoShareChange}></Form.Control>
                    </Form.Group>
                    <Modal.Footer>

                        <Button variant="outline-secondary" type='submit'>
                            Share
                        </Button>
                    </Modal.Footer>
                </Form>

            </Modal.Body>

        </Modal>
    );
}

export function PostInput() {
    const [{theme}] = useContext(ThemeContext);

    const currentUser = useContext(CurrentUserContext);
    const [text, setText] = useState();
    const [photoUrl, setPhotoUrl] = useState("");
    const ownerId = currentUser.id
    const [showPhotoModal, setShowPhotoModal] = useState(false);


    const handleModalShow = () => setShowPhotoModal(true);

    const navigate = useNavigate();
    const handleSubmit = async (e)  => {
        e.preventDefault();
        addPost(text, ownerId, photoUrl, currentUser,navigate);
        updateDoc(currentUser.ref, {postsAmount: currentUser.postsAmount + 1})
    }


    return (
        <Card className='my-3 border border-secondary rounded p-2' style={{background:theme.backgroundColor,color:theme.color}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='input-box'>

                        <Card.Title onClick={() => navigate(`/profile/${currentUser.id}`)}>

                            <img className='profile-img-card rounded-circle'
                                 src={currentUser?.profileImg ? currentUser.profileImg : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`}/>

                        </Card.Title>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder={`What are you thinking, ${currentUser?.firstName.charAt(0).toUpperCase() + currentUser?.firstName.slice(1)} ?`}
                            aria-describedby="basic-addon2" name="text" id='text-input' className='post-input-form'
                            onChange={(e) => setText(e.target.value)}
                        />
                        <Button variant="outline-secondary" id="button-addon2" type='submit'>
                            Share
                        </Button>
                    </InputGroup>
                </Form.Group>
            </Form>
            <div className='d-flex justify-content-around mt-2'>
                <div>
                    <FontAwesomeIcon icon={faVideo} size="xl" className='me-2'/><span>Live Broadcast </span>
                </div>
                <div>
                    <FontAwesomeIcon icon={faImage} size="xl" className='me-2'
                                     onClick={handleModalShow}/><span>Photo</span>
                </div>
                <div>
                    <FontAwesomeIcon icon={faFaceSmile} size="xl" className='me-2'/><span>Feeling</span>
                </div>
            </div>

            <PhotoShareModal showPhotoModal={showPhotoModal} onShowPhotoModal={setShowPhotoModal}></PhotoShareModal>

        </Card>
    )

}
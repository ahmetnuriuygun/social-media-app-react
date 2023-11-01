import {Button, Card, Form, InputGroup} from "react-bootstrap";
import React, {useContext, useState} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFaceSmile, faImage, faVideo} from "@fortawesome/free-solid-svg-icons";
import {addPost, createUser} from "../helpers/functions";
import {useNavigate} from "react-router-dom";
import {arrayUnion, updateDoc} from "firebase/firestore";

export function PostInput(){
    const currentUser = useContext(CurrentUserContext)
    const [text,setText] = useState();
    const [photoUrl,setPhotoUrl] = useState("");
    const ownerId= currentUser.id;



    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        addPost(text,ownerId,photoUrl,currentUser);
        updateDoc(currentUser.ref,{postsAmount:currentUser.postsAmount+1})

        const id = document.getElementById('text-input')
        id.value=""
        navigate("/home")

    }
    console.log(currentUser)
    return(
     <Card className='my-3 rounded p-2'>
         <Form onSubmit={handleSubmit}>
             <Form.Group className='input-box' >
                 <Form.Label> <img className='dropdown-img' src={currentUser.profileImg ? currentUser.profileImg : `images/blank-profile.jpg`}/></Form.Label>
                 <InputGroup className="mb-3">
                     <Form.Control
                         placeholder={`What are you thinking, ${currentUser?.firstName.charAt(0).toUpperCase() + currentUser?.firstName.slice(1)} ?`}
                         aria-describedby="basic-addon2" name="text" id='text-input'
                         onChange={(e)=>setText(e.target.value)}
                     />
                     <Button variant="outline-secondary" id="button-addon2" type='submit'>
                         Share
                     </Button>
                 </InputGroup>
             </Form.Group>
         </Form>
         <div className='d-flex justify-content-around mt-2'>
             <div>
                 <FontAwesomeIcon icon={faVideo} size="xl" className='me-2' /><span>Live Broadcast </span>
             </div>
             <div>
                 <FontAwesomeIcon icon={faImage} size="xl" className='me-2' /><span>Photo</span>
             </div>
             <div>
                 <FontAwesomeIcon icon={faFaceSmile} size="xl" className='me-2'/><span>Feeling</span>
             </div>
         </div>

     </Card>






)

}
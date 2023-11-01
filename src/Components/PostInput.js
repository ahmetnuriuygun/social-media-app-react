import {Form} from "react-bootstrap";
import React, {useContext} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";

export function PostInput(){
    const currentUser = useContext(CurrentUserContext)
    console.log(currentUser)
    return(

        <Form>
            <Form.Group className="input-box mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label> <img className='dropdown-img' src={currentUser.profileImg ? currentUser.profileImg : `images/blank-profile.jpg`}/></Form.Label>
                <Form.Control type="text" placeholder={`What are you thinking, ${currentUser?.firstName.charAt(0).toUpperCase() + currentUser?.firstName.slice(1)} ?`} />

            </Form.Group>
        </Form>

        )

}
import {Form} from "react-bootstrap";
import {useContext} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";

export function PostInput(){
    const currentUser = useContext(CurrentUserContext)
    console.log(currentUser)
    return(

        <Form>
            <Form.Group className="input-box mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label> <img src="/images/profile.jpg"/></Form.Label>
                <Form.Control type="text" placeholder={`What are you thinking ${currentUser.map(c=>c.firstName)}`} />
            </Form.Group>
        </Form>

        )

}
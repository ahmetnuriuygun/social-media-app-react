import {Form} from "react-bootstrap";

export function PostInput(){
    return(

        <Form>
            <Form.Group className="input-box mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label> <img src="/images/profile.jpg"/></Form.Label>
                <Form.Control type="text" placeholder="What are you thinking,Dostoyevski? " />
            </Form.Group>
        </Form>

        )

}
import React, {useContext, useState} from "react";
import {ThemeContext} from "../context/ThemeContext";
import {useNavigate} from "react-router-dom";
import {deleteUser, logOut} from "../helpers/functions";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import {Button, Form, Modal} from "react-bootstrap";
import * as PropTypes from "prop-types";
import { deleteDoc} from "firebase/firestore";
import currentUserContext, {CurrentUserContext} from "../context/CurrentUserContext";
import {toastErrorNotify, toastSuccessNotify} from "../helpers/toastNotify";
import firebase from "../helpers/firebase";

export function AccountManagement() {


    const [{theme, isDark}, toggleTheme] = useContext(ThemeContext);
    const [showStopAccount, setShowStopAccount] = useState(false);
    const [showRemoveAccount, setShowRemoveAccount] = useState(false);
    const navigate = useNavigate();
    const currentUser = useContext(CurrentUserContext);
    console.log(currentUser)
    const stopAccount = () => {
        logOut(navigate)
    }

    const handleStopAccountModal = () => {
        setShowStopAccount(false);
    }

    const removeAccount = async () => {
        try {
            await deleteUser();

             await deleteDoc(currentUser.ref);
            toastSuccessNotify("You removed your account,We hope see you again!🙂");

            await logOut(navigate)

        } catch(error) {
            toastErrorNotify(error.message);
        }

    }

    const handleRemoveAccountModal = () => {
        setShowRemoveAccount(false);
    }


    return (
        <div className='mt-3 min-vh-100'>
            <div className='mt-3'>
                <h5>Use Friend Space in {isDark ? "Light Mode" : "Dark Mode"}</h5>
                <BootstrapSwitchButton
                    checked={isDark}
                    onlabel='Light'
                    offlabel='Dark'
                    onChange={toggleTheme}
                    onstyle="light"
                    offstyle="dark"
                    width={100}
                />
            </div>
            <div className='mt-3'>
                <h5>Deactiveer account</h5>
                <Button variant='warning' onClick={() => setShowStopAccount(true)}>Deactiveer account</Button>
            </div>
            <div className='mt-3'>
                <h5>Remove Account</h5>
                <Button variant='danger' onClick={() => setShowRemoveAccount(true)}>Delete Account</Button>
            </div>

            <StopAccountModal show={showStopAccount} onHide={handleStopAccountModal} stopAccount={stopAccount}/>

            <RemoveAccountModal show={showRemoveAccount} onHide={handleRemoveAccountModal} removeAccount={removeAccount}
                                stopAccount={stopAccount}/>

        </div>
    );
}

function StopAccountModal(props) {
    const {show, onHide, stopAccount} = props;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Dou you want to take a break</Modal.Title>
            </Modal.Header>
            <Modal.Body>Not Problem! You can deactiveer your friend space account temporarily. If you log in again your
                account will be active automatically.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="warning" onClick={stopAccount}>
                    Deactiveer
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

StopAccountModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    stopAccount: PropTypes.func
};

function RemoveAccountModal(props) {
    const {show, onHide, removeAccount, stopAccount} = props;
    return <Modal show={show} onHide={onHide} className='p-3'>
        <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to remove your account?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h6>Give us some information? Why do you want to remove your account?</h6>
            <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">I spend so much time</option>
                <option value="2">I created second account</option>
                <option value="3">I have concerns about privacy</option>
                <option value="3">It is hard to use it.</option>
            </Form.Select>

            <h4 className='mt-3'>We can recommend you deactiveer your account instead of remove it.</h4>
            <Button variant="warning" onClick={stopAccount}>
                Deactiveer
            </Button>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Cancel
            </Button>
            <Button variant="primary" onClick={removeAccount}>
                Remove my account
            </Button>
        </Modal.Footer>
    </Modal>;
}

RemoveAccountModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    removeAccount: PropTypes.func,
    stopAccount: PropTypes.func,
};
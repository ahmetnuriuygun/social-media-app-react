import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlay, faNewspaper, faPuzzlePiece, faStore} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {ThemeContext} from "../context/ThemeContext";

export function LeftSidebar() {
    const currentUser = useContext(CurrentUserContext)
    const [{theme}] = useContext(ThemeContext);
    const navigate = useNavigate();


    return (


        <div className="row-offcanvas row-offcanvas-left">
            <div id="sidebar-left" className="sidebar-offcanvas"
                 style={{background: theme.backgroundColor, color: theme.color}}>
                <>
                    <div className="d-flex flex-col justify-content-center align-items-center">

                        <div onClick={() => navigate(`/profile/${currentUser.id}`)}>

                            <img src={currentUser?.profileImg ? currentUser?.profileImg : `images/blank-profile.jpg`}
                                 alt="img" className="justify-content-center"/>
                            <h3 className="text-center text-capitalize">{currentUser?.firstName} {currentUser?.lastName}</h3>
                            {
                                currentUser?.city || currentUser?.country ?
                                    <p className="text-center">{currentUser?.city.charAt(0).toUpperCase() + currentUser?.city.slice(1)},{currentUser?.country.charAt(0).toUpperCase() + currentUser?.country.slice(1)}</p> :
                                    <Button className='btn-not-completed justify-content-center text-center mr-auto'
                                            onClick={() => navigate("/settings")}>Complete your registration</Button>
                            }


                        </div>
                    </div>

                    <hr/>

                    <div className="d-flex flex-row justify-content-center align-items-center">

                        <div className="m-3">
                            <h3 className="text-center">{currentUser?.postsAmount}</h3>
                            <p>Posts</p>
                        </div>
                        <div className="m-3">
                            <h3 className="text-center">{currentUser?.friendsAmount}</h3>
                            <p>Friends</p>
                        </div>

                    </div>

                    {
                        currentUser?.friends ?
                            <Button className='btn-discover justify-content-center text-center mr-auto'
                                    onClick={() => navigate("/discover")}>Discover your friends</Button> : ""

                    }
                </>


                <hr/>

                <div>
                    <ul className="sidebar-links list-unstyled m-3">
                        <li><a href="#"><FontAwesomeIcon className="me-4" icon={faPuzzlePiece}/> Games</a></li>
                        <li><a href="#"><FontAwesomeIcon className="me-4" icon={faStore}/>Marketplace</a></li>
                        <li><a href="#"><FontAwesomeIcon className="me-4" icon={faCirclePlay}/>Shorts</a></li>
                        <li><a href="#"><FontAwesomeIcon className="me-4" icon={faNewspaper}/>News</a></li>
                    </ul>
                </div>

            </div>
        </div>
    );

}
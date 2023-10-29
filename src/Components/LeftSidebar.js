import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlay, faNewspaper, faPuzzlePiece, faStore} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export function LeftSidebar() {
    const currentUser = useContext(CurrentUserContext)
    const navigate = useNavigate();
    console.log(currentUser)

    return (


        <div className="row-offcanvas row-offcanvas-left">
            <div id="sidebar-left" className="sidebar-offcanvas">
                {currentUser?.map((c) =>
                    <>
                    <div className="d-flex flex-col justify-content-center align-items-center">

                    <div>

                                <img src={c.profileImg ? c.profileImg : `images/blank-profile.jpg`} alt="img" className="justify-content-center"/>
                                <h3 className="text-center">{c.firstName.charAt(0).toUpperCase() + c.firstName.slice(1)} {c.lastName.charAt(0).toUpperCase() + c.lastName.slice(1)}</h3>
                                {
                                    c.city || c.country ? <p className="text-center">{c.city.charAt(0).toUpperCase() + c.city.slice(1)},{c.country.charAt(0).toUpperCase() + c.country.slice(1)}</p> :
                                        <Button className='btn-not-completed justify-content-center text-center mr-auto' onClick={()=>navigate("/settings")}>Complete your registration</Button>
                                }



                    </div>
                </div>

                <hr/>

                <div className="d-flex flex-row justify-content-center align-items-center">

                    <div className="m-3">
                        <h3 className="text-center">{c.postsAmount}</h3>
                        <p>Posts</p>
                    </div>
                    <div className="m-3">
                        <h3 className="text-center">{c.followers}</h3>
                        <p>Followers</p>
                    </div>
                    <div className="m-3">
                        <h3 className="text-center">{c.following}</h3>
                        <p>Following</p>
                    </div>
                </div>

                        {
                            c.followers<5 || c.following<5 ?  <Button className='btn-discover justify-content-center text-center mr-auto' >Discover your friends</Button> : ""

                        }
                    </>


                )}
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
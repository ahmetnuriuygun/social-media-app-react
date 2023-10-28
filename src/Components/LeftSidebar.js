import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlay, faNewspaper, faPuzzlePiece, faStore} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";

export function LeftSidebar() {
    const currentUser = useContext(CurrentUserContext)

    return (


        <div className="row-offcanvas row-offcanvas-left">
            <div id="sidebar-left" className="sidebar-offcanvas">
                <div className="d-flex flex-col justify-content-center align-items-center">

                    <div>
                        {currentUser?.map((c) =>
                            <>
                                <img src={`images/${c.profileImg}`} alt="img" className="justify-content-center"/>
                                <h3 className="text-center">{c.firstName} {c.lastName}</h3>
                                <p className="text-center">{c.city},{c.country}</p>
                            </>
                        )}

                    </div>
                </div>

                <hr/>

                <div className="d-flex flex-row justify-content-center align-items-center">

                    <div className="m-3">
                        <h3 className="text-center">892</h3>
                        <p>Posts</p>
                    </div>
                    <div className="m-3">
                        <h3 className="text-center">22.5k</h3>
                        <p>Followers</p>
                    </div>
                    <div className="m-3">
                        <h3 className="text-center">150</h3>
                        <p>Following</p>
                    </div>
                </div>

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
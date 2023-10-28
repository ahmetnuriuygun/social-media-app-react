import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCakeCandles} from "@fortawesome/free-solid-svg-icons";
import {forEach} from "react-bootstrap/ElementChildren";
import * as PropTypes from "prop-types";

export function RightSidebar(props){
    const {users,currentUser} = props;


    users.filter(u=>currentUser.friends.includes(u.userId))

   return(
       <div className="row-offcanvas row-offcanvas-right">
           <div id="sidebar-right" className="sidebar-offcanvas">
               <div>
                   <h3 className="ms-2">Birthdays</h3>
                   <p className="ms-2"><FontAwesomeIcon icon={faCakeCandles} />Today is the birthday of Jane Austin </p>
               </div>
               <hr/>
               <div>
                   <h3 className='ms-4'>Friends</h3>
                   <ul>
                       {users.filter(u=>currentUser.friends.includes(u.userId)).map(f=>
                           <FriendsList key={f.userId} friend={f}/>
                       )}
                   </ul>
               </div>
           </div>
       </div>
   )
}

function FriendsList(props) {
    const {friend} = props;
    return (
        <li><img src={`images/${friend.profileImg}`}/>{friend.firstName} {friend.lastName}</li>
    );
}

FriendsList.propTypes = {friend: PropTypes.any};
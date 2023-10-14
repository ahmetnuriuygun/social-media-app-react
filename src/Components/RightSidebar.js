import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCakeCandles} from "@fortawesome/free-solid-svg-icons";

export function RightSidebar(){
   return(
       <div className="row-offcanvas row-offcanvas-right">
           <div id="sidebar-right" className="sidebar-offcanvas">
               <div>
                   <h3 className="ms-2">Birthdays</h3>
                   <p className="ms-2"><FontAwesomeIcon icon={faCakeCandles} />Today is the birthday of Jane Austin </p>
               </div>
               <hr/>
               <div>
                   <h3>Friends</h3>
                   <ul>
                       <li> <img src="/images/friends2.jpeg"/>Stefan Zweig</li>
                       <li> <img src="/images/friends3.jpeg"/>Franz Kafka</li>
                       <li> <img src="/images/friends4.jpeg"/>Thomas More</li>
                       <li> <img src="/images/friends5.jpeg"/>Tolstoy</li>
                       <li> <img src="/images/friends6.jpeg"/>Erich Fromm</li>
                       <li> <img src="/images/friends2.jpeg"/>Sheakspeare</li>
                       <li> <img src="/images/friends4.jpeg"/>Immanuel Kant</li>
                       <li> <img src="/images/friends5.jpeg"/>Freud</li>
                       <li> <img src="/images/friends6.jpeg"/>Hegel</li>
                       <li> <img src="/images/friends2.jpeg"/>Albert Camus</li>
                       <li> <img src="/images/friends2.jpeg"/>Sartre</li>
                       <li> <img src="/images/friends3.jpeg"/>Gogol</li>
                       <li> <img src="/images/friends4.jpeg"/>Spinoza</li>
                   </ul>
               </div>
           </div>
       </div>
   )
}
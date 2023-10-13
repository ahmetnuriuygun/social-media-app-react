export function RightSidebar(){
   return(
       <div className="row-offcanvas row-offcanvas-right">
           <div id="sidebar-right" className="sidebar-offcanvas">
               <div>
                   <h3 className="me-2">Dogum Gunleri</h3>
                   <p>Today is the birthday of Michael Ewens </p>
               </div>
               <hr/>
               <div>
                   <h3>Friends</h3>
                   <ul>
                       <li>Stefan Zweig</li>
                       <li>Franz Kafka</li>
                       <li>Dostoyevski</li>
                       <li>Tolstoy</li>
                       <li>Erich Fromm</li>
                       <li>Sheakspeare</li>
                   </ul>
               </div>
           </div>
       </div>
   )
}
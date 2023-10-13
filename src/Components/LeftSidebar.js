import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlay, faNewspaper, faPuzzlePiece, faStore} from "@fortawesome/free-solid-svg-icons";

export function LeftSidebar() {
    return (


        <div className="row-offcanvas row-offcanvas-left">
            <div id="sidebar-left" className="sidebar-offcanvas">
                <div className="d-flex flex-col justify-content-center align-items-center">
                           <div>
                               <img src="/images/profile.jpg" alt="img" className="rounded-circle justify-content-center" />
                               <h3 className="text-center">Debby Williams</h3>
                               <p className="text-center">New York, USA</p>
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
                        <li><a href="#"><FontAwesomeIcon className="me-4" icon={faPuzzlePiece} /> Games</a></li>
                        <li><a href="#"><FontAwesomeIcon className="me-4" icon={faStore} />Marketplace</a></li>
                        <li><a href="#"><FontAwesomeIcon className="me-4" icon={faCirclePlay} />Shorts</a></li>
                        <li><a href="#"><FontAwesomeIcon className="me-4" icon={faNewspaper} />News</a></li>
                    </ul>
                </div>

            </div>
        </div>








        // <div className="flex flex-col h-screen bg-white p-4 border-2 rounded-r-xl shadow-lg  ">
        //     <div className="flex flex-col items-center relative">
        //
        //         <div>
        //             <img src="https://picsum.photos/200/300" alt="img" className="rounded-circle align-items-center" width="7%" height="7%"/>
        //                 <h3 className="name">Debby Williams</h3>
        //                 <span className="country">New York, USA</span><hr/>
        //         </div>
        //
        //     </div>
        //     <div className="flex flex-col items-center pt-6">
        //         <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
        //
        //         </p>
        //         <p className="font-roboto font-medium text-xs text-gray-700 no-underline tracking-normal leading-none">
        //             Access exclusive tools & insights
        //         </p>
        //         <p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none py-2">
        //             Try premium for free
        //         </p>
        //     </div>
        //     <div className="flex  flex-col  pl-2">
        //         <div className="flex items-center pb-4">
        //             <img className="h-10"  alt="location"></img>
        //             <p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none">
        //                 California
        //             </p>
        //         </div>
        //         <div className="flex items-center ">
        //             <img className="h-10"  alt="job"></img>
        //             <p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none">
        //                 React Developer
        //             </p>
        //         </div>
        //         <div className="flex justify-center items-center pt-4">
        //             <p className="font-roboto font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none">
        //                 Events
        //             </p>
        //             <p className="font-roboto font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none mx-2">
        //                 Groups
        //             </p>
        //             <p className="font-roboto font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none">
        //                 Follow
        //             </p>
        //             <p className="font-roboto font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none mx-2">
        //                 More
        //             </p>
        //         </div>
        //     </div>
        //     <div className="ml-2">
        //         <p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none py-2">
        //             Social Profiles
        //         </p>
        //         <div className="flex items-center">
        //             <img className="h-10 mb-3 mr-2"  alt="facebook"></img>
        //             <p className="font-roboto font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r to-red-700 from-blue-500 no-underline tracking-normal leading-none py-2">
        //                 Social Network
        //             </p>
        //         </div>
        //         <div className="flex items-center">
        //             <img className="h-10 mb-3 mr-2"  alt="twitteer"></img>
        //             <p className="font-roboto font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r to-red-700 from-blue-500 no-underline tracking-normal leading-none py-2">
        //                 Social Network
        //             </p>
        //         </div>
        //     </div>
        //     <div className="flex flex-col justify-center items-center pt-4">
        //         <p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none py-2">
        //             Random Ads
        //         </p>
        //         <div
        //
        //             className="bg-blue-600 rounded-xl h-1 mb-4"
        //         ></div>
        //         <img className="h-36 rounded-lg"  alt="ads"></img>
        //     </div>
        // </div>





    );

}
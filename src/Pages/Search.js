import {useParams} from "react-router-dom";
import {NavigationBar} from "../Fragments/NavigationBar";
import {LeftSidebar} from "../Fragments/LeftSidebar";

import {RightSidebar} from "../Fragments/RightSidebar";
import {useContext} from "react";
import {ThemeContext} from "../context/ThemeContext";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {FriendsSuggestions} from "../Components/FriendsSuggestions";
import {UsersContext} from "../context/UsersContext";

export function Search(){
    const searchValue = useParams();
    const [{theme}] = useContext(ThemeContext);
    const currentUser = useContext(CurrentUserContext);
    const users = useContext(UsersContext);

    const filteredUsers = ()=>{
        const filter = users.filter(u =>
            u.firstName.includes(searchValue.value.toUpperCase())
        ||  u.lastName.includes(searchValue.value.toUpperCase()))
        filter.forEach(u=>{
            if(u.id===currentUser.id){
                const index = filter.indexOf(u)
                delete filter[index]
            }
        })
        return filter;
    }

    return(
        <>
            <NavigationBar/>
            <div className="container">
                <div className="row">
                    <div className="d-none d-xl-block col-xl-3">
                        <LeftSidebar/>
                    </div>
                    <div className="main col-sm-12 col-lg-10  col-xl-6 min-vh-100"
                         style={{background: theme.backgroundColor, color: theme.color}}>
                          <FriendsSuggestions users={filteredUsers()}/>
                    </div>
                    <div className="d-none d-lg-block col-lg-1 col-xl-3">
                        <RightSidebar/>
                    </div>
                </div>
            </div>
        </>
    )
}
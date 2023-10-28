import {Home} from "./Home";
import {ACTIVE_USER, POSTS_DATA, USER_DATA} from "../data/data";
import {Login} from "./Login";


export function Pages(){
    return (
        <>
            <Login/>
            {/*<Home activeUser={ACTIVE_USER} users={USER_DATA} posts={POSTS_DATA} />)*/}
        </>
    )
}
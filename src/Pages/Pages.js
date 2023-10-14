import {Home} from "./Home";
import {ACTIVE_USER, POSTS_DATA, USER_DATA} from "../data/data";


export function Pages(){
    return <Home activeUser={ACTIVE_USER} users={USER_DATA} posts={POSTS_DATA} />
}
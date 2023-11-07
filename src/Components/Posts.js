import React, {useContext} from "react";
import {PostsContext} from "../context/PostsContext";
import {PostCard} from "./PostCard";


export function Posts() {

    const posts = useContext(PostsContext);
    return (
        <div>
            {posts.map(p => <PostCard key={p.id} post={p}/>)}
        </div>
    )
}







import {Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart, faShare} from "@fortawesome/free-solid-svg-icons";
import {useContext, useState} from "react";
import {ThemeContext} from "../context/ThemeContext";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {PostsContext} from "../context/PostsContext";
import {UsersContext} from "../context/UsersContext";
import {arrayUnion, updateDoc} from "firebase/firestore";


export function Posts(props) {
    const currentUser = useContext(CurrentUserContext);
    const posts = useContext(PostsContext);


    return (
        <div>
            {posts.map(p => <PostCard key={p.id} post={p}/>)}
        </div>

    )
}

function PostCard(props) {
    const [{theme,isDark},toggleTheme] = useContext(ThemeContext);
    const {post} = props;
    const currentUser = useContext(CurrentUserContext);
    const users = useContext(UsersContext);
    let firstName;
    let lastName;
    let profileImg;
    users?.forEach(u=>{
        if(post.ownerId===u.id){
                firstName = u.firstName
                lastName = u.lastName
                profileImg = u.profileImg
            }


    })

    const [isLiked,setIsLiked] = useState(false);
    const [likeCounter,setLikeCounter] = useState(1)
    const likePost = () =>{

        setLikeCounter(likeCounter+1)

        if(likeCounter%2===0){
            updateDoc(post.ref,{likesAmount:post.likesAmount - 1});
            setIsLiked(false)
        }else{
            updateDoc(post.ref,{likesAmount:post.likesAmount + 1});
            updateDoc(post.ref,{arrayOfLikedPersons:arrayUnion(currentUser.id)})
            setIsLiked(true)
        }

    }


    return (
        <Card className='post-card'  style={{background:theme.backgroundColor,color:theme.color}}>

            <Card.Body>
                <Card.Title>
                    <img className='profile-img-card rounded-circle' src={profileImg ? profileImg : `images/blank-profile.jpg`}  />
                    <span className='h5 text-capitalize'>{firstName} {lastName}</span>
                </Card.Title>
                <Card.Text>
                    {post.text}
                </Card.Text>
                {post.photoUrl ? <Card.Img style={{height:"20rem"}} src={`${post.photoUrl}`}/> : ""}

            </Card.Body>
            <Card.Footer>
                <div className='d-flex justify-content-around '>
                    <p><FontAwesomeIcon style={isLiked ? {color:'red'} : {color:'black'}} icon={faHeart} onClick={likePost}/> Like({post.likesAmount})</p>
                    <p><FontAwesomeIcon icon={faComment}/>Comment</p>
                    <p><FontAwesomeIcon icon={faShare} />Share</p>
                </div>
            </Card.Footer>
        </Card>
    )
}







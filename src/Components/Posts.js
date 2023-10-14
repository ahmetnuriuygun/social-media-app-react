import {Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart, faShare} from "@fortawesome/free-solid-svg-icons";


export function Posts(props) {
    const {posts, users} = props;
    const post_user = postUsers(posts, users)


    return (
        <div>
            {post_user.map(p => <PostCard key={p.postId} post={p}/>)}
        </div>

    )
}

function PostCard(props) {
    const {post} = props;
    return (
        <Card className='post-card'>
            <Card.Body>
                <Card.Title>
                    <img className='profile-img-card rounded-circle' src={`images/${post.profileImg}`}/> <span
                    className='h5'>{post.firstName} {post.lastName}</span>
                </Card.Title>
                <Card.Text>
                    {post.description}
                </Card.Text>
                <Card.Img style={{height: "500px"}} src={`${post.postImg}`}/>
            </Card.Body>
            <Card.Footer>
                <div className='d-flex justify-content-around '>
                    <p><FontAwesomeIcon icon={faHeart}/> Like</p>
                    <p><FontAwesomeIcon icon={faComment}/>Comment</p>
                    <p><FontAwesomeIcon icon={faShare}/>Share</p>
                </div>
            </Card.Footer>
        </Card>
    )
}


export function postUsers(posts, users) {

    let obj = []

    users.forEach(u => {
        posts.forEach(p => {
            if (u.userId === p.userId) {
                const o =
                    {
                        userId: u.userId,
                        postImg: p.postImg,
                        description: p.description,
                        firstName: u.firstName,
                        lastName: u.lastName,
                        profileImg: u.profileImg
                    }
                obj.push(o)

            }
        })
    })
    return obj;

}




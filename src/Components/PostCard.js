import {Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart, faShare} from "@fortawesome/free-solid-svg-icons";


export function PostCard(props) {
    const {posts, users} = props;
    const post_user = postUsers(posts, users)


    return (
        <div>
            {post_user.map(p=><MyCard key={p.id} post={p}/>)}
        </div>
            )
}

function MyCard(props){
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




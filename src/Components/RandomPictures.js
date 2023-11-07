import 'bootstrap/dist/css/bootstrap.min.css';
import {Carousel} from "react-bootstrap";


function StoryCards() {
    return (
        <div className="container">
            <div className="row mt-3">
                <div className="story-cards col-3 d-none d-md-block">
                    <img src="https://picsum.photos/200/350" alt="..."/>
                </div>
                <div className="story-cards col-3 d-none d-md-block">
                    <img src="https://picsum.photos/200/360" alt="..."/>
                </div>
                <div className="story-cards col-3 d-none d-md-block">
                    <img src="https://picsum.photos/200/370" alt="..."/>
                </div>
                <div className="story-cards col-3 d-none d-md-block">
                    <img src="https://picsum.photos/200/380" alt="..."/>
                </div>
            </div>
        </div>

    );
}


export function RandomPictures() {
    return (
        <Carousel>
            <Carousel.Item>
                <StoryCards/>
            </Carousel.Item>
            <Carousel.Item>
                <StoryCards/>
            </Carousel.Item>
            <Carousel.Item>
                <StoryCards/>
            </Carousel.Item>
        </Carousel>

    )
}
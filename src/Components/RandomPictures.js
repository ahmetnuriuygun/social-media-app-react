import 'bootstrap/dist/css/bootstrap.min.css';



export function RandomPictures() {
    return(
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className="cards-wrapper">
                        <div className="card">
                            <img src="https://picsum.photos/200/350" className="card-img-top" alt="..."/>
                        </div>
                        <div className="card d-none d-md-block">
                            <img src="https://picsum.photos/200/360" className="card-img-top"  alt="..."/>
                        </div>
                        <div className="card d-none d-md-block">
                            <img src="https://picsum.photos/200/370" className="card-img-top" alt="..."/>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="cards-wrapper">
                        <div className="card">
                            <img src="https://picsum.photos/200/300" className="card-img-top" alt="..."/>

                        </div>
                        <div className="card d-none d-md-block">
                            <img src="https://picsum.photos/200/300" className="card-img-top" alt="..."/>

                        </div>
                        <div className="card d-none d-md-block">
                            <img src="https://picsum.photos/200/300" className="card-img-top" alt="..."/>

                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="cards-wrapper">
                        <div className="card">
                            <img src="https://picsum.photos/200/300" className="card-img-top " alt="..."/>

                        </div>
                        <div className="card d-none d-md-block">
                            <img src="https://picsum.photos/200/300" className="card-img-top" alt="..."/>

                        </div>
                        <div className="card d-none d-md-block">
                            <img src="https://picsum.photos/200/300" className="card-img-top" alt="..."/>

                        </div>
                    </div>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>

    )
}
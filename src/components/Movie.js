import React, { Component } from 'react';
import{Card} from "react-bootstrap";

 class Movie extends Component {
    render() {
        return (
            <div>

            {   
              (  <Card>
                        <Card.Header as="h5">Movie Info</Card.Header>
                        <Card.Body>
                         
                            <Card.Text>
                                {
                                    this.props.MovieList.map(item => {
                                        return (
                                            <div>
                                                <h2>Title: {item.original_title}</h2>
                                                <h2>Description: {item.overview}</h2>
                                                <h2>Img: {item.poster_path}</h2>
                                                <h2>Vote: {item. vote_average}</h2>
                                                <h2>Date: {item.release_date}</h2>
                                                <h4>*******************</h4>
                                            </div>
                                        )
                                    })
                                }
                            </Card.Text>
                        </Card.Body>
                    </Card>)
    } 
            </div>
        )
    }
}

export default Movie

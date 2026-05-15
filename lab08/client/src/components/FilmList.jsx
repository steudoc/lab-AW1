import dayjs from 'dayjs';

import PropTypes from 'prop-types';
import {Col, Row, ListGroup, ListGroupItem, Button} from 'react-bootstrap/';
import { Link, useLocation } from "react-router";
import API from "../API/API.js"

export default function FilmList(props) {

    return (
        <ListGroup id="films-list" variant="flush">
            {props.films.map((film) => <FilmInList key={film.id} filmData={film} setDirty={props.setDirty}/>)}
        </ListGroup>
    );
}

FilmList.propTypes = {
    films: PropTypes.array.isRequired,
    setDirty: PropTypes.func.isRequired
};

export function FilmInList(props) {
    

    return (<ListGroupItem>
        <Row className="gy-2 align-items-center d-flex">
            <Col xs={6} lg={4} className="favorite-title d-flex gap-2 align-items-center">
                <Favorite filmData={props.filmData} setDirty={props.setDirty}/>
                {props.filmData.title}
            </Col>
            <Col xs={6} lg={4} className="text-md-center text-end">
                {props.filmData.watchDate ? dayjs(props.filmData.watchDate).format('MMMM D, YYYY') : ''}
            </Col>
            <Col xs={12} lg={4} className="actions-container d-flex text-end
            justify-content-end-lg">
                <div className="rating">
                    <Rating rating={props.filmData.rating} maxStars={5}
                        updateRating={(newRating) => {
                            API.rateFilm(props.filmData.id, newRating)
                                .then(() => props.setDirty(true))
                                .catch(err => console.error(err));
                        }}/>
                </div>
                <div className="d-flex actions">
                    <FilmIcons filmData={props.filmData} setDirty={props.setDirty} />
                </div>
            </Col>
        </Row>
    </ListGroupItem>);
}

function Favorite(props) {
    const filmData = props.filmData;

    const toggleFavorite = () => {
        API.favoriteFilm(filmData.id, !filmData.isFavorite)
            .then(() => props.setDirty(true))
            .catch(err => console.error(err));  
    }

    return (
        <Button variant="link" onClick={toggleFavorite}><i className={filmData.isFavorite ? "bi bi-suit-heart-fill": "bi bi-suit-heart"}></i></Button>
    );
}

FilmInList.propTypes = {
    filmData: PropTypes.object.isRequired,
    setDirty: PropTypes.func.isRequired
};

function FilmIcons(props) {
    const location = useLocation();

    return(<>
        <Link className="btn btn-warning" to={"/edit/" + props.filmData.id} state={{nextpage: location.pathname}}><i className="bi bi-pencil-square" /></Link>
        <Button variant="danger" onClick={() => {
            API.deleteFilm(props.filmData.id)
                .then(() => props.setDirty(true))
                .catch(err => console.error(err));
        }}><i className="bi bi-trash" /></Button>
    </>);
}

FilmIcons.propTypes = {
    filmData: PropTypes.object.isRequired,
    setDirty: PropTypes.func.isRequired
};

export function Rating({maxStars, rating, updateRating}) {
    return [...Array(maxStars)].map(
        (el, index) =>
            <i key={index} className={(index < rating) ? "bi bi-star-fill" : "bi bi-star"} onClick={() => updateRating(index+1)} />);
}

Rating.propTypes = {
    maxStars: PropTypes.number.isRequired,
    ratign: PropTypes.number,
    setDirty: PropTypes.func.isRequired
};
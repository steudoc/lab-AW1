import {Col, Row} from 'react-bootstrap/';

import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem, Button} from "react-bootstrap";
import { Link } from "react-router";

function FilmList(props) {
    const visibleFilms = props.visibleFilms;

    return (
        <>
            <ListGroup id="films-list" variant="flush">
                {visibleFilms.map((film) => <FilmInList filmData={film} key={film.id} editFilm={props.editFilm} deleteFilm={props.deleteFilm}/>)}
            </ListGroup>
        </>);
}

FilmList.propTypes = {
    films: PropTypes.array.isRequired,
};

function FilmInList(props) {
    const filmData = props.filmData;

    return (<ListGroupItem>
        <Row className="gy-2 align-items-center d-flex">

            <Col xs={6} lg={4} className="favorite-title d-flex gap-2 align-items-center">
                <Favorite editFilm={props.editFilm} filmData={filmData}/>
                {filmData.title}
            </Col>
            <Col xs={6} lg={4} className="text-md-center text-end">
                {filmData.formatWatchDate()}
            </Col>
            <Col xs={12} lg={4} className="actions-container d-flex text-end
            justify-content-end-lg">
                <div className="rating">
                    <Rating filmData={filmData} editFilm={props.editFilm} maxStars={5} className="align-items-center"/>
                </div>
                <div className="d-flex actions">
                    <Link className="btn btn-warning" to={`/films/${filmData.id}/edit`} ><i className="bi bi-pencil-square" /></Link>
                    <Button variant="danger" onClick={() => props.deleteFilm(filmData.id)}><i className="bi bi-trash" /></Button>
                </div>
            </Col>
        </Row></ListGroupItem>);
}

FilmInList.propTypes = {
    filmData: PropTypes.object.isRequired,
};

function Favorite(props) {
    const filmData = props.filmData;

    const toggleFavorite = () => {
        const newFilm = { ...filmData, favorite: !filmData.favorite };
        props.editFilm(newFilm);
    }

    return (
        <Button variant="link" onClick={toggleFavorite}><i className={filmData.favorite ? "bi bi-suit-heart-fill": "bi bi-suit-heart"}></i></Button>
    );
}

function Rating({maxStars, filmData, editFilm}) {
    const handleRating = (index) => {
        const newFilm = { ...filmData, rating: index + 1 };
        editFilm(newFilm);
    }

    return [...Array(maxStars)].map(
        (el, index) => (
            <i 
                key={index} 
                className={(index < filmData.rating) ? "bi bi-star-fill" : "bi bi-star"}
                onClick={() => handleRating(index)}
                />)
    );
}

Rating.propTypes = {
    maxStars: PropTypes.number.isRequired,
};


export default FilmList;
export {Rating};

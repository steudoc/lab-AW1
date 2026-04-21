import {Col, Row} from 'react-bootstrap/';

import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem, Button} from "react-bootstrap";
import FilmForm from './FilmForm.jsx';

function FilmList(props) {
    const visibleFilms = props.visibleFilms;

    return (
        <>
            <ListGroup id="films-list" variant="flush">
                {visibleFilms.map((film) => <FilmInList filmData={film} key={film.id} handleEdit={props.handleEdit} deleteFilm={props.deleteFilm}/>)}
            </ListGroup>
            {props.mode==="add" && <FilmForm addFilm={(film) => {props.addFilm(film); props.setMode("view")}} cancel={() => props.setMode("view")} />}

            {props.mode==="edit" && <FilmForm key={props.editableFilm.id} film={props.editableFilm} editFilm={(film) => {props.editFilm(film); props.setMode("view");}} cancel={() => props.setMode("view")} />}
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
                <Favorite favorite={filmData.favorite}/>
                {filmData.title}
            </Col>
            <Col xs={6} lg={4} className="text-md-center text-end">
                {filmData.formatWatchDate()}
            </Col>
            <Col xs={12} lg={4} className="actions-container d-flex text-end
            justify-content-end-lg">
                <div className="rating">
                    <Rating rating={filmData.rating} maxStars={5} className="align-items-center"/>
                </div>
                <div className="d-flex actions">
                    <Button variant="warning" className="mx-1 text-white" onClick={()=>{props.handleEdit(filmData)}}><i className="bi bi-pencil-square" /></Button>
                    <Button variant="danger" onClick={() => props.deleteFilm(filmData.id)}><i className="bi bi-trash" /></Button>
                </div>
            </Col>
        </Row></ListGroupItem>);
}

FilmInList.propTypes = {
    filmData: PropTypes.object.isRequired,
};

function Rating({maxStars, rating}) {
    return [...Array(maxStars)].map(
        (el, index) => <i key={index} className={(index < rating) ? "bi bi-star-fill" : "bi bi-star"}/>);
}

function Favorite({favorite}) {
    return (<i className={favorite ? "bi bi-suit-heart-fill": "bi bi-suit-heart"}></i>);
}

Rating.propTypes = {
    maxStars: PropTypes.number.isRequired,
};


export default FilmList;
export {Rating};

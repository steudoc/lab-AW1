import { Link, Outlet, useParams } from "react-router";
import Header from "./Header";
import { Container, Row, Col, Collapse } from "react-bootstrap";
import Filters from './Filters';
import FilmList from "./FilmList";
import { Button } from "react-bootstrap";

function MainContent(props) {
    const params = useParams();

    const visibleFilms = props.films.filter(props.filters[params.filter].filterFunction);

    return (
        <>
        <Container fluid className="flex-grow-1 d-flex flex-column">
            <Row className="flex-grow-1">
                <Collapse id="films-filters" in={props.isSidebarExpanded} className="col-md-3 bg-light d-md-block">
                    <div className="py-4">
                        <h5 className="mb-3">Filters</h5>
                        <Filters items={props.filters} />
                    </div>
                </Collapse>
                <Col md={9} className="pt-3">
                    <h1><span id="filter-title">{props.filters[params.filter].label}</span> films</h1>
                    <FilmList 
                        films={props.films} 
                        visibleFilms={visibleFilms} 
                        editFilm={props.editFilm}
                        deleteFilm={props.deleteFilm}/>
                </Col>
            </Row>

            <Link className="btn btn-primary rounded-circle fixed-right-bottom" to={"/films/new"} ><i className="bi bi-plus"></i></Link>
            
        </Container>
        </>
    );
}

export default MainContent;
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import Film from './models/Film.js'
import FilmLibrary from './models/FilmLibrary.js'
import NavHeader from './components/NavHeader.jsx'
import Aside from './components/Aside.jsx'
import Main from './components/Main.jsx'
import './App.css';

const filmLibrary = new FilmLibrary();

filmLibrary.addFilm(new Film(1, 'Pulp Fiction', true, '2026-03-10', 4, 1));
filmLibrary.addFilm(new Film(2, '21 Grams', false, '2026-03-17', 3, 1));
filmLibrary.addFilm(new Film(3, 'Star Wars', false, null, null, 1));
filmLibrary.addFilm(new Film(4, 'Matrix', false, null, null, 1));
filmLibrary.addFilm(new Film(5, 'Shrek', true, '2026-03-21', 5, 1));

function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showSidebar, setShowSidebar] = useState(false);

  const filteredFilms = () => {
    switch (activeFilter) {
      case 'favorites':
        return filmLibrary.getFavoriteFilms();
      case 'bestRated':
        return filmLibrary.getBestRatedFilms();
      case 'seenLastMonth':
        return filmLibrary.getWatchedLastMonth();
      case 'unseen':
        return filmLibrary.getUnseenFilms();
      default:
        return filmLibrary.getAllFilms();
    }
  }

  return (
    <>
      <Container fluid className="px-0">
        <NavHeader onShowSidebar={() => setShowSidebar(true)} />
        <Row className="p-2 vh-100">
          <Col className="bg-light d-none d-md-block" md={2}>
            <Aside
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              show={showSidebar}
              onHide={() => setShowSidebar(false)}
            />
          </Col>
          <Col xs={12} md={10}>
            <Main films={filteredFilms()} />
          </Col>
        </Row>
      </Container>

      <Button variant="primary" className="btn-add">
        <i className="bi bi-plus-lg text-white"></i>
      </Button>
    </>
  )
}

export default App;

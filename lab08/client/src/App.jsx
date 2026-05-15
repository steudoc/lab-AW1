/*
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I
 * Lab 7 - 2026
 */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import dayjs from 'dayjs';

import { useState } from 'react';
import { Container } from 'react-bootstrap/';
import { Routes, Route } from 'react-router';

import Header from "./components/Header.jsx";
import FilmForm from './components/FilmForm.jsx';
import { FilmLibraryLayout, FilmListLayout, EditLayout, NotFoundLayout } from './components/PageLayout.jsx';
import { useEffect } from 'react';
import API from "./API/API.js"

function App() {
    /**
     * Defining a structure for Filters
     * Each filter is identified by a unique name and is composed by the following fields:
     * - A label to be shown in the GUI
     * - An ID (equal to the unique name), used as key during the table generation
     * - A filter function applied before passing the films to the FilmTable component
     */
    const filters = {
        'filter-all': {label: 'All', url: '', filterFunction: () => true},
        'filter-favorite': {label: 'Favorites', url: '/filters/filter-favorite', filterFunction: film => film.isFavorite},
        'filter-best': {label: 'Best Rated', url: '/filters/filter-best', filterFunction: film => film.rating >= 5},
        'filter-lastmonth': {
            label: 'Seen Last Month',
            url: '/filters/filter-lastmonth',
            filterFunction: film => {
                if (!film?.watchDate) return false;
                const diff = film.watchDate.diff(dayjs(), 'month');
                return diff <= 0 && diff > -1;
            }
        },
        'filter-unseen': {label: 'Unseen', url: '/filters/filter-unseen', filterFunction: film => !film?.watchDate}
    };

    // This state contains the active filter
    const [activeFilter, setActiveFilter] = useState('filter-all');

    // This state controls the expansion of the sidebar (on small breakpoints only)
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

    // This state contains the list of movie. It will be updated when a movie is modified or a new movie is added.
    const [films, setFilms] = useState([]);
    const [dirty, setDirty] = useState(false);

    useEffect(() => {
        const getFilms = async () => {
            const films = await API.getFilms();
            setFilms(films);
            setDirty(false);
        }
        getFilms();
    }, [dirty]);

    return (
      <div className="min-vh-100 d-flex flex-column">
        <Header isSidebarExpanded={isSidebarExpanded} setIsSidebarExpanded={setIsSidebarExpanded}/>
        <Container fluid className="flex-grow-1 d-flex flex-column">
          <Routes>
            <Route path="/" element={<FilmLibraryLayout films={films} isSidebarExpanded={isSidebarExpanded}
                filters={filters} activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>} >
                <Route path="*" element={<NotFoundLayout />} />
                <Route index element={<FilmListLayout films={films} filters={filters} setDirty={setDirty}/>} />
                <Route path="filters/:filterLabel" element={<FilmListLayout films={films} filters={filters} setDirty={setDirty}/>} />
            </Route>
            <Route path="add" element={ <FilmForm setDirty={setDirty} addFilm={true}/> } />
            <Route path="edit/:filmId" element={ <EditLayout setDirty={setDirty}/> } />
          </Routes>
        </Container>
      </div>
    );
}

export default App;
import dayjs from 'dayjs';

import PropTypes from 'prop-types';
import { useState, useActionState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Rating } from './FilmList.jsx'
import { Link, useNavigate, useLocation, useParams } from 'react-router';

import { Film } from '../films.mjs';
import API from "../API/API.js"

const FilmForm = (props) => {
  const navigate = useNavigate();
  const { filmId } = useParams();

  const initialState = {
      title: props.film?.title,
      isFavorite: Boolean(props.film?.isFavorite) ?? false,
      rating: props.film?.rating ?? null,
      watchDate: props.film?.watchDate ?? null,
      userId: props.film?.userId ?? 1,
  }

  const handleSubmit = async (prevState, formData) => {
      // create object from formData
      const film = Object.fromEntries(formData.entries());  

      film.watchDate = film.watchDate!=="" ? dayjs(film.watchDate) : null;

      // example of validation
      if (film.title.trim()==="") {
          film.error = "The title can't be empty, please fix it!";
          return film;
      }

      if (film.watchDate && film.watchDate.isAfter(dayjs())) {
          film.error = "The watch date can't be in the future, please fix it!";
          return film;
      }

      film.rating = film.rating!=="" ? Number(film.rating) : null;
      film.userId = film.userId ? Number(film.userId) : prevState.userId;

      //film.isFavorite = Boolean(film.isFavorite);
      film.isFavorite = film.isFavorite === "true";

      if (props.addFilm) {
          API.addFilm(film)
            .then(() => {props.setDirty(true); }) 
            .catch(err => console.error(err));
      } else {
          film.id = filmId;
          API.updateFilm(film)
            .then(() => {props.setDirty(true); })
            .catch(err => console.error(err)); 
      } 

      navigate("/");
  }

  const [state, formAction] = useActionState(handleSubmit, initialState); 

  return (
    <>
      {state?.error && <Alert variant="secondary">{state.error}</Alert>}
      <Form action={formAction} className="p-5">
          <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" type="text" required={true} minLength={2} defaultValue={state.title}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
              <Form.Label>Is favorite?</Form.Label>
              <Form.Check
                  type="switch"
                  id="isFavorite"
                  name="isFavorite"
                  label="favorite"
                  value="true"
                  defaultChecked={state.isFavorite}
              />
          </Form.Group>
          <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Select name="rating" aria-label="Select rating" defaultValue={state.rating ?? ""}>
                  <option value="">None</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
              </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
              <Form.Label>Watch date</Form.Label>
              <Form.Control name="watchDate" type="date" defaultValue={state.watchDate?.format("YYYY-MM-DD") ?? ""}></Form.Control>
          </Form.Group>

          {props.addFilm && <Button variant="success" type="submit" className="me-2">Add</Button>}
          {props.editFilm && <Button variant="warning" type="submit" className="me-2">Edit</Button>}
          <Link className="btn btn-danger" to={"/"}>Cancel</Link>
      </Form>
    </>
  );
}

FilmForm.propTypes = {
  film: PropTypes.object,
  setDirty: PropTypes.func.isRequired,
  addFilm: PropTypes.bool,
  editFilm: PropTypes.bool
};

export default FilmForm;
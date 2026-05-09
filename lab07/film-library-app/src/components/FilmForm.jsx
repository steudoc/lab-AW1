import dayjs from "dayjs"
import { useActionState } from "react"
import { Alert, Button, Form} from 'react-bootstrap'
import { Rating } from './FilmList.jsx'
import { Link, useNavigate, useParams } from "react-router"

export function EditFilmForm(props) {
    const params = useParams();
    const filmId = params.filmId;

    const film = props.films.filter(film => film.id == filmId)[0];

    return (
        <>
        { film ? 
            <FilmForm film={film} editFilm={props.editFilm} /> :
            <Row>
                <Col as="p" className="lead">Impossible to edit a non-existent film.</Col>
            </Row>
        }
        </>
    );
}

export function FilmForm(props) {
    const navigate = useNavigate();
    const { filmId } = useParams();

    const initialState = {
        title: props.film?.title,
        isFavorite: props.film?.favorite ?? false,
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

        if (film.watchDate > dayjs()) {
            film.error = "The watch date can't be in the future, please fix it!";
            return film;
        }

        film.rating = film.rating!=="" ? Number(film.rating) : null;
        film.userId = film.userId!=="" ? Number(film.userId) : prevState.userId;

        film.isFavorite = Boolean(film.isFavorite);

        if (props.addFilm) 
            props.addFilm(film);
        else
            props.editFilm({id: props.film.id, ... film});   

        navigate("/films/filter/filter-all");
    }

    const [state, formAction] = useActionState(handleSubmit, initialState); 

    return (
        <>
            {state.error && <Alert variant="secondary">{state.error}</Alert>}
            <Form action={formAction} className="p-5">
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title" type="text" required={true} minLength={2} defaultValue={state.title}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Is favorite?</Form.Label>
                    <Form.Check
                        type="switch"
                        id="favorite"
                        name="favorite"
                        label="favorite"
                        value={true}
                        defaultChecked={state.isFavorite === true || state.isFavorite === "true"}
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
                <Form.Group className="mb-3">
                    <Form.Label>User ID</Form.Label>
                    <Form.Control name="userId" type="text" required={true} defaultValue={state.userId}></Form.Control>
                </Form.Group>

                {props.addFilm && <Button variant="success" type="submit" className="me-2">Add</Button>}
                {props.editFilm && <Button variant="warning" type="submit" className="me-2">Edit</Button>}
                <Link className="btn btn-danger" to={"/films/filter/filter-all"}>Cancel</Link>
            </Form>
        </>
    );
}
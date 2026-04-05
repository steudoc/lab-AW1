import './Components.css';
import dayjs from "dayjs";

function Main({ films }) {
  return (
    <main className="p-3">
      <h1>All films</h1>
      {films.map((film, index) => (
        <>
          <FilmRow key={film.id} film={film} />
          {index < films.length - 1 && <hr />}
        </>
      ))}
    </main>
  );
}

function FilmRow({ film }) {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <i key={i} className={`bi ${i < film.rating ? 'bi-star-fill' : 'bi-star'}`}></i>
  ));

  return (
    <div className="film d-flex flex-wrap justify-content-between align-items-center">
      <div className="title-film d-flex align-items-center col-md-2 col-12">
        <a href="#">
          <i className={`bi ${film.favorite ? 'bi-suit-heart-fill' : 'bi-suit-heart'} mx-2`}></i>
        </a>
        <span>{film.title}</span>
      </div>

      <span className='col-md-2 col-6'>{film.watchDate ? dayjs(film.watchDate).format('MMMM D, YYYY') : ''}</span>

      <div className="rating-and-edit d-flex align-items-center">
        <div className="rating me-4">
          {stars}
        </div>
        <div className="edit">
          <a href="#"><i className="bi bi-pencil me-2"></i></a>
          <a href="#"><i className="bi bi-trash me-2"></i></a>
        </div>
      </div>
    </div>
  );
}

export default Main;
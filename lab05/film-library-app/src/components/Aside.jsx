import { Button, Offcanvas } from 'react-bootstrap';

function Aside ({activeFilter, setActiveFilter, show, onHide}) {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'favorites', label: 'Favorites' },
    { key: 'bestRated', label: 'Best Rated' },
    { key: 'seenLastMonth', label: 'Seen Last Month' },
    { key: 'unseen', label: 'Unseen' },
  ];

  const FilterButtons = () => filters.map(f => (
    <Button
      key={f.key}
      variant=""
      className={`col-12 text-start ${activeFilter === f.key ? 'fw-bold bg-primary text-white' : ''}`}
      onClick={() => { setActiveFilter(f.key); onHide(); }}
    >
      {f.label}
    </Button>
  ));
  
  return(
    <>
      {/* Sidebar desktop */}
      <aside className="my-3 p-2 d-none d-md-flex flex-column align-items-start">
        <h5>Filters</h5>
        <FilterButtons />
      </aside>

      {/* Offcanvas solo mobile */}
      <Offcanvas show={show} onHide={onHide} className="d-md-none sidebar-offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FilterButtons />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Aside;
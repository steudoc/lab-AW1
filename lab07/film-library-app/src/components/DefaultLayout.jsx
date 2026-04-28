import { Outlet } from "react-router";
import Header from "./Header";
import { Container } from "react-bootstrap";

function DefaultLayout(props) {

  return(
    <>
    <div className="min-vh-100 d-flex flex-column">
        <Header isSidebarExpanded={props.isSidebarExpanded} setIsSidebarExpanded={props.setIsSidebarExpanded}/>
        <Outlet />
    </div>
    </>
  );
}

export default DefaultLayout;
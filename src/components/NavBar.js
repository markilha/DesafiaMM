import React from "react";
import { Nav, Navbar} from "react-bootstrap";

function NavBar () {
    
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand className="color-nav p-3">Desafio MM</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="/">Início</Nav.Link>
                        <Nav.Link href="/people">Pessoas</Nav.Link>
                        {}
                    </Nav>
                    {}
                </Navbar.Collapse>
            </Navbar>
        </>
    );
    
}
 
export default NavBar;
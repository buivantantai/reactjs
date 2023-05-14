import React, { useState, Component } from "react";
import {
  Card,
  Button,
  Row,
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Caja() {
  const refresh = () => {
    window.location.reload();
  };
  const navigate = useNavigate();
  const [valueSearch, setValueSearch] = useState();
  const search = (name) => {
    navigate(`/search/${name}`);
    refresh();
  };
  return (
    <div className="caja">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">MyListAnime</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Form className="d-flex me-auto form-search">
              <Form.Control
                type="search"
                placeholder="Search Anime"
                className="form-input-search"
                aria-label="Search"
                value={valueSearch || ""}
                onChange={(e) => {
                  setValueSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    search(valueSearch);
                  }
                }}
              />
              <Button
                onClick={() => {
                  search(valueSearch);
                }}
                className="btn-search"
                variant="outline-success"
              >
                Search
              </Button>
            </Form>
            {localStorage.getItem("token") ? (
              <Nav>
                <Nav.Link href="">{localStorage.getItem("name")}</Nav.Link>
                <Nav.Link
                  href="/"
                  onClick={() => {
                    localStorage.removeItem("token", null);
                    localStorage.removeItem("name", null);
                    localStorage.removeItem("id", null);
                  }}
                >
                  Logout
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

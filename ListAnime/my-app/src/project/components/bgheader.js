import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Row,
  Navbar,
  Container,
  Nav,
  Dropdown,
  NavDropdown,
  DropdownButton,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const URL_Seasons = "https://api.jikan.moe/v4/seasons";
const URL_Genres = "https://api.jikan.moe/v4/genres/anime";
export default function Bgheader() {
  const [seasonData, setSeasonData] = useState("");
  const [genresData1, setGenresData1] = useState("");
  const [genresData2, setGenresData2] = useState("");
  const [genresData3, setGenresData3] = useState("");
  const [genresData4, setGenresData4] = useState("");
  const navigate = useNavigate();
  const refresh = () => {
    window.location.reload();
  };
  const searchByYear = (year, season) => {
    navigate(`/year/${year}/season/${season}`);
    refresh();
  };
  const searchByGenres = (id, name) => {
    navigate(`/genres/${id}/${name}`);
    refresh();
  };
  const goToAnimeUpcoming = () => {
    navigate(`/upcoming`);
  };
  const [yearSelect, setYearSelect] = useState();
  const getSeasons = async () => {
    const result = await axios.get(URL_Seasons);
    setSeasonData(result.data);
  };
  const getGenres = async () => {
    const result = await axios.get(URL_Genres);
    setGenresData1(result.data.data.filter((item, index) => item.mal_id < 12));
    setGenresData2(
      result.data.data.filter(
        (item, index) => item.mal_id > 11 && item.mal_id < 24
      )
    );
    setGenresData3(
      result.data.data.filter(
        (item, index) => item.mal_id > 23 && item.mal_id < 37
      )
    );
    setGenresData4(
      result.data.data.filter(
        (item, index) => item.mal_id > 36 && item.mal_id < 50
      )
    );
  };
  useEffect(() => {
    setTimeout(() => {
      getGenres();
      getSeasons();
    }, 3000);
  }, []);
  return (
    <div className="bgheader">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" className="active">
                Home Page
              </Nav.Link>
              <NavDropdown
                title="Seasons"
                id="collasible-nav-dropdown"
                className="drop_down"
              >
                {seasonData &&
                  seasonData.data
                    .filter((item, index) => index < 13)
                    .map((item, index) => {
                      return (
                        <NavDropdown
                          key={index}
                          title={`Anime ${item.year}`}
                          id="dropdown-button-drop-end"
                          drop="end"
                          variant="secondary"
                          className="bg-dark drop-down-child"
                          onClick={() => {
                            setYearSelect(item.year);
                          }}
                        >
                          {seasonData.data[index].seasons.map((item, index) => {
                            return (
                              <Dropdown.Item
                                key={item}
                                className="bg-dark nav-link"
                                style={{ textAlign: "center" }}
                                onClick={() => {
                                  searchByYear(yearSelect, item);
                                }}
                              >
                                {seasonData.data[index].seasons[index]}
                              </Dropdown.Item>
                            );
                          })}
                        </NavDropdown>
                      );
                    })}
              </NavDropdown>
              <NavDropdown title="Genres" id="collasible-nav-dropdown">
                <div className="list-genres bg-dark">
                  <div className="col1">
                    {genresData1 &&
                      genresData1.map((item, index) => {
                        return (
                          <NavDropdown.Item
                            href=""
                            className="bg-dark nav-link"
                            key={index}
                            onClick={() => {
                              searchByGenres(
                                genresData1[index].mal_id,
                                genresData1[index].name
                              );
                            }}
                          >
                            {genresData1[index].name}
                          </NavDropdown.Item>
                        );
                      })}
                  </div>
                  <div className="col1">
                    {genresData2 &&
                      genresData2.map((item, index) => {
                        return (
                          <NavDropdown.Item
                            href=""
                            className="bg-dark nav-link"
                            key={index}
                            onClick={() => {
                              searchByGenres(
                                genresData2[index].mal_id,
                                genresData2[index].name
                              );
                            }}
                          >
                            {genresData2[index].name}
                          </NavDropdown.Item>
                        );
                      })}
                  </div>
                  <div className="col1">
                    {genresData3 &&
                      genresData3.map((item, index) => {
                        return (
                          <NavDropdown.Item
                            href=""
                            className="bg-dark nav-link"
                            key={index}
                            onClick={() => {
                              searchByGenres(
                                genresData3[index].mal_id,
                                genresData3[index].name
                              );
                            }}
                          >
                            {genresData3[index].name}
                          </NavDropdown.Item>
                        );
                      })}
                  </div>
                  <div className="col1">
                    {genresData4 &&
                      genresData4.map((item, index) => {
                        return (
                          <NavDropdown.Item
                            href=""
                            className="bg-dark nav-link"
                            key={index}
                            onClick={() => {
                              searchByGenres(
                                genresData4[index].mal_id,
                                genresData4[index].name
                              );
                            }}
                          >
                            {genresData4[index].name}
                          </NavDropdown.Item>
                        );
                      })}
                  </div>
                </div>
              </NavDropdown>
              <Nav.Link
                href=""
                className="active"
                onClick={() => {
                  goToAnimeUpcoming();
                }}
              >
                Anime Upcoming
              </Nav.Link>
              <Nav.Link
                href=""
                className="active"
                onClick={() => {
                  if (localStorage.getItem("token")) {
                    navigate("/my-list");
                  } else {
                    navigate("/login");
                  }
                }}
              >
                My List Anime
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

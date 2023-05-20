import React, { useState, useEffect } from "react";
import Caja from "./caja";
import Bgheader from "./bgheader";
import Footer from "./footer";
import {
  Card,
  Button,
  Pagination,
  Modal,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import notFound from "../../assets/img/not_found.png";
import { useNavigate, useParams } from "react-router-dom";
import { getListAnime, addListAnime } from "../feature/listAnimeSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function SearchAnimeByGenresChangePage() {
  let thisPage;
  let count;

  const listPage = () => {
    document.querySelector(".pagination").innerHTML = "";
    if (thisPage != 1) {
      let first = document.createElement("li");
      let newPageA = document.createElement("a");
      first.classList.add("page-item");
      newPageA.classList.add("page-link");
      newPageA.innerText = "First";
      first.addEventListener("click", () => {
        returnPage(1);
      });
      document
        .querySelector(".pagination")
        .appendChild(first)
        .appendChild(newPageA);
    }

    if (thisPage == 2 && thisPage != count) {
      let start = 1;
      let end;
      if (count > 3) {
        end = start + 3;
      } else {
        end = count;
      }
      for (let j = start; j <= end; j++) {
        let newPageA = document.createElement("a");
        let newPage = document.createElement("li");
        newPage.classList.add("page-item");
        newPageA.classList.add("page-link");
        newPageA.innerText = j;
        if (j == thisPage) {
          newPage.classList.add("active");
        }
        newPage.addEventListener("click", () => {
          changePage(j);
        });
        document
          .querySelector(".pagination")
          .appendChild(newPage)
          .appendChild(newPageA);
      }
    }

    if (thisPage == 1) {
      let start = 1;
      let end;
      if (count > 3) {
        end = start + 2;
      } else {
        end = count;
      }
      for (let i = start; i <= end; i++) {
        let newPageA = document.createElement("a");
        let newPage = document.createElement("li");
        newPage.classList.add("page-item");
        newPageA.classList.add("page-link");
        newPageA.innerText = i;
        if (i == thisPage) {
          newPage.classList.add("active");
        }
        newPage.addEventListener("click", () => {
          changePage(i);
        });
        document
          .querySelector(".pagination")
          .appendChild(newPage)
          .appendChild(newPageA);
      }
    }
    if (thisPage == count) {
      let start;
      if (count <= 2) {
        start = 1;
      } else {
        start = count - 2;
      }

      for (let k = start; k <= count; k++) {
        let newPageA = document.createElement("a");
        let newPage = document.createElement("li");
        newPage.classList.add("page-item");
        newPageA.classList.add("page-link");
        newPageA.innerText = k;
        if (k == thisPage) {
          newPage.classList.add("active");
        }
        newPage.addEventListener("click", () => {
          changePage(k);
        });
        document
          .querySelector(".pagination")
          .appendChild(newPage)
          .appendChild(newPageA);
      }
    }
    if (thisPage == count - 1 && count > 3) {
      for (let h = count - 3; h <= count; h++) {
        let newPageA = document.createElement("a");
        let newPage = document.createElement("li");
        newPage.classList.add("page-item");
        newPageA.classList.add("page-link");
        newPageA.innerText = h;
        if (h == thisPage) {
          newPage.classList.add("active");
        }
        newPage.addEventListener("click", () => {
          changePage(h);
        });
        document
          .querySelector(".pagination")
          .appendChild(newPage)
          .appendChild(newPageA);
      }
    }
    if (thisPage > 2 && thisPage <= count - 2) {
      let start = thisPage - 2;
      let end = start + 4;
      for (let l = start; l <= end; l++) {
        let newPageA = document.createElement("a");
        let newPage = document.createElement("li");
        newPage.classList.add("page-item");
        newPageA.classList.add("page-link");
        newPageA.innerText = l;
        if (l == thisPage) {
          newPage.classList.add("active");
        }
        newPage.addEventListener("click", () => {
          changePage(l);
        });
        document
          .querySelector(".pagination")
          .appendChild(newPage)
          .appendChild(newPageA);
      }
    }

    if (thisPage != count) {
      let last = document.createElement("li");
      let newPageA = document.createElement("a");
      last.classList.add("page-item");
      newPageA.classList.add("page-link");
      newPageA.innerText = "Last";
      last.addEventListener("click", () => {
        changePage(count);
      });
      document
        .querySelector(".pagination")
        .appendChild(last)
        .appendChild(newPageA);
    }
  };

  const changePage = (i) => {
    navigate(`/genres/${genrenId}/${genresName}/page/${i}`);
    refresh();
  };
  const returnPage = () => {
    navigate(`/genres/${genrenId}/${genresName}`);
    refresh();
  };
  const [genrenId, setGenrenId] = useState("");
  const [genresName, setGenresName] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const [animeLocal, setAnimeLocal] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const animeList = useSelector((state) => state.listAnime);
  const dispatch = useDispatch();
  const [ep, setEp] = useState(0);
  const [anime, setAnime] = useState();
  const addToList = (animeData) => {
    dispatch(addListAnime(animeData));
    setEp(0);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getListAnime());
    }
  }, []);
  const refresh = () => {
    window.location.reload();
  };
  const gotoDetail = (id, name) => {
    navigate(`/anime-detail/${id}/${name}`);
  };
  const getListAnimeByGenres = async (id) => {
    const result = await axios.get(
      `https://api.jikan.moe/v4/anime?genres=${id}&page=${params.genresPage}`
    );
    setAnimeLocal(result.data);
  };
  useEffect(() => {
    getListAnimeByGenres(params.genresId);
    setGenrenId(params.genresId);
    setGenresName(params.genresName);
  }, []);
  useEffect(() => {
    if (animeLocal && animeLocal.data.length != 0) {
      count = animeLocal.pagination.last_visible_page;
      thisPage = params.genresPage;
      listPage();
    }
  }, [animeLocal]);
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      The episode you setted is incorrect!
    </Tooltip>
  );
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Anime to My List
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form name="add_anime" method="post" id="main-form">
            <table border={0} cellPadding={5} cellSpacing={0} width={"100%"}>
              <tbody>
                <tr>
                  <td className="borderClass2" width={180} valign="top">
                    Anime Title
                  </td>
                  <td className="borderClass2">
                    <strong>{anime.title}</strong>
                  </td>
                </tr>
                <tr>
                  <td className="borderClass2" valign="top">
                    Status
                  </td>
                  <td className="borderClass2">
                    <Form.Select
                      aria-label="Default select example"
                      id="add_anime_status"
                      name="add_anime[status]"
                      className="inputtext"
                    >
                      <option value="Watching">Watching</option>
                      <option value="Completed">Completed</option>
                      <option value="Dropped">Dropped</option>
                    </Form.Select>
                  </td>
                </tr>
                <tr>
                  <td className="borderClass2" valign="top">
                    Episodes Watched
                  </td>
                  <td className="borderClass2">
                    <input
                      type="number"
                      id="add_anime_num_watched_episodes"
                      name="add_anime[num_watched_episodes]"
                      className="inputtext"
                      size={3}
                      value={ep || ""}
                      onChange={(e) => {
                        setEp(e.target.value);
                      }}
                      min={0}
                      max={anime.episodes ? anime.episodes : 0}
                    ></input>{" "}
                    /{" "}
                    <span id="totalEpisodes">
                      {anime.episodes ? anime.episodes : 0}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {ep <= anime.episodes && ep >= 0 ? (
            <Button
              onClick={() => {
                let e = add_anime_status.value;
                anime.episodes_watched = parseInt(ep);
                anime.status_watched = e;
                addToList(anime);
                setModalShow(false);
              }}
            >
              Add to List
            </Button>
          ) : (
            <OverlayTrigger
              placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <Button>Add to List</Button>
            </OverlayTrigger>
          )}
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div style={{ backgroundColor: "#0f0f0f" }}>
      <div className="Header">
        <Caja></Caja>
        <Bgheader></Bgheader>
      </div>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "40px",
        }}
      >
        <div
          className="box"
          style={{ textAlign: "start", marginBottom: "222px" }}
        >
          <div className="box-item">
            <div>
              <h1>
                <span>Your Search: Anime {params.genresName}</span>
              </h1>
              <div className="clear"></div>
            </div>
            {animeLocal && animeLocal.data.length == 0 ? (
              <div className="not_found">
                Not Found Your Anime
                <br />
                <img src={notFound}></img>
              </div>
            ) : null}
            <div className="tab-content-list">
              {animeLocal && animeLocal.data.length != 0
                ? Object.keys(animeLocal["data"]).map((item, index) => {
                    return (
                      <Card
                        key={item}
                        style={{
                          width: "175px",
                          margin: "10px 15px 10px 15px",
                        }}
                      >
                        <Card.Img
                          className="card_img"
                          variant="top"
                          src={animeLocal["data"][item].images.jpg.image_url}
                          style={{ height: "280px" }}
                          onClick={() => {
                            gotoDetail(
                              animeLocal["data"][item].mal_id,
                              animeLocal["data"][item].title
                            );
                          }}
                        />
                        <Card.Body>
                          <Card.Title
                            className="title_card"
                            onClick={() => {
                              gotoDetail(
                                animeLocal["data"][item].mal_id,
                                animeLocal["data"][item].title
                              );
                            }}
                          >
                            {animeLocal["data"][item].titles[0].title}
                          </Card.Title>
                        </Card.Body>
                        {animeList.doneGet &&
                        animeList.data &&
                        Object.keys(animeList.data).filter(
                          (index) =>
                            animeList.data[index].mal_id ==
                            animeLocal["data"][item].mal_id
                        ).length == 1 ? (
                          <Button className="btn-add" size="sm">
                            Added to Your List
                          </Button>
                        ) : (
                          <Button
                            className="btn-add"
                            size="sm"
                            onClick={() => {
                              if (localStorage.getItem("token")) {
                                setModalShow(true);
                                setAnime(animeLocal["data"][item]);
                              } else {
                                navigate("/login");
                              }
                            }}
                          >
                            Add to List
                          </Button>
                        )}
                        {animeLocal["data"][item].status ===
                        "Currently Airing" ? (
                          <span className="imbd">
                            {animeLocal["data"][item].episodes}
                            /??
                          </span>
                        ) : (
                          <span className="imbd">
                            {animeLocal["data"][item].episodes}/
                            {animeLocal["data"][item].episodes}
                          </span>
                        )}
                      </Card>
                    );
                  })
                : null}
            </div>
            <Pagination></Pagination>
          </div>
          <div className="clear"></div>
        </div>
      </div>
      {anime ? (
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      ) : null}
      <Footer></Footer>
    </div>
  );
}

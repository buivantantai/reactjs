import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Row,
  Modal,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getListAnime, addListAnime } from "../feature/listAnimeSlice";
import { useDispatch, useSelector } from "react-redux";
import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/lib/styles.css";
import "react-owl-carousel2/src/owl.theme.default.css";
import "react-owl-carousel2/src/owl.carousel.css";
import PropTypes from "prop-types";

export default function Silde() {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired;
  const navigate = useNavigate();
  const [animeLocal, setAnimeLocal] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const animeList = useSelector((state) => state.listAnime);
  const dispatch = useDispatch();
  const [ep, setEp] = useState(0);
  const [anime, setAnime] = useState();
  const addToList = (animeData) => {
    dispatch(addListAnime(animeData));
    setEp(0);
  };
  const getListAnimeHot = async () => {
    const result = await axios.get(
      `https://api.jikan.moe/v4/top/anime?limit=9`
    );
    setAnimeLocal(result.data);
  };

  useEffect(() => {
    getListAnimeHot();
  }, []);
  const gotoDetail = (id, name) => {
    navigate(`/anime-detail/${id}/${name}`);
  };
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

  const options = {
    rewind: true,
    autoplay: true,
    dots: false,
    loop: true,
    autoplayTimeout: 4000,
    autoplaySpeed: 1500,
    margin: 10,
    responsive: {
      0: {
        items: 2,
      },
      480: {
        items: 3,
      },
      750: {
        items: 3,
      },
      800: {
        items: 4,
      },
      950: {
        items: 5,
      },
      1000: {
        items: 6,
      },
      1200: {
        items: 7,
      },
    },
  };
  return (
    <div>
      <Row className="row_top">
        <OwlCarousel options={options}>
          {animeLocal &&
            Object.keys(animeLocal["data"]).map((item, index) => {
              return (
                <Card key={item} style={{ width: "130px" }}>
                  <Card.Img
                    className="card_img"
                    variant="top"
                    src={animeLocal["data"][item].images.jpg.image_url}
                    style={{ height: "166px", cursor: "pointer" }}
                    onClick={() => {
                      gotoDetail(
                        animeLocal["data"][item].mal_id,
                        animeLocal["data"][item].title
                      );
                    }}
                  />
                  <Card.Body>
                    <Card.Title
                      style={{ cursor: "pointer" }}
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
                  {animeLocal["data"][item].status === "Currently Airing" ? (
                    <span
                      className="imbd"
                      style={{
                        bottom: "52px",
                        top: "143px",
                        left: "0",
                      }}
                    >
                      {animeLocal["data"][item].episodes}/??
                    </span>
                  ) : (
                    <span
                      className="imbd"
                      style={{
                        bottom: "52px",
                        top: "143px",
                        left: "0",
                        background: "#0e7712",
                      }}
                    >
                      {animeLocal["data"][item].episodes}/
                      {animeLocal["data"][item].episodes}
                    </span>
                  )}
                </Card>
              );
            })}
        </OwlCarousel>
      </Row>

      {anime ? (
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      ) : null}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Caja from "./caja";
import Bgheader from "./bgheader";
import Footer from "./footer";
import {
  Button,
  Badge,
  Tab,
  Tabs,
  Modal,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { getListAnime, addListAnime } from "../feature/listAnimeSlice";
import { useDispatch, useSelector } from "react-redux";
import AnimeSynopsis from "./animeSynopsis";
import AnimeCharacters from "./animeCharacters";
import AnimeTrailer from "./animeTrailer";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Comments from "./Comment/comments";

export default function AnimeDetail() {
  const params = useParams();
  const [animeLocal, setAnimeLocal] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);
  const animeList = useSelector((state) => state.listAnime);

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

  const getAnimeById = async (id) => {
    const result = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
    setAnimeLocal(result.data);
  };
  useEffect(() => {
    getAnimeById(params.id);
  }, []);
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
      {animeLocal ? (
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "40px",
          }}
        >
          <div className="single">
            <div className="s-left">
              <div
                className="box"
                style={{ textAlign: "start", marginBottom: "0px" }}
              >
                <div className="box-item">
                  <div className="sbox">
                    <div className="imagen">
                      <div className="fix-img">
                        <img src={animeLocal.data.images.jpg.image_url}></img>
                      </div>
                    </div>
                    <div className="data">
                      <h1 style={{ margin: "0px" }}>{animeLocal.data.title}</h1>
                      <p className="meta" style={{ color: "white" }}>
                        {animeLocal.data.title}
                      </p>
                      <p className="meta_dd">
                        <Badge
                          bg="secondary"
                          style={{
                            marginRight: "5px",
                          }}
                        >
                          Genres
                        </Badge>
                        {animeLocal.data.genres.map((item, index) => {
                          return (
                            <a key={index} style={{ color: "white" }}>
                              {item.name}{" "}
                            </a>
                          );
                        })}
                      </p>
                      <p className="meta_dd">
                        <Badge
                          bg="secondary"
                          style={{
                            marginRight: "5px",
                          }}
                        >
                          Type
                        </Badge>
                        <a>{animeLocal.data.type}</a>
                      </p>
                      <p className="meta_dd">
                        <Badge
                          bg="secondary"
                          style={{
                            marginRight: "5px",
                          }}
                        >
                          Premiered
                        </Badge>
                        <a>{animeLocal.data.year}, </a>
                        <a>
                          {animeLocal.data.season} {animeLocal.data.year}
                        </a>
                      </p>
                      <p className="meta_dd">
                        <Badge
                          bg="secondary"
                          style={{
                            marginRight: "5px",
                          }}
                        >
                          Episodes
                        </Badge>
                        <a>
                          {animeLocal.data.episodes
                            ? animeLocal.data.episodes
                            : "Unknown"}
                        </a>
                      </p>
                      <p className="meta_dd">
                        <Badge
                          bg="secondary"
                          style={{
                            marginRight: "5px",
                          }}
                        >
                          Duration
                        </Badge>
                        <a>
                          {animeLocal.data.duration
                            ? animeLocal.data.duration
                            : "Unknown"}
                        </a>
                      </p>
                      <p className="meta_dd">
                        <Badge
                          bg="secondary"
                          style={{
                            marginRight: "5px",
                          }}
                        >
                          Status
                        </Badge>
                        <a>
                          {animeLocal.data.status
                            ? animeLocal.data.status
                            : "Unknown"}
                        </a>
                      </p>
                      <p className="meta_dd">
                        <Badge
                          bg="secondary"
                          style={{
                            marginRight: "5px",
                          }}
                        >
                          Rating
                        </Badge>
                        <a>
                          {animeLocal.data.rating
                            ? animeLocal.data.rating
                            : "Unknown"}
                        </a>
                      </p>
                      <div className="meta_btn">
                        {animeList.data &&
                        animeList.doneGet &&
                        Object.keys(animeList.data).filter(
                          (index) =>
                            animeList.data[index].mal_id ==
                            animeLocal.data.mal_id
                        ).length == 1 ? (
                          <Button className="btn-add" size="lg">
                            Added to Your List
                          </Button>
                        ) : (
                          <Button
                            className="btn-add"
                            size="lg"
                            style={{ fontSize: "20px !important" }}
                            onClick={() => {
                              if (localStorage.getItem("token")) {
                                setModalShow(true);
                                setAnime(animeLocal.data);
                              } else {
                                navigate("/login");
                              }
                            }}
                          >
                            Add to List
                          </Button>
                        )}
                        <div className="clear"></div>
                      </div>
                      <div className="clear"></div>
                    </div>
                    <div className="clear"></div>
                  </div>
                </div>
              </div>
              <div className="box">
                <Tabs
                  defaultActiveKey="Synopsis"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="Synopsis" title="Synopsis">
                    <AnimeSynopsis animeLocal={animeLocal} />
                  </Tab>
                  <Tab eventKey="Characters" title="Characters">
                    <AnimeCharacters animeLocal={animeLocal} />
                  </Tab>
                  <Tab eventKey="Trailer" title="Trailer">
                    <AnimeTrailer animeLocal={animeLocal} />
                  </Tab>
                  <Tab eventKey="Comment" title="Comment">
                    {localStorage.getItem("token") ? (
                      <Comments />
                    ) : (
                      <div>
                        <p style={{ color: "white" }}>
                          Please{" "}
                          <a href="/login" style={{ textDecoration: "none" }}>
                            Login
                          </a>{" "}
                          to comment
                        </p>
                      </div>
                    )}
                  </Tab>
                </Tabs>
              </div>
              <div className="clear"></div>
            </div>
            <div className="s-right">
              <div
                className="box"
                style={{ textAlign: "start", marginBottom: "222px" }}
              >
                <div className="box-item">
                  <div className="stats-block">
                    <div className="score">
                      <div className="score-labe">SCORE</div>
                      <div>
                        {animeLocal.data.score
                          ? animeLocal.data.score
                          : "Unknown"}
                      </div>
                      <div className="score-user">
                        {animeLocal.data.scored_by} users
                      </div>
                    </div>
                    <div className="stats-statis">
                      <span>
                        Ranked:{" "}
                        <strong>
                          #
                          {animeLocal.data.rank
                            ? animeLocal.data.rank
                            : "Unrank"}
                        </strong>
                      </span>
                      <span>
                        Popularity:{" "}
                        <strong>#{animeLocal.data.popularity}</strong>
                      </span>
                      <span>
                        Members: <strong>{animeLocal.data.members}</strong>
                      </span>
                      <span>
                        Favorities: <strong>{animeLocal.data.members}</strong>
                      </span>
                    </div>
                    <div className="clear"></div>
                  </div>
                  <div className="clear"></div>
                </div>
              </div>
              <div className="clear"></div>
            </div>
            <div className="clear"></div>
          </div>

          <div className="clear"></div>
        </div>
      ) : null}

      {anime ? (
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      ) : null}
      <Footer></Footer>
      <div className="clear"></div>
    </div>
  );
}

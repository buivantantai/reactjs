import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Button,
  Row,
  Modal,
  Form,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getListAnime, addListAnime } from "../feature/listAnimeSlice";
import { useNavigate } from "react-router-dom";
const URL_GET_ANIME_IN_WINTER_NOW = "https://api.jikan.moe/v4/seasons/2023/";

export default function Tab_content({ seasons }) {
  const [animeSeasonNow, setAnimeSeasonNow] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();
  const [ep, setEp] = useState(0);
  const [anime, setAnime] = useState();
  const animeList = useSelector((state) => state.listAnime);
  const [animeListLocal, setAnimeListLocal] = useState();
  const navigate = useNavigate();
  const refresh = () => {
    window.location.reload();
  };
  const gotoDetail = (id, name) => {
    navigate(`/anime-detail/${id}/${name}`);
    refresh();
  };
  const getAnimeSeasonNow = async () => {
    const result = await axios.get(`${URL_GET_ANIME_IN_WINTER_NOW}${seasons}`);
    setAnimeSeasonNow(result.data);
  };
  const addToList = (animeData) => {
    dispatch(addListAnime(animeData));
    setEp(0);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAnimeListLocal(animeList);
    }
  }, [animeList]);

  useEffect(() => {
    getAnimeSeasonNow();
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
    <div className="tab-content-list">
      {animeSeasonNow &&
        Object.keys(animeSeasonNow["data"])
          .filter((item, index) => index < 40)
          .map((item, index) => {
            return (
              <Card
                key={item}
                style={{ width: "180px", margin: "10px 15px 10px 15px" }}
              >
                <Card.Img
                  className="card_img"
                  variant="top"
                  src={animeSeasonNow["data"][item].images.jpg.image_url}
                  style={{ height: "auto" }}
                  onClick={() => {
                    gotoDetail(
                      animeSeasonNow["data"][item].mal_id,
                      animeSeasonNow["data"][item].title
                    );
                  }}
                />
                <Card.Body>
                  <Card.Title
                    className="title_card"
                    onClick={() => {
                      gotoDetail(
                        animeSeasonNow["data"][item].mal_id,
                        animeSeasonNow["data"][item].title
                      );
                    }}
                  >
                    {animeSeasonNow["data"][item].titles[0].title}
                  </Card.Title>
                  {animeList.doneGet &&
                  animeList.data &&
                  // animeListLocal.mal_id == animeSeasonNow["data"][item].mal_id
                  Object.keys(animeList.data).filter(
                    (index) =>
                      animeList.data[index].mal_id ==
                      animeSeasonNow["data"][item].mal_id
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
                          setAnime(animeSeasonNow["data"][item]);
                        } else {
                          navigate("/login");
                        }
                      }}
                    >
                      Add to List
                    </Button>
                  )}
                </Card.Body>
                {animeSeasonNow["data"][item].status === "Currently Airing" ? (
                  <span className="imbd">
                    {animeSeasonNow["data"][item].episodes
                      ? animeSeasonNow["data"][item].episodes
                      : "??"}
                    /??
                  </span>
                ) : (
                  <span className="imbd" style={{ background: "#0e7712" }}>
                    {animeSeasonNow["data"][item].episodes
                      ? animeSeasonNow["data"][item].episodes
                      : "??"}
                    /
                    {animeSeasonNow["data"][item].episodes
                      ? animeSeasonNow["data"][item].episodes
                      : "??"}
                  </span>
                )}
              </Card>
            );
          })}
      {anime ? (
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      ) : null}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Pagination,
  Modal,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { editListAnime, deleteListAnime } from "../feature/listAnimeSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getListAnime,
  filterListWatching,
  filterListCompleted,
  filterListDroped,
} from "../feature/listAnimeSlice";

export default function MyListDropped() {
  const animeList = useSelector((state) => state.listAnime);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();
  const [ep, setEp] = useState(0);
  const [idAnime, setIdAnime] = useState();
  const [anime, setAnime] = useState();
  const editToList = (animeData) => {
    dispatch(editListAnime(animeData));
  };
  const deleteFromList = (id) => {
    dispatch(deleteListAnime(id));
  };
  const gotoDetail = (id, name) => {
    navigate(`/anime-detail/${id}/${name}`);
  };
  const refresh = () => {
    window.location.reload();
  };
  useEffect(() => {
    dispatch(filterListDroped());
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
                      value={anime.status_watched}
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
                if (parseInt(ep) == anime.episodes) {
                  e = "Completed";
                }
                const dataEdit = {
                  id: idAnime,
                  data: {
                    episodes_watched: parseInt(ep),
                    status_watched: e,
                  },
                };
                editToList(dataEdit);
                setModalShow(false);
              }}
            >
              Update
            </Button>
          ) : (
            <OverlayTrigger
              placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <Button>Update</Button>
            </OverlayTrigger>
          )}
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className="list-block">
      <div className="list-unit">
        <div className="list-status-title">
          <span className="text">DROPPED</span>
        </div>
        <table className="list-table">
          <tbody>
            <tr className="list-table-header">
              <th className="header-title number" style={{ color: "#CCCCCC" }}>
                #
              </th>
              <th className="header-title image">
                <a className="link hover_info">Image</a>
              </th>
              <th className="header-title title">
                <a className="link sort">Anime Title</a>
              </th>
              <th className="header-title status">
                <a className="link sort">Status</a>
              </th>
              <th className="header-title type">
                <a className="link sort">Type</a>
              </th>
              <th className="header-title progresss">
                <a className="link sort">Progress</a>
              </th>
              <th className="header-title remove" style={{ color: "#CCCCCC" }}>
                <a className="link sort">Remove</a>
              </th>
            </tr>
          </tbody>
          {animeList.dataFilterDropped &&
            animeList.doneGet &&
            animeList.dataFilterDropped.map((item, index) => {
              return (
                <tbody className="list-item" key={item}>
                  <tr className="list-table-data" style={{ color: "#CCCCCC" }}>
                    <td className="data number">{index + 1}</td>
                    <td className="data image">
                      <a className="link sort">
                        <img
                          className="image"
                          src={animeList.data[item].images.jpg.image_url}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            gotoDetail(
                              animeList.data[item].mal_id,
                              animeList.data[item].title
                            );
                          }}
                        ></img>
                      </a>
                    </td>
                    <td className="data title">
                      <a
                        className="link sort"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          gotoDetail(
                            animeList.data[item].mal_id,
                            animeList.data[item].title
                          );
                        }}
                      >
                        {animeList.data[item].title}
                      </a>
                      <div className="edit-data">
                        <span className="edit">
                          <a
                            className="List_LightBox"
                            onClick={() => {
                              setModalShow(true);
                              setAnime(animeList.data[item]);
                              setIdAnime(item);
                              setEp(animeList.data[item].episodes_watched);
                            }}
                          >
                            Edit
                          </a>
                        </span>
                      </div>
                    </td>
                    <td className="data status">
                      <a>{animeList.data[item].status_watched}</a>
                    </td>
                    <td className="data type">TV</td>
                    <td className="data progresss">
                      <span>
                        <a style={{ color: "#0080FF" }}>
                          {animeList.data[item].episodes_watched}{" "}
                        </a>
                      </span>
                      <span>
                        {" "}
                        /{" "}
                        {animeList.data[item].episodes
                          ? animeList.data[item].episodes
                          : "-"}{" "}
                      </span>
                    </td>
                    <td className="data remove">
                      <a
                        className="remove"
                        style={{ textDecoration: "none", cursor: "pointer" }}
                        onClick={() => {
                          setId(item);
                          setShow(true);
                        }}
                      >
                        x
                      </a>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this anime from your list?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteFromList(id);
              setShow(false);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      {anime ? (
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      ) : null}
    </div>
  );
}

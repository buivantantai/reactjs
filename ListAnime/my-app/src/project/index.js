import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListAnime } from "./feature/listAnimeSlice";
import Slide from "./components/silde";
import Caja from "./components/caja";
import Bgheader from "./components/bgheader";
import Container_tabs from "./components/container_tabs";
import Upcoming from "./components/upcoming";
import Footer from "./components/footer";
export default function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const animeList = useSelector((state) => state.animeList);
  const [animeListLocal, setAnimeListLocal] = useState();
  const upcomingView = () => {
    navigate(`/upcoming`);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getListAnime());
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAnimeListLocal(animeList);
    }
  }, [animeList]);

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
        <div className="slide_top">
          <div className="head_slide">
            <a>Top Anime Series</a>
          </div>
          <Slide></Slide>
          <div className="clear"></div>
        </div>
        <div className="anicontainer box">
          <Container_tabs></Container_tabs>
          <div>
            <h2>
              <span className="title-list-index">Anime Upcoming</span>
              <a
                className="viewmore"
                onClick={() => {
                  upcomingView();
                }}
              >{`View More >>`}</a>
              <div className="line-top-title"></div>
            </h2>
            <div className="clear"></div>
          </div>

          <div>
            <Upcoming></Upcoming>
          </div>

          <div className="clear"></div>
        </div>
        <div className="clear"></div>
      </div>
      <Footer></Footer>
      <div className="clear"></div>
    </div>
  );
}

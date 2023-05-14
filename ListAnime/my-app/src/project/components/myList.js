import React, { useEffect, useState } from "react";
import logo from "../../assets/img/logo-list.png";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MyListAll from "./myListAll";
import MyListWatching from "./myListWatching";
import MyListCompleted from "./myListCompleted";
import MyListDropped from "./myListDropped";
import { getListAnime } from "../feature/listAnimeSlice";
import notFound from "../../assets/img/not_found.png";

export default function MyList() {
  const dispatch = useDispatch();
  const animeList = useSelector((state) => state.listAnime);
  useEffect(() => {
    dispatch(getListAnime());
  }, []);
  return (
    <div>
      <div className="header">
        <a href="\" className="header-title">
          MyAnimeList
        </a>
        <div className="header-menu">
          <div className="btn-menu">
            Viewing <span className="username">Your</span> Anime List
          </div>
        </div>
      </div>

      <div className="list-container">
        <div className="cover-block">
          <div className="cover-image-container">
            <img className="lazyloaded" src={logo}></img>
          </div>
        </div>
        {animeList.doneGet && animeList.data ? (
          <Tabs
            defaultActiveKey="All"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="All" title="All Anime">
              <MyListAll animeList={animeList}></MyListAll>
            </Tab>
            <Tab eventKey="Watching" title="Currently Watching">
              <MyListWatching></MyListWatching>
            </Tab>
            <Tab eventKey="Completed" title="Completed">
              <MyListCompleted></MyListCompleted>
            </Tab>
            <Tab eventKey="Dropped" title="Dropped">
              <MyListDropped></MyListDropped>
            </Tab>
          </Tabs>
        ) : (
          <div className="not_found">
            Nothing Here
            <br />
            <img src={notFound}></img>
          </div>
        )}
      </div>
      <footer>
        <div className="footer-block">
          <div className="copyright">
            MyAnimeList.net is a property of MyAnimeList Co.,Ltd. ©2023 All
            Rights Reserved.
          </div>
          <div className="recaptcha-terms">
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </div>
        </div>
      </footer>
    </div>
  );
}

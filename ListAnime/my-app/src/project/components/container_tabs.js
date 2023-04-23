import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Tab,
  Tabs,
} from "react-bootstrap";
import Tab_content from "./tab_content";

export default function Container_tabs() {
  const spring_season = "spring";
  const winter_season = "winter";
  const summer_season = "summer";
  const fall_season = "fall";
  const now = new Date();
  const navigate = useNavigate();
  const refresh = () => {
    window.location.reload();
  };
  const searchByYear = (year, season) => {
    navigate(`/year/${year}/season/${season}`);
    refresh();
  };

  useEffect(() => {}, []);
  return (
    <div>
      <Tabs
        defaultActiveKey="Winter"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab
          eventKey="Winter"
          title={`Winter ${now.getFullYear()}`}
          className="tab-item"
        >
          <div>
            <h2>
              <span className="title-list-index">
                Anime Winter {now.getFullYear()}
              </span>
              <a
                className="viewmore"
                onClick={() => {
                  searchByYear(now.getFullYear(), winter_season);
                }}
              >{`View More >>`}</a>
              <div className="line-top-title"></div>
            </h2>
            <div className="clear"></div>
          </div>

          <Tab_content seasons={winter_season}></Tab_content>
        </Tab>
        <Tab
          eventKey="Spring"
          title={`Spring ${now.getFullYear()}`}
          className="tab-item"
        >
          <div>
            <h2>
              <span className="title-list-index">
                Anime Spring {now.getFullYear()}
              </span>
              <a
                className="viewmore"
                onClick={() => {
                  searchByYear(now.getFullYear(), spring_season);
                }}
              >{`View More >>`}</a>
              <div className="line-top-title"></div>
            </h2>
            <div className="clear"></div>
          </div>
          <Tab_content seasons={spring_season}></Tab_content>
        </Tab>
        <Tab
          eventKey="Summer"
          title={`Summer ${now.getFullYear()}`}
          className="tab-item"
        >
          <div>
            <h2>
              <span className="title-list-index">
                Anime Summer {now.getFullYear()}
              </span>
              <a
                className="viewmore"
                onClick={() => {
                  searchByYear(now.getFullYear(), summer_season);
                }}
              >{`View More >>`}</a>
              <div className="line-top-title"></div>
            </h2>
            <div className="clear"></div>
          </div>
          <Tab_content seasons={summer_season}></Tab_content>
        </Tab>
        <Tab
          eventKey="Fall"
          title={`Fall ${now.getFullYear()}`}
          className="tab-item"
        >
          <div>
            <h2>
              <span className="title-list-index">
                Anime Fall {now.getFullYear()}
              </span>
              <a
                className="viewmore"
                onClick={() => {
                  searchByYear(now.getFullYear(), fall_season);
                }}
              >{`View More >>`}</a>
              <div className="line-top-title"></div>
            </h2>
            <div className="clear"></div>
          </div>
          <Tab_content seasons={fall_season}></Tab_content>
        </Tab>
      </Tabs>
    </div>
  );
}

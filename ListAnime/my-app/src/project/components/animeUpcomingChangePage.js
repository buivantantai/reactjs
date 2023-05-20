import React, { useState, useEffect } from "react";
import Caja from "./caja";
import Bgheader from "./bgheader";
import Footer from "./footer";
import { Card, Button, Pagination } from "react-bootstrap";

import notFound from "../../assets/img/not_found.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
export default function AnimeUpcomingChangePage() {
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

    if (thisPage == 2) {
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
      for (let k = count - 2; k <= count; k++) {
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
    navigate(`/upcoming/page/${i}`);
    refresh();
  };
  const returnPage = () => {
    navigate(`/upcoming`);
    refresh();
  };
  const params = useParams();
  const navigate = useNavigate();
  const [animeLocal, setAnimeLocal] = useState();
  const refresh = () => {
    window.location.reload();
  };
  const getListAnimeUpconming = async () => {
    const result = await axios.get(
      `https://api.jikan.moe/v4/seasons/upcoming/?page=${params.page}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    setAnimeLocal(result.data);
  };
  useEffect(() => {
    getListAnimeUpconming();
  }, []);
  useEffect(() => {
    if (animeLocal && animeLocal.data.length != 0) {
      count = animeLocal.pagination.last_visible_page;
      thisPage = 1;
      if (count != 1) {
        listPage();
      }
    }
  }, [animeLocal]);

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
                <span>
                  Your Search: Anime {params.season} {params.year}
                </span>
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
                          style={{ height: "255px" }}
                        />
                        <Card.Body>
                          <Card.Title className="title_card">
                            {animeLocal["data"][item].titles[0].title}
                          </Card.Title>
                        </Card.Body>
                        <Button className="btn-add" size="sm">
                          Add to List
                        </Button>
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
      <Footer></Footer>
    </div>
  );
}

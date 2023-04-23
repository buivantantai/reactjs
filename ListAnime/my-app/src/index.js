import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./project/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./project/components/login";
import Register from "./project/components/register";
import SearchAnimeByName from "./project/components/searchAnimeByName";
import SearchAnimeBySeason from "./project/components/searchAnimeSeason";
import SearchAnimeBySeasonChangePage from "./project/components/searchAnimeBySeasonChangePage";
import SearchAnimeByGenres from "./project/components/searchNameByGenres";
import SearchAnimeByGenresChangePage from "./project/components/searchAnimeByGenresChangePage";
import SearchAnimeByNameChangePage from "./project/components/searchAnimeByNameChangePage";
import AnimeUpcoming from "./project/components/animeUpcoming";
import AnimeUpcomingChangePage from "./project/components/animeUpcomingChangePage";
import AnimeDetail from "./project/components/animeDetail";
import MyList from "./project/components/myList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/search/:name",
    element: <SearchAnimeByName />,
  },
  {
    path: "/search/:name/page/:page",
    element: <SearchAnimeByNameChangePage />,
  },
  {
    path: "/year/:year/season/:season",
    element: <SearchAnimeBySeason />,
  },
  {
    path: "/year/:year/season/:season/page/:page",
    element: <SearchAnimeBySeasonChangePage />,
  },
  {
    path: "/genres/:genresId/:genresName",
    element: <SearchAnimeByGenres />,
  },
  {
    path: "/genres/:genresId/:genresName/page/:genresPage",
    element: <SearchAnimeByGenresChangePage />,
  },
  {
    path: "/upcoming",
    element: <AnimeUpcoming />,
  },
  // {
  //   path: "/upcoming/page/:page",
  //   element: <AnimeUpcomingChangePage />,
  // },
  {
    path: "/anime-detail/:id/:name",
    element: <AnimeDetail />,
  },
  {
    path: "/my-list",
    element: <MyList />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

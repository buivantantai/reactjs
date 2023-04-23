export const routerData = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/login",
    name: "Login",
  },
  {
    path: "/register",
    name: "Register",
  },
  {
    path: "/search/:name",
    name: "SearchByName",
  },
  {
    path: "/year/:year/season/:season",
    name: "SearchBySeason",
  },
  {
    path: "/genres/:genresName/:genresName",
    name: "SearchByGenres",
  },
  {
    path: "/genres/:genresId/:genresName/page/:genresPage",
    name: "SearchByGenresChangePage",
  },
];

export const API_KEY = "AIzaSyDKFxDEuBJZFlJxd5IHo5gpcR-fwSOYZVA";

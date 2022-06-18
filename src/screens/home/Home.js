import React, { useState, useEffect, Fragment } from "react";
import Header from "../../common/header/Header";
import Heading from "../../common/heading/Heading";
import axios from "axios";

function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8085/api/v1/movies")
      .then((response) => setMovies(response.data.movies));

    axios
      .get("http://localhost:8085/api/v1/genres")
      .then((response) => setGenres(response.data.genres));

    axios
      .get("http://localhost:8085/api/v1/artists")
      .then((response) => setArtists(response.data.artists));
  }, []);

  return (
    <Fragment>
      <Header bookShow={false} />
      <Heading />
    </Fragment>
  );
}

export default Home;

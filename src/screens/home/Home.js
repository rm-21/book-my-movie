import React, { useState, useEffect, Fragment } from "react";
import Header from "../../common/header/Header";
import Heading from "../../common/heading/Heading";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import ReleasedMovies from "./ReleasedMovies";
import FilterCard from "./FilterCard";
import "./Home.css";
const useStyles = makeStyles({
  grid: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
});

const Home = () => {
  const classes = useStyles();

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
      {/* Header */}
      <Header bookShow={false} />

      {/* Heading upcoming movies */}
      <Heading />

      {/* Scrollable Images */}
      <div className="scrollable-images">
        <ImageList className={classes.grid} cols={6} rowHeight={250}>
          {movies.map((tile) => (
            <ImageListItem key={tile.id}>
              <img src={tile.poster_url} alt={tile.title} />
              <ImageListItemBar
                title={tile.title}
                actionIcon={<IconButton aria-label={`star ${tile.title}`} />}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>

      {/* Released movies */}
      <div className="second">
        {/* Movies images and links */}
        <div className="released">
          <ReleasedMovies movies={movies} />
        </div>

        {/* Filter tab */}
        <div className="filter">
          <div className="card-component">
            <FilterCard genres={genres} artists={artists} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;

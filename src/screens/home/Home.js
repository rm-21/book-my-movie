import React, { useState, useEffect, Fragment } from "react";
import Header from "../../common/header/Header";
import Heading from "../../common/heading/Heading";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import ReleasedMovies from "./ReleasedMovies";
import FilterCard from "./FilterCard";
import "./Home.css";

const Home = () => {
  // Styles
  const useStyles = makeStyles((theme) => ({
    grid: {
      flexWrap: "nowrap",
      transform: "translateZ(0)",
    },
    root: {
      float: "right",
      margin: theme.spacing(1, "auto"),
      minWidth: 240,
      maxWidth: 240,
    },
    title: {
      color: theme.palette.primary.light,
    },
    withMargin: {
      marginBottom: theme.spacing(1, "auto"),
      marginTop: theme.spacing(1, "auto"),
    },
    button: {
      width: "100%",
    },
  }));
  const classes = useStyles();

  // States
  const [allMovies, setAllMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [filter, setFilter] = useState(null);
  const [values, setValues] = useState({
    movieName: "",
    genre: [],
    artist: [],
    from: "",
    to: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        // Get movie data
        let response = await fetch(
          "http://localhost:8085/api/v1/movies?page=1&limit=100000"
        );
        let result = await response.json();
        setAllMovies(result.movies);

        // Get genres data
        response = await fetch("http://localhost:8085/api/v1/genres");
        result = await response.json();
        setGenres(result.genres.map((element) => element.description));

        // Get Artists data
        response = await fetch("http://localhost:8085/api/v1/artists");
        result = await response.json();
        setArtists(
          result.artists.map(
            (element) => element.first_name + " " + element.last_name
          )
        );
      } catch (_) {}
    };

    getData();
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
          {allMovies.map((tile) => (
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
          <ReleasedMovies movies={allMovies} />
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

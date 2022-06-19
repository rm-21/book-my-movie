import React, { useState, useEffect, Fragment } from "react";
import Header from "../../common/header/Header";
import Heading from "../../common/heading/Heading";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
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

  // Get Data
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

  // All the Released Movies
  const releasedMoviesAll =
    allMovies.filter((movie) => movie.status.toLowerCase() === "released") ||
    [];

  // Artist filter
  const artistFilter = (artists, movie) => {
    const fullName = (first, last) => {
      return (first + " " + last).toLowerCase();
    };

    let found = false;
    artists.forEach((artist) => {
      if (
        movie.artists.find(
          ((element) => fullName(element).includes(fullName(artist))) !==
            undefined
        )
      ) {
        found = true;
      }
    });
    return found;
  };

  // Genre filter
  const genreFilter = (genres, movie) => {
    let found = false;
    genres.forEach((genre) => {
      if (
        movie.genre.find((element) =>
          element.toLowerCase().includes(genre.toLowerCase())
        ) !== undefined
      ) {
        found = true;
      }
    });
    return found;
  };

  // Date Filter
  const dateFilter = (dateCheck, dateFrom, dateTo) => {
    let date = new Date(dateCheck);

    if (
      dateFrom !== undefined &&
      dateFrom !== null &&
      dateFrom.toLowerCase().trim() !== ""
    ) {
      let from = new Date(dateFrom);
      if (date < from) return false;
    }

    if (
      dateTo !== undefined &&
      dateTo !== null &&
      dateTo.toLowerCase().trim() !== ""
    ) {
      let to = new Date(dateTo);
      if (date > to) return false;
    }

    return true;
  };

  const releasedMovies =
    filter === null
      ? releasedMoviesAll
      : releasedMoviesAll.filter(
          (movie) =>
            (filter.movieName === null ||
              filter.movieName.trim() === "" ||
              movie.title.toLowerCase().includes(filter.movieName)) &&
            (filter.artist === null ||
              filter.artist.length === 0 ||
              artistFilter(filter.artist, movie)) &&
            (filter.genre === null ||
              filter.genre.length === 0 ||
              genreFilter(filter.genre, movie)) &&
            dateFilter(movie.release_date, filter.from, filter.to)
        );

  const onFilterCallback = () => {
    setFilter(values);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Fragment>
      {/* Header */}
      <Header bookShow={false} />

      {/* Heading upcoming movies */}
      <Heading />

      {/* Scrollable Images */}
      <div className="scrollable-images">
        <ImageList className={classes.grid} cols={6} rowHeight={350}>
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
          <ReleasedMovies movies={releasedMovies} />
        </div>

        {/* Filter tab */}
        <div className="filter">
          <div className="card-component">
            <FilterCard
              genres={genres}
              artists={artists}
              classes={classes}
              handleChange={handleChange}
              values={values}
              onFilterCallback={onFilterCallback}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;

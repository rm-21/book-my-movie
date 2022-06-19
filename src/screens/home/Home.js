import React, { Fragment, useState, useEffect } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import { withStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  upcomingMoviesGrid: {
    flexWrap: "nowrap",
    width: "100%",
    transform: "translateZ(0)",
  },
  releasedMoviesGrid: {
    transform: "translateZ(0)",
    cursor: "pointer",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
    maxWidth: 240,
  },
  title: {
    color: theme.palette.primary.light,
  },
});

const Home = (props) => {
  const [UpcomingMovies, setUpcomingMovies] = useState([]);
  const [ReleasedMovies, setReleasedMovies] = useState([]);
  const [MovieName, setMovieName] = useState("");
  const [GenreList, setGenreList] = useState([]);
  const [ArtistList, setArtistList] = useState([]);
  const [SelectedGenres, setSelectedGenres] = useState([]);
  const [SelectedArtists, setSelectedArtists] = useState([]);
  const [StartReleasedDate, setStartReleasedDate] = useState("");
  const [EndReleasedDate, setEndReleasedDate] = useState("");
  const { classes } = props;

  useEffect(() => {
    //Fetch upcoming movies
    fetch(props.baseUrl + "movies?status=PUBLISHED", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => setUpcomingMovies(response.movies));

    //Fetch released movies
    fetch(props.baseUrl + "movies?status=RELEASED", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => setReleasedMovies(response.movies));

    //Fetch genres
    fetch(props.baseUrl + "genres", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => setGenreList(response.genres));

    //Fetch artists
    fetch(props.baseUrl + "artists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => setArtistList(response.artists));
  }, []);

  const applyFilterHandler = () => {
    let initialQueryString = "?status=RELEASED";

    if (MovieName !== "") {
      initialQueryString += "&title=" + MovieName;
    }
    if (SelectedGenres.length > 0) {
      initialQueryString += "&genres=" + SelectedGenres.toString();
    }
    if (SelectedArtists.length > 0) {
      initialQueryString += "&artists=" + SelectedArtists.toString();
    }
    if (StartReleasedDate !== "") {
      initialQueryString += "&start_date=" + StartReleasedDate;
    }
    if (EndReleasedDate !== "") {
      initialQueryString += "&end_date=" + EndReleasedDate;
    }

    fetch(props.baseUrl + "movies" + encodeURI(initialQueryString), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setReleasedMovies(response.movies);
      });
  };

  return (
    <Fragment>
      <Header baseUrl={props.baseUrl} />
      <div className="upcoming-movies-heading">
        <span>Upcoming Movies</span>
      </div>
      <ImageList
        className={classes.upcomingMoviesGrid}
        rowHeight={250}
        cols={6}
      >
        {UpcomingMovies.map((movie) => (
          <ImageListItem key={"um" + movie.id}>
            <img
              src={movie.poster_url}
              className="movie-poster"
              alt={movie.title}
            />
            <ImageListItemBar title={movie.title} />
          </ImageListItem>
        ))}
      </ImageList>
      <div className="flex-container">
        <div className="left-half-homepage">
          <ImageList
            className={classes.releasedMoviesGrid}
            rowHeight={350}
            cols={4}
          >
            {ReleasedMovies.map((movie) => (
              <ImageListItem
                onClick={() => props.history.push("/movie/" + movie.id)}
                className="released-movie-grid-item"
                key={"grid" + movie.id}
              >
                <img
                  src={movie.poster_url}
                  className="movie-poster"
                  alt={movie.title}
                />
                <ImageListItemBar
                  title={movie.title}
                  subtitle={
                    <span>
                      Release Date:{" "}
                      {new Date(movie.release_date).toDateString()}
                    </span>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
        <div className="right-half-homepage">
          <Card>
            <CardContent>
              <FormControl className={classes.formControl}>
                <Typography className={classes.title} color="textSecondary">
                  FIND MOVIES BY:
                </Typography>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                <Input
                  id="movieName"
                  onChange={(e) => setMovieName(e.target.value)}
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-checkbox">
                  Genres
                </InputLabel>
                <Select
                  multiple
                  input={<Input id="select-multiple-checkbox-genre" />}
                  renderValue={(selected) => selected.join(",")}
                  value={SelectedGenres}
                  onChange={(e) => setSelectedGenres(e.target.value)}
                >
                  {GenreList.map((genre) => (
                    <MenuItem key={genre.id} value={genre.genre}>
                      <Checkbox
                        checked={SelectedGenres.indexOf(genre.genre) > -1}
                      />
                      <ListItemText primary={genre.genre} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-checkbox">
                  Artists
                </InputLabel>
                <Select
                  multiple
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={(selected) => selected.join(",")}
                  value={SelectedArtists}
                  onChange={(e) => setSelectedArtists(e.target.value)}
                >
                  {ArtistList.map((artist) => (
                    <MenuItem
                      key={artist.id}
                      value={artist.first_name + " " + artist.last_name}
                    >
                      <Checkbox
                        checked={
                          SelectedArtists.indexOf(
                            artist.first_name + " " + artist.last_name
                          ) > -1
                        }
                      />
                      <ListItemText
                        primary={artist.first_name + " " + artist.last_name}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextField
                  id="releaseDateStart"
                  label="Release Date Start"
                  type="date"
                  defaultValue=""
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setStartReleasedDate(e.target.value)}
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextField
                  id="releaseDateEnd"
                  label="Release Date End"
                  type="date"
                  defaultValue=""
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setEndReleasedDate(e.target.value)}
                />
              </FormControl>
              <br />
              <br />
              <FormControl className={classes.formControl}>
                <Button
                  onClick={() => applyFilterHandler()}
                  variant="contained"
                  color="primary"
                >
                  APPLY
                </Button>
              </FormControl>
            </CardContent>
          </Card>
        </div>
      </div>
    </Fragment>
  );
};

export default withStyles(styles)(Home);

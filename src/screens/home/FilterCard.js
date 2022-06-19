import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Checkbox,
  Button,
  ListItemText,
  Typography,
} from "@material-ui/core";

export default function FilterCard({
  genres,
  artists,
  releasedMoviesAll,
  setReleasedMovies,
  classes,
}) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 11.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // Filter states
  const [filter, setFilter] = useState(null);
  const [values, setValues] = useState({
    movieName: "",
    genre: [],
    artist: [],
    from: "",
    to: "",
  });

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

  //   setReleasedMovies(releasedMovies);

  return (
    <Card className={classes.root}>
      <CardContent>
        {/* Heading */}
        <Typography gutterBottom component="h3" className={classes.title}>
          FIND MOVIES BY:
        </Typography>

        {/* Movie Name Field */}
        <FormControl fullWidth className={classes.withMargin}>
          <InputLabel htmlFor="movieName">Movie Name</InputLabel>
          <Input
            id="movieName"
            value={values.movieName}
            onChange={() => handleChange("movieName")}
          />
        </FormControl>

        {/* Genres Field */}
        <FormControl fullWidth className={classes.withMargin}>
          <InputLabel htmlFor="genres-label">Genres</InputLabel>
          <Select
            labelId="genres-label"
            id="genres"
            multiple
            value={values.genre}
            onChange={() => handleChange("genre")}
            input={<Input />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {genres.map((element, index) => (
              <MenuItem value={element} key={index}>
                <Checkbox checked={values.genre.indexOf(element) > -1} />
                <ListItemText primary={element} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Artists */}
        <FormControl fullWidth className={classes.withMargin}>
          <InputLabel id="artist-label">Artists</InputLabel>
          <Select
            labelId="artist-label"
            id="artist"
            multiple
            value={values.artist}
            onChange={() => handleChange("artist")}
            input={<Input />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {artists.map((element, index) => (
              <MenuItem value={element} key={index}>
                <Checkbox checked={values.artist.indexOf(element) > -1} />
                <ListItemText primary={element} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Release START */}
        <FormControl fullWidth className={classes.withMargin}>
          <TextField
            id="startDate"
            label="Release Date Start"
            type="date"
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
            onChange={() => handleChange("from")}
          />
        </FormControl>

        {/* Release END */}
        <FormControl fullWidth className={classes.withMargin}>
          <TextField
            id="endDate"
            label="Release Date End"
            type="date"
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
            onChange={() => handleChange("to")}
            format="DD-MM-YYYY"
          />
        </FormControl>

        {/* Apply button */}
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => onFilterCallback()}
        >
          APPLY
        </Button>
      </CardContent>
    </Card>
  );
}

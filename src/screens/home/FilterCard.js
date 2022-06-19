import React, { useState } from "react";
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
  createTheme,
  ListItemText,
  Typography,
} from "@material-ui/core";

const theme = createTheme();

export default function FilterCard(props) {
  const [movieName, setMovieName] = useState("");
  const handleMovieName = (event) => {
    setMovieName(event.target.value);
  };

  const [findArtists, setFindArtists] = useState([]);
  const handleFindArtists = (event) => {
    const {
      target: { value },
    } = event;
    setFindArtists(typeof value === "string" ? value.split(",") : value);
  };

  const [findGenres, setFindGenres] = useState([]);
  const handleFindGenres = (event) => {
    const {
      target: { value },
    } = event;
    setFindGenres(typeof value === "string" ? value.split(",") : value);
  };

  const [releaseStart, setReleaseStart] = useState("null");
  const onStartDateChange = (event) => {
    setReleaseStart(event.target.value);
  };

  const [releaseEnd, setReleaseEnd] = useState("null");
  const onEndDateChange = (event) => {
    setReleaseEnd(event.target.value);
  };

  return (
    <Card>
      <CardContent>
        {/* Heading */}
        <InputLabel style={{ color: theme.palette.primary.light }}>
          FIND MOVIES BY:
        </InputLabel>

        {/* Movie Name Field */}
        <FormControl
          variant="standard"
          style={{ width: "100%", margin: theme.spacing(1, "auto") }}
        >
          <InputLabel htmlFor="component-simple">Movie Name</InputLabel>
          <Input
            id="component-simple"
            value={movieName}
            onChange={handleMovieName}
          />
        </FormControl>

        {/* Genres Field */}
        <FormControl
          variant="standard"
          style={{ width: "100%", margin: theme.spacing(1, "auto") }}
        >
          <InputLabel htmlFor="component-simple">Genres</InputLabel>
          <Select
            labelId="demo-mutiple-name-label"
            id="demo-mutiple-name"
            multiple
            value={findGenres}
            onChange={handleFindGenres}
            input={<Input label="Genres" />}
          >
            {props.genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.genre}>
                <Checkbox color="primary" />
                {genre.genre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Artists */}
        <FormControl
          style={{ width: "100%", margin: theme.spacing(1, "auto") }}
        >
          <InputLabel id="demo-mutiple-name-label">Artists</InputLabel>
          <Select
            labelId="demo-mutiple-name-label"
            id="demo-mutiple-name"
            multiple
            value={findArtists}
            onChange={handleFindArtists}
            input={<Input />}
          >
            {props.artists.map((artist) => (
              <MenuItem
                key={artist.id}
                value={artist.first_name + " " + artist.last_name}
              >
                <Checkbox color="primary" />
                {artist.first_name + " " + artist.last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Release START */}
        <FormControl
          style={{ width: "100%", margin: theme.spacing(1, "auto") }}
        >
          <TextField
            name="Release Date Start"
            id="standard-basic"
            type="date"
            label="Release Date Start"
            value={releaseStart}
            onChange={onStartDateChange}
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>

        {/* Release END */}
        <FormControl
          style={{ width: "100%", margin: theme.spacing(1, "auto") }}
        >
          <TextField
            name="Release Date End"
            id="standard-basic"
            type="date"
            label="Release Date End"
            value={releaseEnd}
            onChange={onEndDateChange}
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>

        {/* Apply button */}
        <FormControl
          style={{ width: "100%", margin: theme.spacing(1, "auto") }}
        >
          <Button variant="contained" name="Apply" color="primary">
            Apply
          </Button>
        </FormControl>
      </CardContent>
    </Card>
  );
}

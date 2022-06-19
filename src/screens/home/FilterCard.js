import React from "react";
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

export default function FilterCard(props) {
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

  return (
    <Card className={props.classes.root}>
      <CardContent>
        {/* Heading */}
        <Typography gutterBottom component="h3" className={props.classes.title}>
          FIND MOVIES BY:
        </Typography>

        {/* Movie Name Field */}
        <FormControl fullWidth className={props.classes.withMargin}>
          <InputLabel htmlFor="movieName">Movie Name</InputLabel>
          <Input
            id="movieName"
            value={props.values.movieName}
            onChange={() => props.handleChange("movieName")}
          />
        </FormControl>

        {/* Genres Field */}
        <FormControl fullWidth className={props.classes.withMargin}>
          <InputLabel htmlFor="genres-label">Genres</InputLabel>
          <Select
            labelId="genres-label"
            id="genres"
            multiple
            value={props.values.genre}
            onChange={() => props.handleChange("genre")}
            input={<Input />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {props.genres.map((element, index) => (
              <MenuItem value={element} key={index}>
                <Checkbox checked={props.values.genre.indexOf(element) > -1} />
                <ListItemText primary={element} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Artists */}
        <FormControl fullWidth className={props.classes.withMargin}>
          <InputLabel id="artist-label">Artists</InputLabel>
          <Select
            labelId="artist-label"
            id="artist"
            multiple
            value={props.values.artist}
            onChange={() => props.handleChange("artist")}
            input={<Input />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {props.artists.map((element, index) => (
              <MenuItem value={element} key={index}>
                <Checkbox checked={props.values.artist.indexOf(element) > -1} />
                <ListItemText primary={element} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Release START */}
        <FormControl fullWidth className={props.classes.withMargin}>
          <TextField
            id="startDate"
            label="Release Date Start"
            type="date"
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
            onChange={() => props.handleChange("from")}
          />
        </FormControl>

        {/* Release END */}
        <FormControl fullWidth className={props.classes.withMargin}>
          <TextField
            id="endDate"
            label="Release Date End"
            type="date"
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
            onChange={() => props.handleChange("to")}
            format="DD-MM-YYYY"
          />
        </FormControl>

        {/* Apply button */}
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => props.onFilterCallback()}
        >
          APPLY
        </Button>
      </CardContent>
    </Card>
  );
}

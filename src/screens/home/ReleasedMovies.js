import React from "react";
import { Link } from "react-router-dom";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import moment from "moment";

export default function ReleasedMovies(props) {
  return (
    <ImageList rowHeight={350} cols={4}>
      {props.movies.map((movie) => {
        return (
          <ImageListItem key={movie.id}>
            <Link to={"/movie/" + movie.id}>
              <img
                src={movie.poster_url}
                alt={movie.title}
                style={{
                  width: "100%",
                  alignItems: "center",
                  margin: "0px",
                  cursor: "pointer",
                }}
              />
            </Link>

            <ImageListItemBar
              title={movie.title}
              subtitle={`Release Date:${moment(movie.expectedDate).format(
                "ddd MMM DD YYYY"
              )}`}
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}

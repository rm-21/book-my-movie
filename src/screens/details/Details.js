import React, { useState, useEffect } from "react";
import Header from "../../common/header/Header";
import Typography from "@material-ui/core/Typography";
import "./Details.css";
import YouTube from "react-youtube";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Link } from "react-router-dom";

const Details = (props) => {
  const [Movie, setMovie] = useState({});
  const [StarIcons, setStarIcons] = useState([
    {
      id: 1,
      color: "black",
    },
    {
      id: 2,
      color: "black",
    },
    {
      id: 3,
      color: "black",
    },
    {
      id: 4,
      color: "black",
    },
    {
      id: 5,
      color: "black",
    },
  ]);

  const ytVideoOptions = {
    height: "300",
    width: "700",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    //Fetch single movie
    fetch(props.baseUrl + "movies/" + props.match.params.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => setMovie(response));
  }, []);

  const starClickHandler = (starId) => {
    let starsList = [];
    for (let i of StarIcons) {
      let temp = i;
      if (i.id <= starId) {
        temp.color = "yellow";
      } else {
        temp.color = "black";
      }
      starsList.push(temp);
    }

    setStarIcons(starsList);
  };

  return (
    <div className="details-page">
      <Header
        id={props.match.params.id}
        baseUrl={props.baseUrl}
        showBookShowButton={true}
      />
      <div className="back-button">
        <Typography>
          <Link style={{ textDecoration: "none" }} to="/">
            &#60; Back to Home
          </Link>
        </Typography>
      </div>
      {Movie !== {} && (
        <div className="details-container-flex-view">
          <div className="details-container-flex-view-left">
            <img src={Movie.poster_url} alt={Movie.title} />
          </div>
          <div className="details-container-flex-view-middle">
            <div>
              <Typography variant="h2">{Movie.title}</Typography>
            </div>
            <br />
            <div>
              <Typography>
                <span className="bold-text">Genres: </span>{" "}
                {Movie.genres && Movie.genres.join(", ")}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className="bold-text">Duration:</span> {Movie.duration}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className="bold-text">Release Date:</span>{" "}
                {new Date(Movie.release_date).toDateString()}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className="bold-text"> Rating:</span>{" "}
                {Movie.critics_rating}{" "}
              </Typography>
            </div>
            <div className="margin-top-16">
              <Typography>
                <span className="bold-text">Plot:</span>{" "}
                <a href={Movie.wiki_url}>Wiki Link</a> {Movie.storyline}{" "}
              </Typography>
            </div>
            <div className="margin-top-16">
              <Typography>
                <span className="bold-text">Trailer:</span>
              </Typography>
              <YouTube
                videoId={Movie.trailer_url && Movie.trailer_url.split("?v=")[1]}
                opts={ytVideoOptions}
              />
            </div>
          </div>
          <div className="details-container-flex-view-right">
            <Typography>
              <span className="bold">Rate this movie: </span>
            </Typography>
            {StarIcons.map((star) => (
              <StarBorderIcon
                style={{ color: star.color }}
                key={"star" + star.id}
                onClick={() => starClickHandler(star.id)}
              />
            ))}

            <div className="bold margin-bottom-16 margin-top-16">
              <Typography>
                <span className="bold">Artists:</span>
              </Typography>
            </div>
            <div>
              <ImageList rowHeight={160} cols={2}>
                {Movie.artists &&
                  Movie.artists.map((artist) => (
                    <ImageListItem key={artist.id}>
                      <img
                        src={artist.profile_url}
                        alt={artist.first_name + " " + artist.last_name}
                      />
                      <ImageListItemBar
                        title={artist.first_name + " " + artist.last_name}
                      />
                    </ImageListItem>
                  ))}
              </ImageList>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;

import React, { Component } from "react"
import PropTypes from "prop-types";

//https://www.youtube.com/watch?v=d0akqRlyjo8
//https://youtu.be/d0akqRlyjo8

const YoutubePlayer = ({videoID}) => (
<div className="container">
    <div className="video-responsive">
        <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${videoID}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        />
    </div>
  </div>
);

YoutubePlayer.propTypes = {
    videoID: PropTypes.string.isRequired
  }
 
 export default YoutubePlayer;

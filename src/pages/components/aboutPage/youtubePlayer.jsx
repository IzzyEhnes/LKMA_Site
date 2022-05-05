import React, { Component } from "react"
import YouTube from "react-youtube"

//https://www.youtube.com/watch?v=d0akqRlyjo8
//https://youtu.be/d0akqRlyjo8

class YoutubePlayer extends Component{
    videoOnReady (event) {
        event.target.pauseVideo()
        console.log(event.target)
    }

    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoPlay: 1
            }
        };

        const {videoID} = this.props
        return (
            <YouTube
                videoID={videoID}
                opts={opts}
                onReady={this.videoOnReady}
            />
        );
    }
}

export default YoutubePlayer


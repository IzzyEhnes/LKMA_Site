import React from "react"
import YouTube from "react-youtube"

//https://www.youtube.com/watch?v=d0akqRlyjo8
//https://youtu.be/d0akqRlyjo8

class youtubePlayer extends React.Component{
    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developtes.google.com/youtube/player_parameters
                autoPlay: 1
            }
        };
        //const {videoID} = this.props
        return (
            <YouTube
                videoID= 'd0akqRlyjo8'
                opts={opts}
                onReady={this.onReady}
            />
        );
    }

    _onReady(event) {
    event.target.pauseVideo();
    }
}



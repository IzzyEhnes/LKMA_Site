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
            height: '600',
            width: '1130',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoPlay: 1
            }
        };

        const {videoID} = this.props
        return (
            <div className="Container">
            <p>
                <YouTube
                 videoID={videoID}
                 opts={opts}
                   onReady={this.videoOnReady}
                 />
            </p>
            </div>
        );
    }
}

export default YoutubePlayer


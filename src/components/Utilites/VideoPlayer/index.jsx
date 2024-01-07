"use client"

import { XCircle } from "@phosphor-icons/react"
import YouTube from "react-youtube"

const VideoPlayer = ({youtubeID, h, w}) => {
    const option = {
        width: w,
        height: h
    }
    
    return (
        <div className="">
            <YouTube
                videoId={youtubeID}
                onReady={(event) => event.target.pauseVideo()}
                opts={option}
            />
        </div>
    )
}

export default VideoPlayer
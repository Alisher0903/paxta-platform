import React from "react";
import YouTube from "react-youtube";

interface VideoPlayerProps {
    videoId: string;
    className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({videoId, className}) => {
    const extractVideoId = (id: string) => {
        const youtubeUrlPattern =
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = id.match(youtubeUrlPattern);
        return match ? match[1] : id;
    };

    const finalVideoId = extractVideoId(videoId);

    const opts = {
        height: '470',
        width: '100%',
        playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            fs: 0,
            iv_load_policy: 3,
            disablekb: 1
        },
    };

    return (
        <div className={`${className}`}>
            <YouTube videoId={finalVideoId} opts={opts}/>
        </div>
    );
};

export default VideoPlayer;

import React from 'react';

type VideoPlayerProps = {
  videoId: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  const videoSrc = `https://iframe.mediadelivery.net/embed/86156/${videoId}?autoplay=true&preload=true`;

  return (
 
    <div className="relative bg-black" style={{ paddingTop: '56.25%' }}>
      <iframe
        src={videoSrc}
        loading="lazy"
        className="absolute top-0 left-0 w-full h-full border-none"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
};

export default VideoPlayer;

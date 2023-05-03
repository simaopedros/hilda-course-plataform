import React from 'react';

type VideoPlayerProps = {
  videoId: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  const videoSrc = `https://iframe.mediadelivery.net/embed/86156/${videoId}?autoplay=true&preload=true`;

  return (
 
    <div style={{ position: 'relative', paddingTop: '56.25%' }}>
      <iframe
        src={videoSrc}
        loading="lazy"
        style={{
          border: 'none',
          position: 'absolute',
          top: 0,
          height: '100%',
          width: '100%',
        }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
};

export default VideoPlayer;

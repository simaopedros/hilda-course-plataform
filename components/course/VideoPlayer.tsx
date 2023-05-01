// components/videoPlayer/VideoPlayer.tsx

import React from 'react';

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  const iframeSrc = `https://iframe.mediadelivery.net/embed/113147/${videoId}?autoplay=false&preload=true`;

  return (
    <div style={{ position: 'relative', paddingTop: '56.25%' }} >
      <iframe className='rounded-lg'
        src={iframeSrc}
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

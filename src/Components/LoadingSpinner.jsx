import React from 'react';
import video from "../../public/video.mp4"


const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
    <div className="relative w-full max-w-2xl h-screen  aspect-video">
      <video 
        src={video} 
        autoPlay 
        
        loop 
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);

export default LoadingSpinner;
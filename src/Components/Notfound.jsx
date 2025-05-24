import React from 'react';
import image from "../../public/404.png"


const Notfound = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
    <div className="relative w-full max-w-2xl h-screen  aspect-video">
      <img 
        src={image} 
        
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);

export default Notfound;
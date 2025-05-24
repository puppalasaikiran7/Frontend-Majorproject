import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdNewReleases } from "react-icons/md";
import { BiSolidBellRing } from "react-icons/bi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const Header = ({ data }) => {
  console.log(data)
  const [currentImage, setCurrentImage] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!data) return;

    // Fade out current image
    setIsVisible(false);

    // After fade out completes, change image and fade in
    const timer = setTimeout(() => {
      setCurrentImage(data);
      setIsVisible(true);
    }, 500); // Matches the CSS transition duration

    return () => clearTimeout(timer);
  }, [data]);

  if (!currentImage) return null;

  return (
    <div className={`w-[97%] h-[75vh] relative top-10 rounded-4xl m-4 mb-25 overflow-hidden transition-opacity border border-white  duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${currentImage.backdrop_path || currentImage.profile_path})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="absolute bottom-0 w-full h-[45%] p-[3vw] text-white backdrop-blur-3xl bg-black/20 rounde-4xl">
        <h1 className="font-montserrat text-6xl font-extrabold mt-[-15px] ">
          {currentImage.name || currentImage.title || currentImage.original_title || currentImage.original_name  }
        </h1>
        <p className='pt-2 text-lg font-semibold'>
          {currentImage.overview?.slice(0,200)}... <Link to={`/${data.media_type}/${data.id}`} className="text-white">more</Link>
        </p>
        <p className='flex gap-2 items-center mt-3 mb-3 font-bold capitalize'>
          <BiSolidBellRing className='text-2xl'/> 
          {currentImage.release_date ? currentImage.release_date : "no information"}
          <MdNewReleases className='text-2xl'/> 
          {currentImage.media_type === "tv" ? "series" : "movies"}
        </p>
        <Link to={`${data.media_type}/${data.id}/trailer`} className='font-semibold bg-black rounded-xl flex w-1/6 items-center gap-3 p-2 tracking-wider'>
          <FontAwesomeIcon icon={faYoutube} style={{color: "#fe0606"}} className='ml-2' /> Watch Trailer
        </Link>
      </div>
    </div>
  );
};

export default React.memo(Header);
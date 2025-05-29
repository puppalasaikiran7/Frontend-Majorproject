import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdNewReleases } from "react-icons/md";
import { BiSolidBellRing } from "react-icons/bi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const Header = ({ data }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!data) return;

    setIsVisible(false);

    const timer = setTimeout(() => {
      setCurrentImage(data);
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [data]);

  if (!currentImage) return null;

  return (
    <div
      className={`min-h-[75vh] md:min-h-[85vh] w-[95%] mx-auto mt-24 mb-16 rounded-4xl relative overflow-hidden transition-opacity border border-white duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${currentImage.backdrop_path || currentImage.profile_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="absolute bottom-0 w-full p-4 sm:p-6 md:p-10 text-white backdrop-blur-2xl bg-black/20">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold">
          {currentImage.name || currentImage.title || currentImage.original_title || currentImage.original_name}
        </h1>
        <p className="mt-2 text-sm sm:text-base md:text-lg font-semibold">
          {currentImage.overview?.slice(0, 200)}...
          <Link to={`/${data.media_type}/${data.id}`} className="text-white ml-2">more</Link>
        </p>
        <p className="flex gap-4 items-center mt-4 mb-4 font-bold capitalize text-sm md:text-lg">
          <BiSolidBellRing className="text-xl" />
          {currentImage.release_date || "no information"}
          <MdNewReleases className="text-xl" />
          {currentImage.media_type === "tv" ? "series" : "movie"}
        </p>
        <Link
          to={`/${data.media_type}/${data.id}/trailer`}
          className="inline-flex items-center gap-3 bg-black text-white px-4 py-2 rounded-xl text-sm md:text-base font-semibold"
        >
          <FontAwesomeIcon icon={faYoutube} style={{ color: "#fe0606" }} />
          Watch Trailer
        </Link>
      </div>
    </div>
  );
};

export default React.memo(Header);

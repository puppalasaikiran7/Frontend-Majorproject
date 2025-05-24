import gsap from "gsap";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { FaStar } from "react-icons/fa6";






const VerticalCard = ({ data, title }) => {
  console.log(data);
  const containerRef = useRef();

  useGSAP(() => {
    gsap.killTweensOf(".movie-card");

    gsap.set(".movie-card", {
      y: 80,
      opacity: 0,
      scale: 0.95,
      rotationX: 5,

      transformPerspective: 1000,
      transformOrigin: "center bottom",
    });

   
    const tl = gsap.timeline({
      defaults: {
        duration: 1.2,
        ease: "expo.out",
      },
    });

    tl.to(".movie-card", {
      y: 0,
      opacity: 1,
      scale: 1,
      rotationX: 0,

      stagger: {
        each: 0.08,
        from: "center",
        grid: "auto",
        ease: "sine.inOut",
      },
      delay: 0.1,
    });

    const cards = gsap.utils.toArray(".movie-card");

    cards.forEach((card) => {
      

      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.2,
          y: -20,
          duration: 0.4,
          borderRadius: "20px",
          rotateY: 360,
          zIndex: 10,
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
          borderRadius: "20px",
          rotateY: 0,
          zIndex: 0,
        });
      });


    });
  }, [data]);

  

  

  return (
    <div
      ref={containerRef}
      
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 w-full  mt-20 px-8 "
    >
      {data.map((items, index) => (
        <Link
          to={`/${data.media_type || title}/${items.id}`}
          key={index}
          
          className="movie-card   will-change-transform relative group rounded-3xl overflow-hidden mt-15   hover:shadow-[0_0px_10px_rgb(255,255,255)]  transition-all duration-300 border-2 border-zinc-400 hover:border-white/60"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="relative h-[60vh] w-full transform transition-transform duration-500 ">
            <img
              className="object-cover w-full h-full transition-all duration-500 rounded-2xl  "
              src={`https://image.tmdb.org/t/p/original/${
                items.poster_path || items.backdrop_path || items.profile_path
              }`}
              alt={items.title || items.name || items.profile_path}
              loading="lazy"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-black/10 backdrop-blur-3xl p-4 h-[20%] flex items-end rounded-b-2xl">
              <h1 className="text-white text-3xl font-bold tracking-wide ">
                {items.title ||
                  items.name ||
                  items.original_title ||
                  items.original_name}
              </h1>
            </div>

            {!items.profile_path && (
              <div className="absolute top-3 left-2 rounded-xl w-30 font-bold  h-10 text-center backdrop-blur-3xl bg-zinc-950/20 p-2">
                <h1 className="text-white font-bold  ">
                  {items.release_date || items.first_air_date}
                </h1>
              </div>
            )}

            {items.vote_average && (
              <div className="absolute top-3 right-2 rounded-4xl flex gap-2 font-bold  text-center traxcking-widest text-white  p-2 items-center bg-zinc-950/20 backdrop-blur-3xl">
                <FaStar className="text-yellow-300" />{" "}
                {items.vote_average.toFixed(1)}/10
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default VerticalCard;

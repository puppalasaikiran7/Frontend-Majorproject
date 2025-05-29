import React, { useRef } from "react";
import "../../HorizontalCard.css";
import gsap from "gsap";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { ScrollToPlugin } from "gsap/all";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollToPlugin);

const HorizontalCards = ({ data, card }) => {
  const containeref = useRef(null);

  const scroll = (direction) => {
    if (!containeref.current) return;
    const scrollamount = 500;

    gsap.to(containeref.current, {
      scrollTo: {
        x: direction === "left" ? `-=${scrollamount}` : `+=${scrollamount}`,
      },
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
    });
  };

  const sortedData = [...data].sort((a, b) => b.vote_count - a.vote_count);

  return (
    <div className="w-full min-h-screen ml-2 md:ml-4 p-2 md:p-5 rounded-2xl overflow-y-hidden relative">
      {/* Scroll Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 z-50 top-[40%] bg-slate-900 border border-white text-white p-2 rounded-full"
      >
        <FaCircleChevronLeft className="text-3xl md:text-5xl mix-blend-difference" />
      </button>

      {/* Scroll Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 z-50 top-[40%] bg-slate-900 border border-white text-white p-2 rounded-full"
      >
        <FaCircleChevronRight className="text-3xl md:text-5xl mix-blend-difference" />
      </button>

      {/* Scrollable Horizontal Container */}
      <div
        className="w-full flex h-full overflow-x-auto overflow-y-hidden scroller scroll-smooth snap-x snap-mandatory"
        ref={containeref}
      >
        {sortedData.length > 0 ? (
          sortedData.map((item, index) => {
            const title =
              item.title ||
              item.name ||
              item.original_name ||
              item.original_title;

            const isSpecialTitle =
              title === "Captain America: Brave New World" ||
              title === "Final Destination Bloodlines" ||
              title === "A Deadly American Marriage" ||
              title === "Mission: Impossible - The Final Reckoning";

            return (
              <Link
                to={`/${card || item.media_type}/${item.id}`}
                className="min-w-[80%] sm:min-w-[60%] md:min-w-[40%] lg:min-w-[30%] mr-4 snap-start"
                key={item.id || index}
              >
                <div className="bg-slate-900 h-auto md:h-[100vh] mt-5 p-3 text-white rounded-3xl shadow-2xl shadow-slate-900/80 border-white">
                  <img
                    className="w-full h-[50vh] md:h-[65vh] object-cover object-center grayscale hover:grayscale-0 transition-all duration-500 ease-in-out hover:scale-105 rounded-2xl"
                    src={`https://image.tmdb.org/t/p/original/${
                      item.poster_path || item.backdrop_path
                    }`}
                    alt={title}
                    loading="lazy"
                  />
                  <div className="mix-blend-difference hover:text-white p-4">
                    <h1
                      className={`font-black uppercase ${
                        isSpecialTitle
                          ? "text-xl sm:text-2xl md:text-3xl"
                          : "text-2xl sm:text-3xl md:text-4xl"
                      }`}
                    >
                      {title}
                    </h1>
                    <p
                      className={`w-full ${
                        isSpecialTitle ? "mt-6" : "mt-8"
                      } mb-3 text-sm sm:text-base md:text-lg`}
                    >
                      {item.overview
                        ? item.overview.slice(0, 100)
                        : "no overview available"}
                      ...
                      <span className="ml-2 uppercase font-semibold cursor-pointer">
                        more
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500 uppercase text-center mt-5">
            nothing to show
          </h1>
        )}
      </div>
    </div>
  );
};

export default HorizontalCards;

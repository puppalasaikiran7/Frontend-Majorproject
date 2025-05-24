import React, { useRef } from "react";
import "../../HorizontalCard.css";
import gsap from "gsap";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight  } from "react-icons/fa6";
import { ScrollToPlugin } from "gsap/all";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollToPlugin) 

const HorizontalCards = ({ data , card}) => {

    

    const containeref = useRef(null)

    const scroll = (direction)=>{
        if (!containeref.current) return;
        const scrollamount = 500

        gsap.to(containeref.current , {
            scrollTo:{
                x: direction == "left" ? `-=${scrollamount}` : `+=${scrollamount}` 
            },
            duration : 1,
            delay : 0.5,
            ease : "power2.out"

        })
    }


  const sortedData = [...data].sort((a, b) => b.vote_count - a.vote_count);

  return (
    <div className="w-full h-[120vh]  ml-4 p-5 rounded-2xl overflow-y-hidden relative  ">
        <button onClick={()=>scroll("left")} className="absolute left-0 z-100   top-[40%] bg-slate-900 border border-white text-white p-2 rounded-xl   ">
            <FaCircleChevronLeft className="text-5xl mix-blend-difference"/>
        </button>

        <button onClick={()=>scroll("right")} className="absolute right-5 z-100 bg-slate-900  top-[40%] border border-white  text-white p-2 rounded-xl   ">
            <FaCircleChevronRight  className="text-5xl mix-blend-difference"/>
        </button>

      <div className="w-full flex h-full overflow-x-auto overflow-y-hidden scroller" ref={containeref}>
        {sortedData.length>0 ? sortedData.map((item, index) => {
          const title =
            item.title ||
            item.name ||
            item.original_name ||
            item.original_title;
          const isCaptainAmerica = title === "Captain America: Brave New World" ; 
          const isfinaldestination = title ==  "Final Destination Bloodlines";
          const deadly  = title  == "A Deadly American Marriage";
          const mi  = title  == "Mission: Impossible - The Final Reckoning";

          return (
            <Link to={`/${card || item.media_type }/${item.id}`} className="min-w-[30%] mr-5  " key={item.id || index}>
              <div className="bg-slate-900 h-[105vh] mt-5 p-2 text-white rounded-4xl  shadow-2xl shadow-slate-900/80  border-white  ">
                <img
                  className="w-full h-[65vh] object-cover object-center grayscale hover:grayscale-0 transition-all duration-500 ease-in-out hover:scale-105 rounded-4xl"
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path || item.backdrop_path}`}
                  alt={title}
                  loading="lazy"
                />
                <div className="mix-blend-difference hover:text-white p-4">
                  <h1
                    className={`font-black uppercase ${
                      isCaptainAmerica || isfinaldestination || deadly || mi ? "text-3xl" : "text-4xl"
                    }`}
                  >
                    {title}
                  </h1>
                  <p
                    className={`w-full ${
                      isCaptainAmerica || isfinaldestination || deadly  || mi? "mt-10" : "mt-12"
                    } mb-3 text-xl `}
                  >
                    {item.overview ? item.overview.slice(0,100) : "no overview available"}...
                    <span className="ml-2 uppercase font-semibold  cursor-pointer">
                      more
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          );
        }) : <h1 className="text-5xl font-bold text-red-500 uppercase text-center mt-5">nothing to show</h1>}
      </div>
    </div>
  );
};

export default HorizontalCards;

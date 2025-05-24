import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import Notfound from "../Notfound";

const Trailer = () => {

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return (
    <div className=" inset-0 z-50 flex items-center justify-center bg-black/80 relative">
      {/* Container with 50px border radius */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <div className="w-[99%] h-[85vh] rounded-[30px] overflow-hidden">
          
          <div className="w-40 h-20 absolute top-5 z-50 right-[-80px]  ">
                
            <Link onClick={() => navigate(-1)}>
                <ImCross className="text-red-500 rotate-180 text-4xl mr-5 hover:text-red-700 transition-colors duration-200" />
            </Link>
            
          </div>
            {ytvideo ? 
            (
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
                    width="100%"
                    height="100%"
                    controls
                    playing
                />) : (<Notfound />)
            }

        </div>
      </div>
    </div>
  )
};

export default Trailer;

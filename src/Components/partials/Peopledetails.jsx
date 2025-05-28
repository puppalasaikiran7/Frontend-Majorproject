import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "../partials/DropDown";
import { asyncloadperson } from "../../store/actions/Personaction";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  Outlet,
} from "react-router-dom";
// import wikilogo from "../../assets/wikidata-logo.png";
import { FaFacebook } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";

import { removeperson } from "../../store/reducers/Personslice";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import LoadingSpinner from "../LoadingSpinner";
import { FaStar } from "react-icons/fa6";
import Crew from "../partials/crew";
import noimage from "/noimage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import HorizontalCards from "../partials/HorizontalCards";
import { useRef } from "react";
import gsap from "gsap"
import SplitText from "gsap/SplitText";
import VanillaTilt from 'vanilla-tilt';

gsap.registerPlugin(SplitText) 


const Persondetail = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie");

  const nameref = useRef(null)

  const { info } = useSelector((state) => state.person);
  console.log(info);

  const filtercast = useMemo(() => {
    return info?.combinedcredits?.cast?.filter((item) =>
      category === "movie"
        ? item.media_type == "movie"
        : item.media_type == "tv"
    );
  }, [info, category]);

  
  useEffect(()=>{
    if(!info?.details?.name || !nameref.current) return ;
    console.log(info.details.name)

    const split =  SplitText.create(nameref.current , {type: "chars"})

    gsap.set(split.chars,{
      y : 50,
      autoAlpha : 0,
    })
    gsap.to(split.chars , {
      y : 0,
      autoAlpha : 1,
      stagger : 0.3,
      delay  : 0.5,
      ease : "power4.out",
      duration :1
    })

    return ()=>{
      split.revert()
    }

  },[info?.details?.name])


  useEffect(()=>{

    const tiltelement = document.querySelectorAll(".tilt-card");

    VanillaTilt.init(tiltelement , {
      max : 20,
      speed : 500,
      scale :1,
      glare : true,
      "max-glare" : 0.3,
      reverse : true,
    })

    return ()=>{
      tiltelement.forEach(ele=>{
        if(ele.VanillaTilt){
          ele.VanillaTilt.destroy()
        }
      })
    }

  },[info])



  console.log(filtercast, "filter");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id, dispatch]);

  if (!info) return <LoadingSpinner />;

  return info ? (
    <div
      className={`w-full relative  text-white   h-max  ${
        info.details.gender == 1
          ? "background"
          : info.details.gender == 2
          ? "boybackground"
          : "normal"
      }  `}
    >
      {/* Back Button */}
      <div className=" z-50 absolute top-10 left-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full  transition-colors"
          aria-label="Go back"
        >
          <FaArrowRightFromBracket className="text-black rotate-180 text-4xl cursor-pointer" />
        </button>
      </div>

      {/* Person name */}
      <div className="ml-140">
        <h1 className="text-6xl font-bold py-10 uppercase" ref={nameref}>
          {info.details?.name || "Person Details"}
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row px-[5%] gap-8 mt-10 ">
        {/* Person Image */}
        <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col items-center">
          <img
            src={`https://image.tmdb.org/t/p/original/${info.details.profile_path}`}
            alt={info.details?.name}
            className="rounded-3xl w-full max-w-xs object-cover shadow-2xl shadow-black tilt-card "
            onError={(e) => {
              e.target.src = noimage;
            }}
          />

          <div className="flex mt-5 gap-2.5 flex-wrap items-center justify-center  bg-black/60 rounded-xl p-5 backdrop-blur-3xl">
            <a
              href={`https://www.facebook.com/${info.extrenalid.facebook_id}`}
              target="_blank"
            >
              <FaFacebook className="text-blue-900 bg-white text-4xl p-1 rounded-lg" />
            </a>

            <a
              href={`https://www.instagram.com/${info.extrenalid.instagram_id}`}
              target="_blank"
            >
              <div className="h-10 w-10 rounded-xl relative bg-linear-to-bl from-pink-500 via-red-600 to-yellow-500">
                <div className="bg-white w-7 h-7 rounded-lg absolute top-1.5 left-1.5">
                  <div className=" rounded-sm absolute top-1 left-1  bg-linear-to-bl from-pink-500 via-red-600 to-yellow-500 h-5 w-5">
                    <div className="bg-white w-2 h-2 rounded-xl absolute top-1.5 left-1.5">
                      <div className="h-1 w-1 bg-linear-to-bl from-pink-500 via-red-600 to-yellow-500 rounded-xl absolute top-0.5 left-0.5 "></div>
                    </div>
                    <div className="w-1 h-1 rounded-xl absolute top-0.5 bg-white right-0.5"></div>
                  </div>
                </div>
              </div>
            </a>

          
            <a
              href={`https://x.com/${info.extrenalid.facebook_id}`}
              target="_blank"
            >
              <BsTwitterX className=" text-3xl " />
            </a>

            {info.extrenalid?.imdb_id && (
              <a
                href={`https://www.imdb.com/name/${info.extrenalid.imdb_id}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-2 py-1 rounded-lg transition-colors"
              >
                IMDB
              </a>
            )}

            <a
              href={`https://www.wikidata.org/wiki/${info.extrenalid.wikidata_id}`}
              target="_blank"
            >
              <div className="bg-white relative  pt-1 rounded-xl">
                <div className="wiki h-5 w-[70%]   ml-3 mb-[-10px]"></div>

                <h6 className="text-zinc-600 pt-2  pl-2 pr-2  uppercase font-bold">
                  wikidata
                </h6>
              </div>
            </a>

            {info.details?.homepage && (
              <a
                href={info.details.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-linear-to-br from-blue-400 via-blue-950 to-black text-white px-4 py-2 rounded-lg transition-colors font-bold uppercase shadow-[5px_5px_10px_rgb(0,0,0)]"
              >
                Official Website
              </a>
            )}
          </div>
        </div>

        {/* Person Details */}
        <div className="w-full md:w-2/3 lg:w-3/4 bg-white/40  backdrop-blur-2xl rounded-xl p-10">
          <div className="mb-6">
            <p className=" text-xl mb-2">
              <span className=" font-bold  uppercase text-black text-2xl">
                Name :{" "}
              </span>
              {info.details?.name}
            </p>

            {info.details?.birthday && (
              <p className="text-xl mb-2">
                <span className="font-bold uppercase text-black text-2xl">
                  Born :{" "}
                </span>
                {info.details.birthday}
              </p>
            )}

            {info.details?.known_for_department && (
              <p className="text-xl mb-2">
                <span className="font-bold uppercase text-black text-2xl">
                  known for :{" "}
                </span>
                {info.details.known_for_department}
              </p>
            )}

            {info.details?.also_known_as && (
              <p className="text-xl mb-2">
                <span className="font-bold uppercase text-black text-2xl">
                  also know as :{" "}
                </span>
                {info.details.also_known_as.join(" , ")}
              </p>
            )}

            <p className="text-xl mb-2">
              <span className="font-bold uppercase  text-black text-2xl">
                {" "}
                Status :{" "}
              </span>
              {info.details.deathday ? info.details.deathday : "Alive"}
            </p>

            {info.details?.place_of_birth && (
              <p className="text-xl mb-4  ">
                <span className="font-bold uppercase text-black text-2xl">
                  Place of Birth :{" "}
                </span>

                {info.details.place_of_birth}
              </p>
            )}

            {info.details?.biography && (
              <div className="mb-6">
                <h2 className="text-2xl  text-black font-bold mb-2">
                  Biography{" "}
                </h2>
                <p className="text-lg line-clamp-5">
                  {info.details.biography}
                  <span className="capitalize  font-bold ">more</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8  h-[78vh] mt-10 rounded-xl">
        {/* Horizontal scrolling container */}
        <div className="relative h-full">
          <h1 className="text-4xl text-white font-bold uppercase ">Casted</h1>
          <div className="absolute right-0 bottom-120">
            <DropDown
              selectedValue={category}
              title="category"
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>
          <div className="flex space-x-6 pb-6 overflow-x-auto scrollbar-hide h-full mt-5  rounded-xl">
            {filtercast.map((items, index) => (
              <Link
                key={index}
                to={`/${items.media_type}/${items.id}`}
                className="relative mt-4 flex-shrink-0 w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px] group transition-transform duration-200 hover:scale-105 hover:rounded-2xl"
              >
                <div className="h-[300px] sm:h-[250px] md:h-[380px] w-full relative " >
                  <img
                    src={
                      items.poster_path
                        ? `https://image.tmdb.org/t/p/original/${items.poster_path}`
                        : noimage
                    }
                    alt={items.name}
                    className="h-full w-full rounded-xl object-cover object-top group-hover:opacity-90"
                    onError={(e) => {
                      e.target.src = defaultProfile;
                    }}
                  />
                </div>
                <div className="bg-gradient-to-t from-black/80 mt-5 to-transparent text-white w-full   flex flex-col justify-end p-2 sm:p-3 rounded-b-xl">
                  <h1 className="font-bold text-lg  truncate">
                    {items.title || items.name}
                  </h1>
                  <p className="text-xs sm:text-sm opacity-80 truncate capitalize pt-3 md:text-lg">
                    media type :
                    <span className="pl-2 text-lg">
                      {items.media_type || "unknown"}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>



      {
        info.combinedcredits.crew.length >0 && (<div className="px-4 sm:px-6 lg:px-8 py-8  h-[80vh] mt-10">
        {/* Horizontal scrolling container */}
        <div className="relative h-full">
          <h1 className="text-white text-4xl  font-bold uppercase ">crew</h1>
          <div className="flex space-x-6 pb-6 overflow-x-auto scrollbar-hide h-full mt-7  rounded-xl">
            {info?.combinedcredits?.crew?.map((items, index) => (
              <Link
                key={index}
                to={`/${items.media_type}/${items.id}`}
                className="relative flex-shrink-0 w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px] group transition-transform duration-200 hover:scale-105 hover:rounded-2xl"
              >
                <div className="h-[300px] sm:h-[250px] md:h-[380px] w-full relative">
                  <img
                    src={
                      items.poster_path
                        ? `https://image.tmdb.org/t/p/original/${items.poster_path}`
                        : noimage
                    }
                    alt={items.name}
                    className="h-full w-full rounded-xl object-cover object-top group-hover:opacity-90"
                    onError={(e) => {
                      e.target.src = defaultProfile;
                    }}
                  />
                </div>
                <div className="bg-gradient-to-t from-black/80 mt-5 to-transparent text-white w-full   flex flex-col justify-end p-2 sm:p-3 rounded-b-xl">
                  <h1 className="font-bold text-lg  truncate">
                    {items.title || items.name}
                  </h1>
                  <h1 className="text-xl text-white font-bold uppercase ">
                    JOB : {items.job}
                  </h1>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>) 
      }
      

      
    </div>
  ) : (
    <LoadingSpinner />
  );
};

export default Persondetail;

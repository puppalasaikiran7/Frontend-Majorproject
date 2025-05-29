import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv } from "../../store/actions/Tvactions";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  Outlet,
} from "react-router-dom";
import { removetv } from "../../store/reducers/Tvslice";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import image from "../../../public/images.jpeg";
import LoadingSpinner from "../LoadingSpinner";
import imagelogo from "../../../public/officialweblogo.png";
import wikilogo from "../../../public/Wikidata-logo.png";
import { FaStar } from "react-icons/fa6";
import Crew from "../partials/crew";
import noimage from "../../../public/noimage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import HorizontalCards from "../partials/HorizontalCards";

const Tvdetails = () => {
  const { pathname } = useLocation();
  // console.log(pathname)

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { info } = useSelector((state) => state.tv);
  console.log(info);

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div className=" w-full relative overflow-x-hidden">
      <div className="w-40 h-20 absolute top-10 z-50 left-10 ">
        <div className="w-full flex items-center px-[3%] py-2 justify-between">
          <div className="relative group w-[1%]">
            <Link onClick={() => navigate(-1)}>
              <FaArrowRightFromBracket className="text-white rotate-180 text-4xl mr-5 hover:text-zinc-300 transition-colors duration-200" />
            </Link>
            <div className="absolute left-[-35px] top-full mt-2 h-98 w-98 hidden group-hover:block z-50">
              <img
                src={image}
                alt="Hover preview"
                className="w-40 h-40 object-cover rounded-lg shadow-xl border-2 border-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`text-white mt-25  p-0 `}>
        {info.images.logos.length > 0 ? (
          <img
            src={`https://image.tmdb.org/t/p/original/${
              info.images.logos.find((m) => m.iso_639_1 === "en" || "uk").file_path
            }`}
            alt="tv Logo"
            className=" p-10  object-cover h-full "
          />
        ) : (
          <div className="text-9xl uppercase  font-bold ml-100 ">
            <span className="text-red-500 p-2 text-9xl">no</span>
            <div className="bg-white text-black inline p-2 rounded">logo</div>
          </div>
        )}
      </div>

      {/* poster */}
      <div className=" rounded-3xl mt-20  flex  ">
        <div className="h-full w-[25%] ">
          <img
            src={`https://image.tmdb.org/t/p/original/${
              info.images.posters.find((m) => m.iso_639_1 === "en" || "hi")
                .file_path
            }`}
            alt="tv"
            className=" p-10 ml-10 object-cover h-full rounded-[5vw] "
          />

          <Link
            to={`${pathname}/trailer`}
            className="font-semibold bg-white w-[50%] rounded-xl flex  items-center gap-3 p-2 ml-23 tracking-wider"
          >
            <FontAwesomeIcon
              icon={faYoutube}
              style={{ color: "#fe0606" }}
              className="ml-2"
            />{" "}
            Watch Trailer
          </Link>
        </div>

        <div className="w-[80%]  h-full p-10 text-white ">
          <div className=" ">
            <div className="flex items-center gap-2 text-3xl font-bold  p-5 rounded-xl ">
              <span className="uppercase ">rating : </span>
              <FaStar className="text-amber-300 " />
              {info.details.vote_average.toFixed(1)}
            </div>
          </div>

          <div className="">
            <h1 className="font-bold p-5  text-3xl uppercase">
              first air date : {info.details.first_air_date}
            </h1>

            <div className=" flex gap-10 items-center p-5">
              <h1 className="text-3xl font-bold uppercase">last air date : </h1>
              <h1 className="text-3xl font-bold capitalize">
                {info.details.last_air_date}
              </h1>
            </div>

            <div className=" flex gap-10 items-center p-5">
              <h1 className="text-3xl font-bold uppercase">genres : </h1>
              {info.details.genres.map((items, index) => {
                return (
                  <h1 key={index} className="font-semibold text-2xl">
                    {items.name}
                  </h1>
                );
              })}
            </div>
          </div>

          <div className="p-5">
            <div className="text-2xl ">
              <h1 className="font-bold">overview : </h1>
            </div>
            <span className="text-xl">{info.details.overview}</span>
          </div>
        </div>
      </div>

      {/* seasons */}
      <div className="px-4 sm:px-6 lg:px-8 py-8  h-[77vh] mt-10">
        {/* Horizontal scrolling container */}
        <div className="relative h-full">
          <h1 className="text-4xl text-white font-bold uppercase ">seasons</h1>
          <div className="flex space-x-6 pb-6 overflow-x-auto scrollbar-hide h-full mt-5   rounded-xl">
            {info.details.seasons.length > 0 ? info.details.seasons.map((items , index) => (
              <Link
                key={index}
                to={`/tv/${items.id}`}
                className="flex-shrink-0 w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px] group transition-transform duration-200 hover:scale-105 hover:rounded-2xl"
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
                  <div className="bg-gradient-to-t from-black/80 to-transparent text-white w-full h-[30%] flex flex-col justify-end p-2 sm:p-3 rounded-b-xl">
                    <h1 className="font-bold text-sm sm:text-base truncate">
                      {items.name}
                    </h1>
                    <p className="text-xs sm:text-sm opacity-80 truncate capitalize pt-3 md:text-lg">
                      episodes : 
                      <span className="pl-2 text-lg">
                        {items.episode_count || "unknown"}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            )): <h1 className="text-3xl font-bold text-white uppercase">no seasons</h1>}
          </div>
        </div>
      </div>

      {/* crew */}
      <div className="mt-15">
        <h1 className="text-white font-bold text-6xl ml-10"> Crew</h1>
        <Crew title="person" />
      </div>

      {/* similar */}
      <div className=" ">
        <h1 className="text-5xl text-white ml-10 uppercase font-bold">
          similar
        </h1>
        <HorizontalCards
          card="tv"
          data={info.similar.length > 0 ? info.similar : info.recommendations}
        />
      </div>

      {/* production */}

      <div className="text-white p-10 mt-10 w-full">
        <h1 className="text-4xl font-bold uppercase mb-6">
          Production Companies
        </h1>

        <div className="flex mt-5 h-[250px] overflow-x-auto overflow-y-hidden scrollbar-hide">
          {info?.details?.production_companies?.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[200px] h-full" // Fixed width for each company card
            >
              <div className="flex flex-col items-center justify-between h-full">
                <div className="bg-white rounded-xl p-4 flex items-center justify-center h-[180px] w-[180px]">
                  <img
                    src={
                      item.logo_path
                        ? `https://image.tmdb.org/t/p/original/${item.logo_path}`
                        : noimage
                    }
                    alt={item.name}
                    className="max-h-[140px] max-w-[160px] object-contain"
                    onError={(e) => {
                      e.target.src = noimage;
                      e.target.className =
                        "h-[140px] w-[160px] object-contain p-2";
                    }}
                  />
                </div>
                <h1 className="mt-2 text-lg font-semibold text-center px-2">
                  {item.name}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* buy */}
      <div className="h-[20vh] backdrop-blur-3xl mt-5 px-5">
        <div className="flex bg-white rounded-xl gap-10 items-center flex-wrap p-10">
          {info?.watchprovider?.buy?.length > 0 ? (
            <>
              <h1 className="text-4xl font-bold text-black uppercase">buy</h1>
              {info.watchprovider.buy.map((items, index) => (
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/original/${items.logo_path}`}
                  alt=""
                  className="h-[10vh] w-[10vh] rounded-xl object-contain"
                />
              ))}
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-black uppercase">
                Streaming
              </h1>
              {info?.watchprovider?.flatrate?.map((items, index) => (
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/original/${items.logo_path}`}
                  alt=""
                  className="h-[5vh] w-[5vh] rounded-xl object-contain"
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* rent */}
      <div className="h-max   p-10 ">
        <div className=" flex  gap-10 items-center flex-wrap">
          <h1 className="text-4xl font-bold text-white uppercase">rent</h1>
          {info?.watchprovider?.rent?.length > 0 ? (
            info.watchprovider.rent.map((items, index) => {
              return (
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/original/${items.logo_path}`}
                  alt=""
                  className="h-[10vh] w-[10vh] rounded-xl object-contain"
                />
              );
            })
          ) : (
            <div className="text-white text-2xl font-bold capitalize">
              there is no provider
            </div>
          )}
        </div>
      </div>

      {/* links */}
      <div className="px-5  ">
        <div className="text-white flex  bg-white rounded-xl items-center gap-10  mt-5  ">
          <h1 className="text-black font-bold ml-10 text-4xl mt-5">
            External links
          </h1>
          <a
            href={info.details.homepage}
            target="_blank"
            className="bg-white  rounded-full h-30 w-30 "
          >
            <img
              src={imagelogo}
              alt=""
              className="rounded-[60%] h-30 w-30 object-cover "
            />
          </a>

          <div className="bg-yellow-400 w-30 h-10 pl-6 pt-1 text-shadow-amber-50 text-shadow-sm rounded-xl cursor-pointer">
            <a
              href={`https://www.imdb.com/title/${info.extrenalid.imdb_id}/`}
              target="_blank"
              className="text-black font-bold text-3xl "
            >
              IMDB
            </a>
          </div>

          <a
            href={`https://www.wikidata.org/wiki/${info.extrenalid.wikidata_id}`}
            target="_blank"
          >
            <img
              src={wikilogo}
              alt=""
              className="h-20 w-30 object-cover bg-white rounded-xl "
            />
          </a>
        </div>
      </div>

      <Outlet />
    </div>
  ) : (
    <LoadingSpinner />
  );
};

export default Tvdetails;

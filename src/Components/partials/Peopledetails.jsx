import React, { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "../partials/DropDown";
import { asyncloadperson } from "../../store/actions/Personaction";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { FaFacebook, FaArrowRightFromBracket, FaStar } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { removeperson } from "../../store/reducers/Personslice";
import LoadingSpinner from "../LoadingSpinner";
import noimage from "/noimage.jpg";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import VanillaTilt from "vanilla-tilt";

gsap.registerPlugin(SplitText);

const Persondetail = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie");

  const nameref = useRef(null);
  const { info } = useSelector((state) => state.person);

  const filtercast = useMemo(() => {
    return info?.combinedcredits?.cast?.filter((item) =>
      category === "movie"
        ? item.media_type === "movie"
        : item.media_type === "tv"
    );
  }, [info, category]);

  useEffect(() => {
    if (!info?.details?.name || !nameref.current) return;

    const split = SplitText.create(nameref.current, { type: "chars" });

    gsap.set(split.chars, {
      y: 50,
      autoAlpha: 0,
    });
    gsap.to(split.chars, {
      y: 0,
      autoAlpha: 1,
      stagger: 0.3,
      delay: 0.5,
      ease: "power4.out",
      duration: 1,
    });

    return () => {
      split.revert();
    };
  }, [info?.details?.name]);

  useEffect(() => {
    const tiltelement = document.querySelectorAll(".tilt-card");

    VanillaTilt.init(tiltelement, {
      max: 20,
      speed: 500,
      scale: 1,
      glare: true,
      "max-glare": 0.3,
      reverse: true,
    });

    return () => {
      tiltelement.forEach((ele) => {
        if (ele.VanillaTilt) {
          ele.VanillaTilt.destroy();
        }
      });
    };
  }, [info]);

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id, dispatch]);

  if (!info) return <LoadingSpinner />;

  return (
    <div
      className={`w-full relative text-white h-max
        ${
          info.details.gender === 1
            ? "background"
            : info.details.gender === 2
            ? "boybackground"
            : "normal"
        }
      `}
    >
      {/* Back Button */}
      <div className="z-50 absolute top-5 left-5 sm:top-10 sm:left-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full transition-colors"
          aria-label="Go back"
        >
          <FaArrowRightFromBracket className="text-black rotate-180 text-3xl sm:text-4xl cursor-pointer" />
        </button>
      </div>

      {/* Person name */}
      <div className="px-4 sm:px-10 max-w-7xl mx-auto pt-15 md:p-0 md:mx-110 ">
        <h1
          className="text-3xl sm:text-5xl md:text-6xl font-bold py-6 sm:py-10 uppercase"
          ref={nameref}
        >
          {info.details?.name || "Person Details"}
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row px-4 sm:px-10 max-w-7xl mx-auto gap-6 md:gap-8 mt-6 sm:mt-10">
        {/* Person Image */}
        <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col items-center">
          <img
            src={`https://image.tmdb.org/t/p/original/${info.details.profile_path}`}
            alt={info.details?.name}
            className="rounded-3xl w-full max-w-xs sm:max-w-sm object-cover shadow-2xl shadow-black tilt-card"
            onError={(e) => {
              e.target.src = noimage;
            }}
          />

          <div className="flex mt-5 gap-3 flex-wrap items-center justify-center bg-black/60 rounded-xl p-4 backdrop-blur-3xl max-w-xs mx-auto sm:max-w-full">
            <a
              href={`https://www.facebook.com/${info.extrenalid.facebook_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-blue-900 bg-white text-4xl p-1 rounded-lg" />
            </a>

            <a
              href={`https://www.instagram.com/${info.extrenalid.instagram_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="h-10 w-10 rounded-xl relative bg-gradient-to-bl from-pink-500 via-red-600 to-yellow-500">
                <div className="bg-white w-7 h-7 rounded-lg absolute top-1.5 left-1.5">
                  <div className="rounded-sm absolute top-1 left-1 bg-gradient-to-bl from-pink-500 via-red-600 to-yellow-500 h-5 w-5">
                    <div className="bg-white w-2 h-2 rounded-xl absolute top-1.5 left-1.5">
                      <div className="h-1 w-1 bg-gradient-to-bl from-pink-500 via-red-600 to-yellow-500 rounded-xl absolute top-0.5 left-0.5"></div>
                    </div>
                    <div className="w-1 h-1 rounded-xl absolute top-0.5 bg-white right-0.5"></div>
                  </div>
                </div>
              </div>
            </a>

            <a
              href={`https://x.com/${info.extrenalid.facebook_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitterX className="text-3xl" />
            </a>

            {info.extrenalid?.imdb_id && (
              <a
                href={`https://www.imdb.com/name/${info.extrenalid.imdb_id}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-3 py-1 rounded-lg transition-colors"
              >
                IMDB
              </a>
            )}

            <a
              href={`https://www.wikidata.org/wiki/${info.extrenalid.wikidata_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white relative pt-1 rounded-xl"
            >
              <div className="wiki h-5 w-[70%] ml-3 mb-[-10px]"></div>
              <h6 className="text-zinc-600 pt-2 pl-2 pr-2 uppercase font-bold">
                wikidata
              </h6>
            </a>

            {info.details?.homepage && (
              <a
                href={info.details.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-blue-400 via-blue-950 to-black text-white px-4 py-2 rounded-lg transition-colors font-bold uppercase shadow-[5px_5px_10px_rgb(0,0,0)]"
              >
                Official Website
              </a>
            )}
          </div>
        </div>

        {/* Person Details */}
        <div className="w-full md:w-2/3 lg:w-3/4 bg-white/40 backdrop-blur-2xl rounded-xl p-6 sm:p-10">
          <div className="mb-6 space-y-3">
            <p className="text-lg sm:text-xl">
              <span className="font-bold uppercase text-black text-lg sm:text-2xl">
                Name:{" "}
              </span>
              {info.details?.name}
            </p>

            {info.details?.birthday && (
              <p className="text-lg sm:text-xl">
                <span className="font-bold uppercase text-black text-lg sm:text-2xl">
                  Born:{" "}
                </span>
                {info.details.birthday}
              </p>
            )}

            {info.details?.known_for_department && (
              <p className="text-lg sm:text-xl">
                <span className="font-bold uppercase text-black text-lg sm:text-2xl">
                  Known for:{" "}
                </span>
                {info.details.known_for_department}
              </p>
            )}

            {info.details?.also_known_as && (
              <p className="text-lg sm:text-xl">
                <span className="font-bold uppercase text-black text-lg sm:text-2xl">
                  Also known as:{" "}
                </span>
                {info.details.also_known_as.join(", ")}
              </p>
            )}

            <p className="text-lg sm:text-xl">
              <span className="font-bold uppercase text-black text-lg sm:text-2xl">
                Status:{" "}
              </span>
              {info.details.deathday ? info.details.deathday : "Alive"}
            </p>

            {info.details?.place_of_birth && (
              <p className="text-lg sm:text-xl">
                <span className="font-bold uppercase text-black text-lg sm:text-2xl">
                  Place of Birth:{" "}
                </span>
                {info.details.place_of_birth}
              </p>
            )}

            {info.details?.biography && (
              <div>
                <h2 className="text-2xl text-black font-bold mb-2">Biography</h2>
                <p className="text-base sm:text-lg line-clamp-5">
                  {info.details.biography}{" "}
                  <span className="capitalize font-bold cursor-pointer">more</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Casted Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 mt-10 rounded-xl max-w-7xl mx-auto">
        <div className="relative">
          <h1 className="text-3xl sm:text-4xl text-white font-bold uppercase">
            Casted
          </h1>
          <div className="absolute right-0 top-[-20px] sm:top-0 sm:bottom-0">
            <DropDown
              selectedValue={category}
              title="category"
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>
          <div className="flex space-x-4 sm:space-x-6 overflow-x-auto scrollbar-hide mt-5 pb-6 rounded-xl">
            {filtercast.map((items, index) => (
              <Link
                key={index}
                to={`/${items.media_type}/${items.id}`}
                className="relative flex-shrink-0 w-[120px] sm:w-[160px] md:w-[180px] lg:w-[220px] group transition-transform duration-200 hover:scale-105 hover:rounded-2xl"
              >
                <div className="h-[220px] sm:h-[250px] md:h-[300px] lg:h-[380px] w-full relative">
                  <img
                    src={
                      items.poster_path
                        ? `https://image.tmdb.org/t/p/original/${items.poster_path}`
                        : noimage
                    }
                    alt={items.name}
                    className="h-full w-full rounded-xl object-cover object-top group-hover:opacity-90"
                    onError={(e) => {
                      e.target.src = noimage;
                    }}
                  />
                </div>
                <div className="bg-gradient-to-t from-black/80 mt-2 to-transparent text-white w-full flex flex-col justify-end p-2 sm:p-3 rounded-b-xl">
                  <h1 className="font-bold text-sm sm:text-lg truncate">
                    {items.title || items.name}
                  </h1>
                  <p className="text-xs sm:text-sm opacity-80 truncate capitalize pt-1 md:text-base">
                    media type:
                    <span className="pl-1 text-base">
                      {items.media_type || "unknown"}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Crew Section */}
      {info.combinedcredits.crew.length > 0 && (
        <div className="px-4 sm:px-6 lg:px-8 py-6 mt-10 max-w-7xl mx-auto rounded-xl">
          <div className="relative">
            <h1 className="text-white text-3xl sm:text-4xl font-bold uppercase">
              Crew
            </h1>

            

            <div className="flex space-x-4 sm:space-x-6 overflow-x-auto scrollbar-hide mt-5 pb-6 rounded-xl">
              {info.combinedcredits.crew
                .filter((item) =>
                  category === "movie"
                    ? item.media_type === "movie"
                    : item.media_type === "tv"
                )
                .map((items, index) => (
                  <Link
                    key={index}
                    to={`/${items.media_type}/${items.id}`}
                    className="relative flex-shrink-0 w-[120px] sm:w-[160px] md:w-[180px] lg:w-[220px] group transition-transform duration-200 hover:scale-105 hover:rounded-2xl"
                  >
                    <div className="h-[220px] sm:h-[250px] md:h-[300px] lg:h-[380px] w-full relative">
                      <img
                        src={
                          items.poster_path
                            ? `https://image.tmdb.org/t/p/original/${items.poster_path}`
                            : noimage
                        }
                        alt={items.name}
                        className="h-full w-full rounded-xl object-cover object-top group-hover:opacity-90"
                        onError={(e) => {
                          e.target.src = noimage;
                        }}
                      />
                    </div>
                    <div className="bg-gradient-to-t from-black/80 mt-2 to-transparent text-white w-full flex flex-col justify-end p-2 sm:p-3 rounded-b-xl">
                      <h1 className="font-bold text-sm sm:text-lg truncate">
                        {items.title || items.name}
                      </h1>
                      <p className="text-xs sm:text-sm opacity-80 truncate capitalize pt-1 md:text-base">
                        media type:
                        <span className="pl-1 text-base">
                          {items.media_type || "unknown"}
                        </span>
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Persondetail;

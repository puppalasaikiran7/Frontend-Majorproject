import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import Topnav from "../Components/partials/Topnav";
import DropDown from "../Components/partials/DropDown";
import VerticalCard from "./partials/VerticalCard";
import axios from "../utils/Axios";
import image from "../../public/images.jpeg";



const Movie = () => {
  
  

  document.title = "SCSDB | Movies";
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const loaderRef = useRef(null);

  const loadMore = useCallback(async () => {
    setLoading(true);
    try {
      const currentPage = page;
      const { data } = await axios.get(
        `/movie/${category}?page=${currentPage}`
      );
      if (data.results.length > 0) {
        setMovies((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
        setPage(currentPage + 1);
        setHasMore(currentPage < data.total_pages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more movies:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, category]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        loadMore();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, loading, loadMore]);

  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/movie/${category}?page=1`);
      setMovies(data.results);
      setPage(2);
      setTotalPages(data.total_pages);
      setHasMore(data.total_pages > 1);
    } catch (error) {
      console.error("Refresh error:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [category]);

  

  useEffect(() => {
    refreshData();
  }, [category, refreshData]);

  return (
    <div className="w-full min-h-screen">
      {/* Header */}
      <div className="w-full fixed bg-black/20 backdrop-blur-3xl top-0 z-50">
  <div className="w-full flex items-center justify-between px-4 sm:px-6 md:px-10 py-2">
    {/* Back Button + Hover Image */}
    <div className="relative group flex-shrink-0">
      <Link onClick={() => navigate(-1)} className="block">
        <FaArrowRightFromBracket className="text-white rotate-180 text-3xl sm:text-4xl hover:text-zinc-300 transition-colors duration-200" />
      </Link>
      <div className="absolute left-0 sm:left-[-35px] top-full mt-2 hidden group-hover:block z-50">
        <img
          src={image}
          alt="Hover preview"
          className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-lg shadow-xl border-2 border-white"
        />
      </div>
    </div>

    {/* Topnav */}
    <div className="flex-1 ml-4 sm:ml-8">
      <div className="w-full">
        <Topnav />
      </div>
    </div>
  </div>
</div>

      <div className="flex gap-5 w-[98%] justify-end-safe mt-24 px-5">
        <DropDown
          title="category"
          options={["top_rated", "popular", "upcoming", "now_playing"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>

      {/* Content */}
      <div className="pt-24 pb-10" >
        <VerticalCard data={movies} title="movie" />
        

        {/* Loader */}
        <div
          ref={loaderRef}
          className="h-10 flex justify-center items-center font-[monument]"
        >
          {loading && (
            <div className="text-white bg-white/20 backdrop-blur-3xl p-5 tracking-wider">
              Loading page {page} of {totalPages}...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import image from "../../public/images.jpeg";
import Topnav from "../Components/partials/Topnav";
import DropDown from "../Components/partials/DropDown";
import axios from '../utils/Axios';
import VerticalCard from './partials/VerticalCard';

const Trending = () => {
  document.title = "SCSDB | TRENDING";
  const navigate = useNavigate();
  
  const [category, setCategory] = useState("movie");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const loaderRef = useRef(null);

  const loadMore = useCallback(async () => {
    setLoading(true);
    try {
      const currentPage = page;
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${currentPage}`);
      
      if (data.results.length > 0) {
        setTrending(prev => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
        setPage(currentPage + 1);
        setHasMore(currentPage < data.total_pages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more trending items:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, category, duration]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

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
      const { data } = await axios.get(`/trending/${category}/${duration}?page=1`);
      setTrending(data.results);
      setPage(2);
      setTotalPages(data.total_pages);
      setHasMore(data.total_pages > 1);
    } catch (error) {
      console.error("Error refreshing trending:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [category, duration]);

  useEffect(() => {
    refreshData();
  }, [category, duration, refreshData]);

  return (
    <div className="w-full min-h-screen">
      {/* Header */}
      <div className='w-full fixed bg-black/20 backdrop-blur-3xl top-0 z-50'>
        <div className='w-full flex items-center px-[3%] py-2 justify-between'>
          <div className="relative group w-[1%]">
            <Link onClick={() => navigate(-1)}>
              <FaArrowRightFromBracket className="text-white rotate-180 text-4xl mr-5 hover:text-zinc-300 transition-colors duration-200" />
            </Link>
            <div className="absolute left-[-35px] top-full mt-2 h-98 w-98 hidden group-hover:block z-50">
              <img src={image} alt="Hover preview" className="w-40 h-40 object-cover rounded-lg shadow-xl border-2 border-white" />
            </div>
          </div>
          <div className='flex items-center w-[96%] ml-40'>
            <div className='w-[90%]'>
              <Topnav />
            </div>
          </div>
        </div>
      </div>

      {/* Filter dropdowns */}
      <div className='flex gap-5 w-[98%] justify-end-safe mt-34 px-5'>
        <DropDown title="category" options={["movie", "tv"]} func={(e) => setCategory(e.target.value)} />
        <DropDown title="duration" options={["week", "day"]} func={(e) => setDuration(e.target.value)} />
      </div>

      {/* Cards and Infinite Scroll Trigger */}
      <div className=' pb-10 '>
        <VerticalCard data={trending} title={category} />
        <div ref={loaderRef} className='h-10 flex justify-center items-center font-[monument]'>
          {loading && (
            <div className='text-white bg-white/20 backdrop-blur-3xl p-5 tracking-wider'>
              Loading page {page} of {totalPages}...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trending;

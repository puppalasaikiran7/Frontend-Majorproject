import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import Topnav from "../Components/partials/Topnav";
import axios from '../utils/Axios';
import VerticalCard from './partials/VerticalCard';
import image from "../../public/images.jpeg"

const People = () => {
  document.title = "SCSDB | People";
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const loaderRef = useRef(null);

  // Fixed loadMore function with proper page increment
  const loadMore = useCallback(async () => {
    // if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const currentPage = page; // Store the current page before fetching
      const { data } = await axios.get(`/person/${category}?page=${currentPage}`);
      
      if (data.results.length > 0) {
        setPeople(prev => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
        
        // Update page number for next load
        setPage(currentPage + 1);
        
        // Check if we've reached the last page
        setHasMore(currentPage < data.total_pages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more people:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, category]);

  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      {threshold : 0.1}
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
      const { data } = await axios.get(`/person/${category}?page=1`);
      setPeople(data.results);
      setPage(2); // Set next page to load as 2
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
    <div className="w-full min-h-screen ">
      {/* Header section */}
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

      {/* Content section */}
      <div className="pt-20 pb-10">
        <VerticalCard data={people} title="person" />
        
        {/* Loading trigger */}
        <div ref={loaderRef} className="h-10 flex justify-center items-center font-[monument] ">
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

export default People;












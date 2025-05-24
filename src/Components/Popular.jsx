import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import image from "../../public/images.jpeg";
import Topnav from "../Components/partials/Topnav";
import DropDown from "../Components/partials/DropDown";
import axios from '../utils/Axios';
import VerticalCard from './partials/VerticalCard';

const Popular = () => {
  document.title = "SCSDB | POPULAR";

  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const loaderRef = useRef(null);

  // Load next page of popular items
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);
      if (data.results.length > 0) {
        setPopular(prev => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
        setPage(prev => prev + 1);
        setHasMore(page < data.total_pages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Load more error:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [category, page, hasMore, loading]);

  // IntersectionObserver to auto-load
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        loadMore();
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loadMore, hasMore, loading]);

  // Refresh data when category changes
  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/${category}/popular?page=1`);
      setPopular(data.results);
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

  return popular.length > 0 ? (
    <div className="pb-10">
      {/* Fixed Top Navigation */}
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

        

      <div className='flex gap-5 w-[98%] justify-end-safe mt-24 px-5'>
        <DropDown title="category" options={["movie", "tv"]} func={(e) => setCategory(e.target.value)} />
      </div>


      {/* Content */}
      <div className="pt-24 pb-10">
        <VerticalCard data={popular} title={category} />

        {/* Loading Section */}
        <div className="h-16 flex justify-center items-center font-[monument]">
          {hasMore && (
            <div
              className="text-white bg-white/20 backdrop-blur-3xl px-6 py-2 rounded-md tracking-wider"
              ref={loaderRef}
            >
              {loading ? `Loading page ${page} of ${totalPages}...` : "Scroll to load more"}
            </div>
          )}
          {!hasMore && (
            <div className="text-white text-center mt-4 font-light">
              You've seen all popular {category}s.
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-screen flex items-center justify-center text-white">
      <img
        src="/computer-waiting.jpeg"
        className="h-screen w-full object-cover"
        alt="Loading placeholder"
      />
    </div>
  );
};

export default Popular;

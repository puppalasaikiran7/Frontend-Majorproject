import React, { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import { RiCloseLargeFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import axios from "../../utils/Axios";
import "../../../src/search.css";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSearch = async () => {
    if (!query.trim()) {
      setSearch([]);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearch(data.results);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch results");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      getSearch();
    }, 500); // 500ms debounce
    
    return () => clearTimeout(timer);
  }, [query]);
  
  
  return (
    <div className='h-[10vh]  relative flex  items-center justify-center md:justify-start ml-[10%] md:ml-[15%] mt-2 searchcss'>
      <IoSearch className='text-zinc-200 text-3xl hidden lg:block' />
      
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        type="text" 
        placeholder='Search Anything' 
        className='text-white w-[70%]  md:w-[50%] mx-5 p-5 text-xl font-bold tracking-wider  outline-0 bg-black border border-[rgb(255,255,255,0.2)] backdrop-blur-[25px] saturate-[200%] rounded-4xl pl-10' 
      />
      
      {query.length > 0 && (
        <RiCloseLargeFill 
          onClick={() => setQuery("")} 
          className='text-red-500 h-7 w-7 cursor-pointer' 
        />
      )}

      {(query.length > 0 && (search.length > 0 || isLoading || error)) && (
        <div className='overflow-auto overflow-x-hidden rounded-xl ml-[4%] h-[50vh] md:max-h-[45vh]  min-w-full  md:w-[80%]  text-white absolute left-[-10%] top-[110%] bg-black z-50 shadow-xl shadow-zinc-100'>
          {isLoading ? (
            <div className="p-10 text-center text-2xl font-bold text-red-500  ">  <img src="/waiting-meme.gif" alt="Loading..." className="w-[90%] h-[290px] object-contain" /> </div>
          ) : error ? (
            <div className="p-10 text-red-500">{error}</div>
          ) : search.length === 0 ? (
            <div className="p-10">No results found</div>
          ) : (
            search.map((item, index) => (
              <Link 
                key={index} 
                to={`/${item.media_type}/${item.id}`}
                className='hover:bg-zinc-900/10 p-5 md:p-10 w-[100%] font-semibold tracking-wider flex justify-start items-center border-b-2 border-zinc-100'
              >
                <img 
                  src={
                    item.backdrop_path || item.profile_path 
                      ? `https://image.tmdb.org/t/p/original/${item.backdrop_path || item.profile_path}` 
                      : "/no.gif"
                  } 
                  alt="" 
                  className=' w-[25vw] h-[15vh] rounded-md   md:w-[30vw] md:h-[35vh] object-cover mr-10 md:rounded-2xl hover:scale-110 hover:duration-400 object-center'
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/no.gif";
                  }}
                />
                <div className='w-full h-full'>
                  <h3 className="ml-10 capitalize text-xl">
                    {item.name || item.title||  item.original_title || item.original_name }
                  </h3>
                  <p className='ml-10 text-zinc-400'>{item.media_type}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Topnav;
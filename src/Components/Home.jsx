import React, { useEffect, useState, useRef } from 'react';
import Sidenav from './partials/Sidenav';
import Topnav from './partials/Topnav';
import axios from '../utils/Axios';
import Header from './partials/Header';
import LoadingSpinner from './LoadingSpinner';
import HorizontalCards from './partials/HorizontalCards';
import DropDown from './partials/DropDown';
import LoadingAnimation from './LoadingAnimation';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import LoadingAnimation2 from './LoadingAnimation2';

gsap.registerPlugin(useGSAP);

const Home = () => {
  document.title = "SCSDb | Movies";

  const [wallpapers, setWallpapers] = useState([]);
  const [currentWallpaper, setCurrentWallpaper] = useState(null);
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState({
    wallpapers: true,
    trending: true
  });
  const slideshowInterval = useRef(null);




  

  

  const getHeaderWallpapers = async () => {
    try {
      const { data } = await axios.get("trending/all/day");
      setWallpapers(data.results);
      if (data.results.length > 0) {
        setCurrentWallpaper(data.results[0]);
      }
    } catch (err) {
      console.error("Error fetching wallpapers:", err);
    } finally {
      setLoading(prev => ({ ...prev, wallpapers: false }));
    }
  };

  const getTrending = async () => {
    try {
      setLoading(prev => ({ ...prev, trending: true }));
      const { data } = await axios.get(`trending/${category}/day`);
      setTrending(data.results);
    } catch (err) {
      console.error("Error fetching trending:", err);
    } finally {
      setLoading(prev => ({ ...prev, trending: false }));
    }
  };

  useEffect(() => {
    getHeaderWallpapers();
    getTrending();
  }, []);

  useEffect(() => {
    getTrending();
  }, [category]);

  // Slideshow
  useEffect(() => {
    if (wallpapers.length > 1) {
      let currentIndex = 0;
      slideshowInterval.current = setInterval(() => {
        currentIndex = (currentIndex + 1) % wallpapers.length;
        setCurrentWallpaper(wallpapers[currentIndex]);
      }, 5000);
    }

    return () => {
      if (slideshowInterval.current) {
        clearInterval(slideshowInterval.current);
      }
    };
  }, [wallpapers]);

  

  

  if (loading.wallpapers) return <LoadingSpinner />;

  return (
    <>

        
        <div className='w-full h-screen overflow-hidden '>
          <div className='w-full h-screen flex'>
            <Sidenav />
            <div className='w-full h-full overflow-y-auto overflow-x-hidden scroll'>
              <div className='mb-20'>
                <div className='fixed z-100 w-full'>
                  <Topnav />
                </div>
              </div>

              {currentWallpaper && <Header data={currentWallpaper} />}

              <div className='flex text-white justify-between items-center p-5'>
                <div className='bg-slate-900 rounded-2xl hover:bg-slate-900 border border-white'>
                  <h1 className='text-xl md:text-6xl font-bold uppercase mix-blend-difference p-5'>trending</h1>
                </div>
                <div>
                  <DropDown
                    options={["tv", "movie", "all"]}
                    selectedValue={category}
                    func={(e) => setCategory(e.target.value)}
                    title="category"
                  />
                </div>
              </div>

              {loading.trending ? (
                <div className="text-white text-center p-10">
                  <img src="/mr-bean.gif" alt="Loading..." className="w-full h-full object-contain" />
                </div>
              ) : (
                <HorizontalCards data={trending} />
              )}
            </div>
          </div>
        </div>
        
    </>
  );
};

export default Home;

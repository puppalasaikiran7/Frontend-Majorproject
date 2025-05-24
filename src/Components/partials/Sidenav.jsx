import React from 'react'
import {Link} from "react-router-dom"
import { BsFire } from "react-icons/bs";
import { SiCodemagic } from "react-icons/si";
import { RiMovie2Fill } from "react-icons/ri";
import { IoMdFilm } from "react-icons/io";
import { FaTv } from "react-icons/fa";
import { BsFillPeopleFill  } from "react-icons/bs";
import { TiInfoLargeOutline } from "react-icons/ti";
import { PiPhoneFill  } from "react-icons/pi";
// import Shery from "sheryjs"
import { useEffect } from 'react';

const Sidenav = () => {

  // useEffect(()=>{
    
  //     Shery.makeMagnet(".magnet-target" /* Element to target.*/, {
  //       //Parameters are optional.
  //       ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  //       duration: 1,
  //     });

      

  // },[])


  return (


    <div className='w-[18%] h-max p-4 mt-5 ml-5   bg-[rgba(250,250,250,0.10)]  border border-[rgb(255,255,255,0.2)]  backdrop-blur-[16px] saturate-[180%] rounded-[10px] '>

      <h1 className='text-white font-extrabold font-[monument]  tracking-widest text-2xl flex gap-2 items-center'>
        
        <IoMdFilm className='text-white '/> 
        <span className='text-2xl   uppercase'>mvdb</span>
      
      </h1>

      <nav className='flex flex-col text-zinc-300 text-xl gap-3'>
        <h1 className='text-white font-semibold text-lg mt-5 mb-5 tracking-wider font-[gilroy] '>New Feeds</h1>

        <Link to="/trending" className='hover:bg-zinc-500/70 p-4.5 hover:text-white rounded-lg duration-400 flex gap-3.5 items-center group'>
          <BsFire className= 'magnet-target   text-orange-400 h-6 w-6 group-hover:text-orange-300 group-hover:drop-shadow-[0_0_8px_rgba(251,146,60,0.8)] transition-all duration-300'/> 
          Trending
        </Link>
        
        <Link to="/popular" className='hover:bg-zinc-500/70 p-4.5 hover:text-white rounded-lg duration-400 flex gap-3.5 items-center group'>
          <SiCodemagic className='magnet-target  text-green-400 h-6 w-6 group-hover:text-green-300 group-hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.8)] transition-all duration-300'/> 
          Popular
        </Link>
        
        <Link to='/movie' className='hover:bg-zinc-500/70 p-4.5 hover:text-white rounded-lg duration-400 flex gap-3.5 items-center group'>
          <RiMovie2Fill className='magnet-target  text-yellow-300 h-6 w-6 group-hover:text-yellow-200 group-hover:drop-shadow-[0_0_8px_rgba(253,230,138,0.8)] transition-all duration-300'/> 
          Movies
        </Link>
        
        <Link to='/tv' className='hover:bg-zinc-500/70 p-4.5 hover:text-white rounded-lg duration-400 flex gap-3.5 items-center group'>
          <FaTv className=' magnet-target  text-red-400 h-6 w-6 group-hover:text-red-300 group-hover:drop-shadow-[0_0_8px_rgba(248,113,113,0.8)] transition-all duration-300'/>
          Tv Shows
        </Link>
        
        <Link to="/person" className='hover:bg-zinc-500/70 p-4.5 hover:text-white rounded-lg duration-400 flex gap-3.5 items-center group'>
          <BsFillPeopleFill className=' magnet-target  h-6 w-6 text-sky-400 group-hover:text-sky-300 group-hover:drop-shadow-[0_0_8px_rgba(125,211,252,0.8)] transition-all duration-300'/>
          People
        </Link>
      </nav>

      <hr className='bg-zinc-600 h-[1.2px] mt-2'/>

      <nav className='flex flex-col text-zinc-300 text-xl gap-3'>
        <h1 className='text-white font-semibold text-xl mt-10 mb-5 tracking-wider'>Website Information</h1>

        <Link className='hover:bg-zinc-500/80 p-5 hover:text-white rounded-lg duration-400 flex gap-2 items-center group'>
          <TiInfoLargeOutline className=' magnet-target   text-teal-400 h-6 w-6 group-hover:text-teal-300 group-hover:drop-shadow-[0_0_8px_rgba(45,212,191,0.9)] transition-all duration-300'/>
          About SCSDB
        </Link>
        
        <Link className='hover:bg-zinc-500/80 p-5 hover:text-white rounded-lg duration-400 flex gap-2 items-center group'>
          <PiPhoneFill className=' magnet-target  text-blue-600 h-6 w-6 group-hover:text-blue-400  group-hover:drop-shadow-[0_0_11px_rgba(45,212,191,0.9)] transition-all duration-300'/>
          Contact Us
        </Link>          
      </nav>
    </div>
    
  )
}

export default Sidenav
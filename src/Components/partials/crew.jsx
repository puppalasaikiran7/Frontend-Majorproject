import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import noimage from '../../../public/noimage.jpg' // Add a default profile image
import { useEffect } from 'react'
import VanillaTilt from 'vanilla-tilt';

const Crew = ({ title }) => {

    const {pathname}= useLocation()
    const category = pathname.includes('tv') ? 'tv' : 'movie'
    const { info } = useSelector((state) => state[category])
    
    console.log(info)
    
    if (!info?.credits || !Array.isArray(info.credits) || info.credits.length == 0) {
        return (
            <div className="text-center py-10">
                <p className="text-white text-4xl font-bold ">No crew information available</p>
            </div>
        )
    }
useEffect(() => {
    const tiltElements = document.querySelectorAll('.tilt-card');
    VanillaTilt.init(tiltElements, {
        max: 15,
        speed: 500,
        glare: true,
        "max-glare": 0.3,
        reverse: true,
        scale: 1
    });

    return () => {
        tiltElements.forEach(el => {
            if (el.vanillaTilt) {
                el.vanillaTilt.destroy();
            }
        });
    };
}, []);


    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 overflow-hidden " >
            {/* Horizontal scrolling container */}
              <div className="relative ">
                <div className="flex space-x-6 pb-6 overflow-x-auto scrollbar-hide ">
                    {info.credits.map((person) => (
                        <Link 
                            key={`${person.id}-${person.credit_id}`} 
                            to={`/${title}/${person.id}`}
                            className="flex-shrink-0 w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px] group transition-transform duration-200 hover:scale-105 hover:rounded-2xl"
                        >
                            <div className='h-[200px] sm:h-[250px] md:h-[280px] w-full relative tilt-card  rounded-xl' >
                                <img 
                                    src={ person.profile_path ? `https://image.tmdb.org/t/p/original/${person.profile_path}`: noimage} 
                                    alt={person.name} 
                                    className='h-full w-full rounded-xl object-cover group-hover:opacity-90'
                                    onError={(e) => {
                                        e.target.src = defaultProfile
                                    }}
                                />
                                <div className='bg-gradient-to-t from-black/80 to-transparent text-white absolute bottom-0 w-full h-[30%] flex flex-col justify-end p-2 sm:p-3 rounded-b-xl'>
                                    <h1 className='font-bold text-sm sm:text-base truncate'>{person.name}</h1>
                                    <p className='text-xs sm:text-sm opacity-80 truncate'>
                                        {person.character || 'Unknown character'}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Crew
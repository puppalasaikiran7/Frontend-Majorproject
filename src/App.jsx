import React, { useEffect, useRef, useState } from 'react';
import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Trending from './Components/Trending';
import Popular from './Components/Popular';
import Movie from './Components/Movie';
import Tvshows from './Components/Tvshows';
import People from './Components/People';
import Moviedetail from './Components/partials/Moviedetail';
import Tvdetails from './Components/partials/Tvdetails';
import Peopledetails from './Components/partials/Peopledetails';
import Trailer from './Components/partials/Trailer';
import Notfound from './Components/Notfound';
import Customcursor from './Components/Customcursor';
import LoadingAnimation from './Components/LoadingAnimation';
import gsap from "gsap"
import LoadingAnimation2 from './Components/LoadingAnimation2';
import { useGSAP } from '@gsap/react';

const App = () => {

const [showLoading, setShowLoading] = useState(true);




const handleLoadingComplete = () => {
    setShowLoading(false);
    
  };
  

  return (
    <>
    


      { showLoading ? (<div  className='h-full w-full bg-black'>
                  <LoadingAnimation2 onComplete={handleLoadingComplete} />
          </div>
        ) : (

          <div className='App'>
            <div className='w-full min-h-screen font-[gilroy]'>
              <Customcursor />
              
      
              
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/trending' element={<Trending />} />
                  <Route path='/popular' element={<Popular />} />
                  <Route path='/movie' element={<Movie />} />
                  <Route path='/movie/:id' element={<Moviedetail />}>
                    <Route path='/movie/:id/trailer' element={<Trailer />} />
                  </Route>
                  <Route path='/tv' element={<Tvshows />} />
                  <Route path='/tv/:id' element={<Tvdetails />}>
                    <Route path='/tv/:id/trailer' element={<Trailer />} />
                  </Route>
                  <Route path='/person' element={<People />} />
                  <Route path='/person/:id' element={<Peopledetails />} />
                  <Route path='*' element={<Notfound />} />
                </Routes>
              
            </div>
          </div>
        )
    }
  </>

  );
};

export default App;

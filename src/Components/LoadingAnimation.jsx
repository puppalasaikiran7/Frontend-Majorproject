import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
gsap.registerPlugin(Physics2DPlugin);

import intro from "../../public/intro.mp4";
import { FaArrowDownLong } from "react-icons/fa6";

// Image imports
import batman from "../../public/batman.jpg";
import big6 from "../../public/big6hero.webp";
import blackpanther from "../../public/blackpanther.jpg";
import captain from "../../public/CaptainAmericaTheFirstAvenger.webp";
import cars from "../../public/cars.jpg";
import coco from "../../public/coco.jpg";
import dune from "../../public/dune.jpg";
import lalaland from "../../public/lalaland.jpg";
import dune2 from "../../public/dune2.webp";
import jurassic from "../../public/jurassic.webp";
import monsterinc from "../../public/monsterinc.webp";
import monsteruniversity from "../../public/monsteruniversity.webp";
import fightclub from "../../public/fightclub.avif";
import inception from "../../public/inception.jpg";
import nowyouseeme from "../../public/nowyouseeme.jpg";
import oppenheimer from "../../public/oppenheimer.jpg";
import rocky from "../../public/rocky.jpg";
import rocky3 from "../../public/rocky3.jpg";
import thor from "../../public/thor.jpg";
import topgun from "../../public/topgun.jpg";
import up from "../../public/up.jpg";
import walle from "../../public/walle.jpeg";
import incrediblehulk from "../../public/incrediblehulk.jpg";
import incredible from "../../public/incredible.jpg";
import ironman from "../../public/ironman.jpg";
import avatarthelastairbender from "../../public/avatarthelastairbender.jpg";
import civilwar from "../../public/civilwar.jpeg";
import whatif from "../../public/whatif.jpeg";
import moonknight from "../../public/moonknight.webp";
import ben10 from "../../public/ben10.jpg";
import berlin from "../../public/berlin.jpg";
import breakingbad from "../../public/breakingbad.jpg";
import creed from "../../public/creed.jpg";
import daredevil from "../../public/daredevil.jpg";
import loki from "../../public/loki.jpeg";
import manofsteel from "../../public/manofsteel.jpeg";
import flash from "../../public/flash.jpg";
import friendlyspiderman from "../../public/friendlyspiderman.jpg";
import ghosted from "../../public/ghosted.jpg";
import hawkeye from "../../public/hawkeye.jpg";
import howimetyourmother from "../../public/howimetyourmother.jpg";
import infinitywar from "../../public/infinitywar.jpg";
import jujutsu from "../../public/jujutsu.jpg";
import lastofus from "../../public/lastofus.jpg";
import lockandkey from "../../public/lockandkey.jpg";
import lucy from "../../public/lucy.jpg";
import naruto from "../../public/naruto.jpg";
import peacemaker from "../../public/peacemaker.jpg";
import peaky from "../../public/peaky.jpg";
import spidermanmiles from "../../public/spidermanmiles.jpg";
import strangerthings from "../../public/strangerthings.jpg";
import suits from "../../public/suits.jpg";
import theboys from "../../public/theboys.jpg";
import uncharted from "../../public/uncharted.jpg";
import wanda from "../../public/wanda.jpg";
import xmen from "../../public/xmen.jpg";
import goodgirlguide from "../../public/goodgirlguide.jpeg";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const LoadingAnimation = ({ onComplete }) => {
  const containerRef = useRef();
  const videoRef = useRef();
  const imageRefs = useRef([]);
  const [started, setStarted] = useState(false);
  
  
  
  

  const images = [
    { name: "incrediblehulk", imageurl: incrediblehulk },
    { name: "avatarthelastairbender", imageurl: avatarthelastairbender },
    { name: "batman", imageurl: batman },
    { name: "ironman", imageurl: ironman },
    { name: "incredible", imageurl: incredible },
    { name: "walle", imageurl: walle },
    { name: "up", imageurl: up },
    { name: "topgun", imageurl: topgun },
    { name: "thor", imageurl: thor },
    { name: "rocky3", imageurl: rocky3 },
    { name: "rocky", imageurl: rocky },
    { name: "oppenheimer", imageurl: oppenheimer },
    { name: "nowyouseeme", imageurl: nowyouseeme },
    { name: "inception", imageurl: inception },
    { name: "fightclub", imageurl: fightclub },
    { name: "monsteruniversity", imageurl: monsteruniversity },
    { name: "monsterinc", imageurl: monsterinc },
    { name: "jurassic", imageurl: jurassic },
    { name: "dune2", imageurl: dune2 },
    { name: "lalaland", imageurl: lalaland },
    { name: "dune", imageurl: dune },
    { name: "coco", imageurl: coco },
    { name: "cars", imageurl: cars },
    { name: "captain", imageurl: captain },
    { name: "blackpanther", imageurl: blackpanther },
    { name: "big6", imageurl: big6 },
    { name: "civilwar", imageurl: civilwar },
    { name: "whatif", imageurl: whatif },
    { name: "moonknight", imageurl: moonknight },
    { name: "ben10", imageurl: ben10 },
    { name: "berlin", imageurl: berlin },
    { name: "breakingbad", imageurl: breakingbad },
    { name: "creed", imageurl: creed },
    { name: "daredevil", imageurl: daredevil },
    { name: "loki", imageurl: loki },
    { name: "manofsteel", imageurl: manofsteel },
    { name: "flash", imageurl: flash },
    { name: "friendlyspiderman", imageurl: friendlyspiderman },
    { name: "ghosted", imageurl: ghosted },
    { name: "hawkeye", imageurl: hawkeye },
    { name: "howimetyourmother", imageurl: howimetyourmother },
    { name: "infinitywar", imageurl: infinitywar },
    { name: "jujutsu", imageurl: jujutsu },
    { name: "lastofus", imageurl: lastofus },
    { name: "lockandkey", imageurl: lockandkey },
    { name: "lucy", imageurl: lucy },
    { name: "naruto", imageurl: naruto },
    { name: "peacemaker", imageurl: peacemaker },
    { name: "peaky", imageurl: peaky },
    { name: "spidermanmiles", imageurl: spidermanmiles },
    { name: "strangerthings", imageurl: strangerthings },
    { name: "suits", imageurl: suits },
    { name: "theboys", imageurl: theboys },
    { name: "uncharted", imageurl: uncharted },
    { name: "wanda", imageurl: wanda },
    { name: "xmen", imageurl: xmen },
    { name: "goodgirlguide", imageurl: goodgirlguide },
  ];

  

  
  

  const handleStart = () => {

    
    console.log("clicked")

    const tl = gsap.timeline()

    imageRefs.current.forEach((img) => {
      if (!img) return;
      tl.to(img, {
        duration: 2,
        physics2D: {
          velocity: Math.random() * 300 + 200,  
          angle: Math.random() * 360,
          gravity: 600,
        },
        scale: 0.3,
        opacity: 0,
        delay: Math.random() * 0.3,
        ease: "power2.out",
        delay : Math.random()*0.3
      },0);
    });
    
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: 1,
      onComplete : onComplete
    } );
    // setTimeout(() => setStarted(true), 1000);
  };

  // useEffect(() => {
  //   if (!started) return;

  //   const video = videoRef.current;

  //   gsap.set(video, {
  //     scale: 0.8,
  //     opacity: 0,
  //   });

  //   const tl = gsap.timeline({
  //     onComplete: () => {
  //       video.addEventListener("ended", handleVideoEnd);
  //     },
  //   });

  //   tl.to(video, {
  //     scale: 1,
  //     opacity: 1,
  //     // duration: 1,
  //     ease: "circ.inout",
  //     onStart: () => video.play(),
  //   });

  //   return () => {
  //     video.removeEventListener("ended", handleVideoEnd);
  //   };

  //   function handleVideoEnd() {
  //     gsap.to(video, {
  //       scale: 1.2,
  //       opacity: 0,
  //       duration: 0.6,
  //       ease: "circ.inout",
  //       onComplete: onComplete,
  //     });
  //   }
  // }, [started]);

  // if (!started) {
    return (
      <div className="fixed inset-0 bg-black z-[9999] overflow-hidden" ref={containerRef}>
        
        <div className="absolute inset-0 z-[100]">
          {images.map((item, index) => {
            
            
            return (
              <motion.img
                key={`img1-${index}`}
                ref={(el) => (imageRefs.current[index] = el)}
                src={item.imageurl}
                alt={item.name}
                className="absolute w-1/10 h-1/4 object-cover rounded-xl shadow-md cursor-grab "
                style={{
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                  rotation: Math.random() * 30 - 15
                }}
                drag
                dragConstraints={false}
                whileDrag={{ scale: 1.1 }}
              />
            );
          })}
        </div>


        {/* Call to Action */}
        <div className="absolute z-[100] bg-white/20 backdrop-blur-md p-10 rounded-4xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6">
          <div className="bg-green-500 p-5 rounded-xl shadow-lg border">
            <h1 className="text-black font-[monument] font-extrabold text-3xl tracking-wider uppercase text-center">
              Click Here To Experience
            </h1>
          </div>
          <motion.div 
            drag 
            dragConstraints={containerRef} 
            dragElastic={0.7} 
            whileDrag={{scale: 1.2}} 
            className="text-white text-3xl animate-bounce cursor-grab"
          >
            <FaArrowDownLong />
          </motion.div>
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-white font-[monument]  cursor-pointer text-black rounded-lg  hover:scale-110 transition-transform duration-500 font-extrabold tracking-wider text-2xl uppercase"
          >
            enter
          </button>
        </div>
      </div>
    );
  // }

  // return (
  //   <div
  //     ref={containerRef}
  //     className="fixed inset-0 bg-black z-50 flex items-center justify-center"
  //   >
  //     <video
  //       ref={videoRef}
  //       src={intro}
  //       className="w-full h-full object-cover"
  //       playsInline
  //     />
  //   </div>
  // );
};

export default LoadingAnimation;
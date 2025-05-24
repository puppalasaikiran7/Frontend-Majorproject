import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { FaDownLong } from "react-icons/fa6";


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




gsap.registerPlugin(Physics2DPlugin);

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

const MouseImageTrail = ({onComplete}) => {
  const containerRef = useRef();
  const imageIndexRef = useRef(0);
  const contentRef = useRef()

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    // Get the next image from the array
    
      const image = images[imageIndexRef.current];
      imageIndexRef.current = (imageIndexRef.current + 1) % images.length;

      const img = document.createElement("img");
      img.src = image.imageurl;
      img.style.position = "absolute";
      img.style.width = "100px";
      img.style.height = "100px";
      img.style.borderRadius = "12px";
      img.style.pointerEvents = "none"; // Ensure images don't intercept mouse events
      img.style.top = `${clientY }px`; // Center on cursor
      img.style.left = `${clientX }px`; // Center on cursor
      img.style.opacity = 0;
      img.style.zIndex = 1; // Keep below content
      containerRef.current.appendChild(img);

      gsap.fromTo(
        img,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(2)",
          onComplete: () => {
            gsap.to(img, {
              physics2D: {
                velocity: Math.random() * 100 - 50,
                angle: 250 + Math.random() * 40,
                gravity: 400,
              },
              opacity: 0,
              duration: 2,
              onComplete: () => {
                img.remove();
              },
            });
          },
        }
      );
    
  };

  const removethis = ()=>{
    gsap.to(containerRef.current,{
        opacity : 0,
        duration:1,
        onComplete : onComplete
    })
  }

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div>

        <div ref={containerRef} className="w-screen h-screen  relative overflow-hidden flex flex-col items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md relative flex flex-col items-center justify-center gap-5 p-10 rounded-4xl  ">
                <h1 className="text-white uppercase fontmonoton tracking-wider text-4xl   font-bold">
                    click here to experience
                </h1>

                <FaDownLong className="text-3xl animate-bounce text-white  "/>



                <button onClick={removethis} className=" z-[9999] transition-transform duration-500 hover:scale-110  fontcaesar uppercase text-2xl font-extrabold tracking-wider bg-white px-5 py-2 rounded-2xl ">
                    enter 
                </button>

            </div>

        </div>
    </div>
  );
};

export default MouseImageTrail;

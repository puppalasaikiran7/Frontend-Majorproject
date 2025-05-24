import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Customcursor = () => {
    const [position , setposition] = useState({x:0 , y:0})
    
    useEffect(()=>{
    
        const movecursor = (e)=>{
            
            setposition({x:e.clientX ,y:e.clientY})
        }
    
        window.addEventListener("mousemove" , movecursor)

        return ()=>{
            window.removeEventListener("mousemove" , movecursor);
        }

    }, [])


  return (
    <div style={{
        position: 'fixed',
        top : position.y,
        left : position.x,
        width : "30px",
        height : "30px",
        backgroundColor : "white",
        borderRadius: "50%",
        pointerEvents : "none",
        transform : 'translate(-50% , -50%)',
        zIndex : 99999,
        mixBlendMode :  "difference"
    }}>
      
    </div>
  )
}

export default Customcursor

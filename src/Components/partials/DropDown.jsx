import React, { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

const DropDown = ({ options, selectedValue, func , title }) => {

  
  return (
    <div className='select-container relative bg-slate-900 mb-1.5 border border-white rounded-md w-80 h-12'>
      <select 
        name="format" 
        id="format" 
        value={selectedValue} 
        onChange={func}
        className='
          absolute inset-0 w-full h-full
          bg-transparent text-white
          px-4 pr-10 cursor-pointer
          appearance-none outline-none
          font-bold text-xl
          mix-blend-difference
        '
      >
        <option value="" disabled className='bg-slate-700'>
          {title}
        </option>
        {options.map((item, index) => (
          <option 
            key={index} 
            value={item}
            className='bg-slate-700 hover:bg-slate-600 uppercase'
          >
            {item.toUpperCase()}
          </option>
        ))}
      </select>
      
      <IoMdArrowDropdown className='
        absolute right-3 top-1/2 transform -translate-y-1/2
        text-amber-100 pointer-events-none
        mix-blend-difference text-xl 
      '/>
    </div>
  );
};

export default DropDown;
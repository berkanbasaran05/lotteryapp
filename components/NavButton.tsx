import React from 'react'

interface Props  {
    title:string;
    isActive?:boolean;
    onClick?: () =>void;

}

function NavButton({ title, isActive, onClick}: Props) {
  return (
    <button 
    onClick={onClick}
    className= {` ${isActive && "bg-gray-700"} hover:bg-gray-700 rounded-lg py-2 px-4 `}>
     
     {title}
    
    </button>
  )
}

export default NavButton
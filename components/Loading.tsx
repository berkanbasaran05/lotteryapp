import React from 'react'
import { ClipLoader, DotLoader } from 'react-spinners'

function Loading() {
  return (
    <div className='bg-black h-screen w-screen items-center mx-auto justify-center flex flex-col text-white space-y-10'> 
     <p>Loading</p>
    <DotLoader color='white'/>
    
    </div>
  )
}

export default Loading
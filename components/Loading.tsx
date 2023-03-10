import Head from 'next/head'
import React from 'react'
import { ClipLoader, DotLoader } from 'react-spinners'

function Loading() {
  return (
    <div className='bg-black h-screen w-screen items-center mx-auto justify-center flex flex-col text-white space-y-10'> 
     <Head>
        <title>Lottery App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <p>Loading</p>
    <DotLoader color='white'/>
    
    </div>
  )
}

export default Loading
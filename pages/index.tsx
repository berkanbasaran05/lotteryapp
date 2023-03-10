import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import Login from '../components/Login';
import Loading from '../components/Loading';
import { useState } from 'react';
import NavButton from '../components/NavButton';


const Home: NextPage = () => {
  const address = useAddress();
  const [quantity, setquantity] = useState<number>(1);

  const {contract, isLoading} =useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);
  if (isLoading) return <Loading/>


  if (!address) return <Login/>


  return (
    <div className="bg-black min-h-screen text-white">
      <Head>
        <title>Lottery App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Header/>

      {/** The next draw box */}

      <div className='space-y-5 md:space-y-0  m-5 md:flex md:flex-row 
      items-start justify-center md:space-x-5'>
      <div className='stats-container'> 
       <h1 className='text-5xl text-white font-bold text-center'> The Next Draw</h1>
        <div className='flex justify-between p-2 space-x-2'>
         <div className='stats'>
          <h2 className='text-sm'>Total pool</h2>
          <p className='text-xl'>0.1 MATIC</p>
          </div> 
          <div className='stats'>
          <h2 className='text-sm'>Ticket Remaining</h2>
          <p className='text-xl'>100</p>
          </div> 
           {/* Countdown timer */}
        </div>     
      </div>
       
       {/** price per ticket */}
     
      <div className="stats-container flex flex-col space-y-10"> 
      <div className="stats-container"> 
       <div className='flex justify-between space-x-5 items-center text-white '>
        <h2>Price per ticket</h2>
        <p>0.01 MATIC</p>
       </div>
        
        <div className="stats flex flex-row justify-between mt-4"> 
        <h1 className='uppercase'>Tickets </h1>
        <input className='flex w-full bg-transparent  text-right outline-none'
         type='number'
         min={1}
         value={quantity}
         onChange={(e) => setquantity(Number(e.target.value))}
         />

        </div>
       
       <div className='flex flex-col space-y-1  mt-4'>
       <div className='flex flex-row justify-between'>
        <p className='text-xs italic items-center'>Total cost of tickets</p>
        <p className='text-xs'>0.999</p>
       </div>
       <div className='flex flex-row justify-between'>
        <p className='text-xs italic  items-center'>Total cost of tickets</p>
        <p className='text-xs'>0.999</p>
       </div>
       <div className='flex flex-row justify-between'>
        <p className='text-xs italic  items-center'>Total cost of tickets</p>
        <p className='text-xs'>0.999</p>
       </div>
        
       </div>
       
       <button className='p-4 mt-4 bg-gray-500 w-full rounded-lg'>Buy Ticket </button>

      </div>
    </div>
    
    
     </div>
    </div>
  )
}

export default Home

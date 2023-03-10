import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import { useAddress, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import Login from '../components/Login';
import Loading from '../components/Loading';
import { useState } from 'react';
import { ethers } from 'ethers';
import { currency } from '../constants';
import CountdownTimer from '../components/CountdownTimer';
import { toast } from 'react-hot-toast';


const Home: NextPage = () => {
  const address = useAddress();
  const [quantity, setquantity] = useState<number>(1);

  const {contract, isLoading} =useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);
  
  const { data:remaningTickets, error } = useContractRead(contract, "RemainingTickets");
  const { data:currentWiningReward, } = useContractRead(contract, "CurrentWinningReward");
  const { data:ticketPrice, } = useContractRead(contract, "ticketPrice");
  const { data:ticketCommission, } = useContractRead(contract, "ticketCommission");
  const { data:expiration, } = useContractRead(contract, "expiration");
  
  const { mutateAsync: BuyTickets} = useContractWrite(contract, "BuyTickets")

  const handleClick = async () => {
    if(!ticketPrice) return;

    const notification = toast.loading("Buying your tickets");
    
    {/* we code to buy ticket in here */}
    try {
      const data = await BuyTickets([{
    
        value :ethers.utils.parseEther((
          Number(ethers.utils.formatEther(ticketPrice)) * quantity
          ).toString()
        ),
      },
    ]);
    toast.success("Tickets purchased successfully!",
    {id:notification});
    
      
    } catch (err) {
      toast.error("Opps something went wrong :(",
      {id:notification}
      );
      
    }
  }

  if (isLoading) return <Loading/>
  if (!address) return <Login/>


  return (
    <div className="bg-black min-h-screen text-white">
      <Head>
        <title>Lottery App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex-1 '>
      <Header/>

      {/** The next draw box */}

      <div className='space-y-5 md:space-y-0  m-5 p-5  md:flex md:flex-row 
      items-start justify-center md:space-x-5'>
      <div className='stats-container space-y-5'> 
       <h1 className='text-5xl text-white font-semibold text-center'> The Next Draw</h1>
        <div className='flex justify-between p-2 space-x-2'>
         <div className='stats'>
          <h2 className='text-sm'>Total pool</h2>
          <p className='text-xl'>{currentWiningReward && ethers.utils.formatEther(currentWiningReward.toString())}{""} {currency} </p>
          </div> 
          <div className='stats'>
          <h2 className='text-sm'>Ticket Remaining</h2>
          <p className='text-xl'>{remaningTickets?.toNumber()}</p>
          </div> 
           {/* Countdown timer */}
           
        </div>   
        <CountdownTimer/>  
      </div>
       
       {/** price per ticket */}
     
      <div className="stats-container flex flex-col space-y-10s"> 
      <div className="stats-container"> 
       <div className='flex justify-between space-x-5 items-center text-white '>
        <h2>Price per ticket</h2>
        <p>{ticketPrice && ethers.utils.formatEther(ticketPrice.toString())} {""}  {currency}</p>
       </div>
        
        <div className="stats flex flex-row justify-between mt-4"> 
        <h1 className='uppercase text-sm'>Tickets </h1>
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
        <p className='text-xs'>{ticketPrice && Number(ethers.utils.formatEther(ticketPrice.toString()))* quantity} {""} {currency} </p>
       </div>
       <div className='flex flex-row justify-between'>
        <p className='text-xs italic  items-center'>Service fees</p>
        <p className='text-xs'>{ticketCommission && ethers.utils.formatEther(ticketCommission?.toString())} {""} {currency}</p>
       </div>
       <div className='flex flex-row justify-between'>
        <p className='text-xs italic  items-center'>+ Network Fees</p>
        <p className='text-xs'>TBC</p>
       </div>
        
       </div>
       
       <button onClick={handleClick} 
       disabled={expiration?.toString() < Date.now().toString() || remaningTickets?.toNumber() === 0} 
       className='p-4 mt-4 bg-gradient-to-br from-gray-800 to-gray-300
       shadow-xl w-full rounded-lg'>
        Buy {quantity} tickets for {""} {ticketPrice && Number(ethers.utils.formatEther(ticketPrice.toString())) * quantity} {""} {currency}
        
         </button>

      </div>
    </div>
    
    
     </div>
     </div>
    </div>
  )
}

export default Home

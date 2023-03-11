import React from 'react'
import NavButton from './NavButton'
import { motion } from 'framer-motion' 
import {Bars3BottomRightIcon} from '@heroicons/react/24/solid'
import { BeakerIcon } from '@heroicons/react/24/solid'
import { useAddress , useDisconnect } from '@thirdweb-dev/react'


function Header() {
  const address = useAddress();
  const disconnect = useDisconnect();

  return (
    <div className='flex flex-row justify-between items-center max-w-6xl mx-auto p-6'>
       <motion.div 
        initial={{opacity:0, x:-200}}
        whileInView={{opacity:1, x:0}}
        transition={{duration:1.5}}
      
       className='flex flex-row space-x-4'>
       <div>
            <img className='rounded-full h-14 w-14'
            src='https://avatars.githubusercontent.com/u/77754197?v=4'>
            
            </img>

        </div>
        
        <div className='flex flex-col justify-center'>
            <h1 className='text-[14px] md:text-[18px] text-white font-bold'> Berkan BASARAN</h1>
            <p className='text-[8px] md:text-[10px] text-emerald-500 truncate'> User : {address?.substring(0,5)}...
            {address?.substring(address.length, address.length - 5)}</p>
        </div>
       </motion.div>

        <motion.div initial={{opacity:0 , y:-50}} whileInView={{opacity:1,y:0}} transition={{duration:1.5}} className='hidden md:flex flex-row  space-x-10'> 
            <NavButton isActive title='Buy Tickets'/>
            <NavButton onClick={disconnect}   title='Logout'/>
        </motion.div>
      

      <motion.div initial={{opacity:0 , x:50}} whileInView={{opacity:1, x:0}} transition={{duration:1.5}}>
        <div className='flex md:hidden flex-col ml-auto text-right items-center'>
            <Bars3BottomRightIcon className='w-8 h-8'/>
            <span className='text-xs md:hidden'>
                <NavButton onClick={disconnect} title='Logout'/>
            
            </span>
            </div>
        </motion.div>
           
    </div>
  )
}

export default Header
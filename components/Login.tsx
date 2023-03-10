import { useMetamask } from '@thirdweb-dev/react'
import React from 'react'
import NavButton from './NavButton'
import { SocialIcon } from 'react-social-icons'
import {useTypewriter} from 'react-simple-typewriter'
function Login() {
    const connectWithMetamask = useMetamask();
    const [text,count] = useTypewriter({
      words:['META LOTTERY'],
      delaySpeed:2000,
      
    });
    const [textdesc,counttext] = useTypewriter({
      words:['You have to login with Metamask!'],
      delaySpeed:2000,
      loop:true
    })
  return (
    <div className='bg-black h-screen w-screen items-center mx-auto justify-center flex flex-col'>

        <div className='flex flex-col items-center space-y-5'>
         <h5 className='uppercase tracking-[10px] text-white md:text-[60px] text-[30px] '> {text}</h5>
          
         <h1 className='text-white items-center'>{textdesc}</h1>
         <button className='text-white flex flex-row   bg-gray-600 p-4 rounded-lg' onClick={connectWithMetamask}>Login with Metamask 
         <img className='w-6 h-6 ml-2' src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png'></img> 
         </button>
         

        </div>


    </div>
  )
}

export default Login
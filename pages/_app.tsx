import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThirdwebProvider, useContract } from "@thirdweb-dev/react";


function MyApp({ Component, pageProps }: AppProps) {
  return (
  <ThirdwebProvider activeChain='mumbai'>
     <Component {...pageProps} />
     </ThirdwebProvider>
  );
}

export default MyApp

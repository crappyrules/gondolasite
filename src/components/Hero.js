import React from 'react'
import chart from '../assets/chart.png'
import header from '../assets/header.png'
import grassbg from '../assets/grassbg.png'
import gondohero from '../assets/gondohero.png'
import gondohero2 from '../assets/gondohero2.png'
import buynow from '../assets/buynow.png'
import CA from '../assets/CA.png'
import standgondola from '../assets/standgondola.png'
import gondolaleg from '../assets/gondolaleg.png'
import standongondola from '../assets/standongondola.png'
import ordinarygondola from '../assets/ordinarygondola.png'
import awkwardgondola from '../assets/awkwardgondola.png'
//import roll1 from '../assets/roll1.svg'
import roll2 from '../assets/roll2.svg'
import hairdola from '../assets/hairdola.png'
import skydola from '../assets/skydola.png'
import capdola from '../assets/capdola.png'
import legupdola from '../assets/legupdola.png'
import snabdola from '../assets/snabdola.png'

import Header from '../components/Header'
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';
import Ca from './Ca'

function Hero() {
    return (
        <div className='mainhero overflow-hidden flex flex-col lg:justify-center justify-start items-center relative pt-20d lg:min-h-screen, pt-20 lg:pb-10 pb-0 '>
            

            <Header />
            {/* <img src={header} alt="" className='z-20 w-96' /> */}

            <div className='absolutes'>
                <Bounce>
                    <img src={gondolaleg} alt="" className='absolute w-40 lg:w-[600px] left-0 top-20 max-w-none' />
                </Bounce>
                <img src={ordinarygondola} alt="" className='transition-transform duration-200 ease-in-out transform hover:scale-95 active:scale-90 absolute z-[19] w-12 lg:w-[220px] right-0 bottom-0 lg:-right-10 lg:bottom-96 max-w-none' />

                <img src={awkwardgondola} alt="" className='transition-transform duration-200 ease-in-out transform hover:scale-95 active:scale-90 absolute z-[19] w-12 lg:w-[100px] right-16 -bottom-10 lg:right-52 lg:bottom-40 max-w-none' />
            </div>


            <div className="hero flex flex-col justify-center items-center relative w-fit border-2d">
                <img src={skydola} alt="" className='animate-bounce transition-transform duration-200 ease-in-out transform hover:scale-95 active:scale-90 absolute z-[1] w-16 lg:w-[200px] left-52 -top-20 lg:left-[35%] lg:-top-16 max-w-none' />
                {/* <img src={hairdola} alt="" className='transition-transform duration-200 ease-in-out transform hover:scale-95 active:scale-90 absolute z-[1] w-16 lg:w-[250px] right-60  -top-16 lg:right-80 lg:-top-32 max-w-none' /> */}
                <img src={standongondola} alt="" className='transition-transform duration-200 ease-in-out transform hover:scale-95 active:scale-90 absolute z-[1] w-12 lg:w-[150px] right-5 -top-10 lg:right-24 lg:-top-16 max-w-none' />
                <Bounce>

                    {/* <img src={gondohero} alt="" className='z-20 w-10/12 lg:mt-20 lg:-mb-20' /> */}
                    <img src={gondohero2} alt="" className=' z-20 w-10/12 lg:mt-20 lg:-mb-20' />
                </Bounce>

            </div>

            <img src={capdola} alt="" className=' transition-transform duration-200 ease-in-out transform hover:scale-95 active:scale-90 absolute z-[1] w-16 lg:w-[200px] left-20 bottom-0 lg:left-[15%] lg:bottom-0 max-w-none' />

            <img src={legupdola} alt="" className='transition-transform duration-200 ease-in-out transform hover:scale-95 active:scale-90 absolute z-[1] w-[150px]   bottom-0 hidden lg:flex  right-[20%] lg:bottom-0 max-w-none' />

            <img src={snabdola} alt="" className='transition-transform duration-200 ease-in-out transform hover:scale-95 active:scale-90 absolute z-[1] w-[150px]   bottom-0 hidden lg:flex  right-[0%] lg:bottom-10 max-w-none' />

            <div className='z-20 flex flex-row justify-center items-center'>
                <a href="https://app.uniswap.org/explore/tokens/ethereum/0xd43fba1f38d9b306aeef9d78ad177d51ef802b46" target="_blank" rel="noopener noreferrer">
                    <img src={buynow} alt="" className='z-20 w-52 lg:w-72 p-2 transition-transform duration-200 ease-in-out transform hover:scale-95 active:scale-90 ' />
                </a>
                <a href="https://www.dextools.io/app/en/token/gondola" target="_blank" rel="noopener noreferrer">
                    <img src={chart} alt="" className='z-20 w-52 lg:w-72 p-2 transition-transform duration-200 ease-in-out transform hover:scale-95 active:scale-90' />
                </a>
            </div>
            <Ca />
            <img src={standgondola} alt="" className='w-20 lg:w-60 a absolute  justify-end bottom-0 -mb-10 move-left-right' />
        </div>
    )
}

export default Hero
import React from 'react'
import tgheader from '../assets/tgheader.svg'
import menuheader from '../assets/menuheader.svg'
import dextheader from '../assets/dextheader.svg'
import cgheader from '../assets/cgheader.svg'
import xheader from '../assets/xheader.svg'

function Header() {
    return (
        <div className='z-40 mb-20 -mt-10 lg:mt-0 lg:mb-16 rounded-full flex flex-row justify-center items-center bg-[#FEFEFE]/40 .backdrop-blur-sm w-11/12 lg:w-96'>
            <a href="https://t.me/GondolaCTO" target="_blank" rel="noopener noreferrer">
                <img src={tgheader} alt="" className='m-2 w-9 transition-transform duration-200 ease-in-out transform hover:scale-95 active:scale-90' />
            </a>

            <a href="https://www.dextools.io/app/en/token/gondola" target="_blank" rel="noopener noreferrer">
                <img src={dextheader} alt="" className='m-2 w-9 transition-transform duration-200 ease-in-out transform hover:scale-95 active:scale-90' />
            </a>


            <img src={menuheader} alt="" className='m-2 w-14 transition-transform duration-200 ease-in-out transform hover:scale-95 active:scale-90' />

            <a href="https://www.coingecko.com/en/coins/gondola" target="_blank" rel="noopener noreferrer">
                <img src={cgheader} alt="" className='m-2 w-9 transition-transform duration-200 ease-in-out transform hover:scale-95 active:scale-90' />
            </a>

            <a href="https://x.com/GondolaCTO" target="_blank" rel="noopener noreferrer">
                <img src={xheader} alt="" className='m-2 w-9 transition-transform duration-200 ease-in-out transform hover:scale-95 active:scale-90' />
            </a>
        </div>
    )
}

export default Header
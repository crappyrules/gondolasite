import React from 'react'
import cmc from '../assets/cmc.svg'
import coingecko from '../assets/coingecko.svg'
import dextools from '../assets/dextools.svg'
import telegram from '../assets/telegram.svg'
import tiktok from '../assets/tiktok.svg'
import twitter from '../assets/twitter.svg'
import linkhalfbox from '../assets/linkhalfbox.svg'
import linkhalfboxmobile from '../assets/linkhalfboxmobile.svg'
import mountaingondola from '../assets/mountaingondola.png'
import Fade from 'react-reveal/Fade';

function Link() {
    return (
        <div className=' mt-10 lg:mt-24 relative  linkbg bg-[#C3FCF1] rounded-[55px] p-5 my-10 border-4 border-black overflow-clip m-4'>

            {/* <img src={linkhalfbox} className='absolute -left-5' alt="" /> */}


            <div className="total flex flex-col lg:flex-row justify-center items-center">
                <img src={linkhalfbox} className='absolutee -ml-10 -left-5 hidden lg:flex' alt="" />
                <img src={linkhalfboxmobile} className='absolutee w-60 -mt-5 -left-5 lg:hidden flex' alt="" />
                <div className="left">
                    <Fade cascade big >
                        <div className="elite p-3 top flex flex-row justify-center items-center">
                            <Fade cascade big >

                                <a href="https://www.coingecko.com/en/coins/gondola" target="_blank" rel="noopener noreferrer">
                                    <img src={coingecko} alt="" className='w-28 lg:w-60 p-1 ' />
                                </a>

                                <a href="https://tiktok.com/@gondolacto" target="_blank" rel="noopener noreferrer">
                                    <img src={tiktok} alt="" className='w-28 lg:w-60 p-1 ' />
                                </a>

                                <a href="https://x.com/GondolaCTO" target="_blank" rel="noopener noreferrer">
                                    <img src={twitter} alt="" className='w-28 lg:w-60 p-1 ' />
                                </a>

                            </Fade>
                        </div>

                        <div className="elite p-3 top flex flex-row justify-center items-center">

                            <Fade cascade big >
                                <a href="https://coinmarketcap.com/currencies/gondola/" target="_blank" rel="noopener noreferrer">
                                    <img src={cmc} alt="" className='w-28 lg:w-60 p-1 ' />
                                </a>

                                <a href="https://www.dextools.io/app/en/token/gondola" target="_blank" rel="noopener noreferrer">
                                    <img src={dextools} alt="" className='w-28 lg:w-60 p-1 ' />
                                </a>

                                <a href="https://t.me/GondolaCTO" target="_blank" rel="noopener noreferrer">
                                    <img src={telegram} alt="" className='w-28 lg:w-60 p-1 ' />
                                </a>
                            </Fade>

                        </div>
                    </Fade>

                </div>
                <div className="right flex justify-center items-center">
                    <img src={mountaingondola} alt="" className='w-11/12 lg:w-[410px] ' />

                </div>
            </div>
        </div>
    )
}

export default Link
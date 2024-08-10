import React from 'react'
import joinbg from '../assets/joinbg.png'
import joincommunity from '../assets/joincommunity.png'
import xround from '../assets/xround.svg'
import tiktokround from '../assets/tiktokround.svg'
import tground from '../assets/tground.svg'
import redditround from '../assets/redditround.svg'
import Fade from 'react-reveal/Fade';

function Join() {
    return (
        <div className='flex flex-col justify-center items-center lg:items-end joinbg w-full lg:h-[150vh]'>
            <div className="them flex flex-col justify-center items-center mt-60 my-20 lg:mt-40 lg:mr-20">
                <Fade cascade right >
                    <img src={joincommunity} className='w-96 lg:w-[900px] ' alt="" />

                </Fade>
                <Fade cascade left >

                    <div className="socials flex flex-row justify-center items-center">
                        <a href="https://tiktok.com/@gondolacto" target="_blank" rel="noopener noreferrer">

                            <img src={tiktokround} className='w-14 lg:w-20 mx-3 lg:mx-6 my-4 transition-transform duration-200 ease-in-out transform hover:scale-95 active:scale-90 ' alt="" />
                        </a>

                        <a href="https://t.me/GondolaCTO" target="_blank" rel="noopener noreferrer">

                            <img src={tground} className='w-14 lg:w-20 mx-3 lg:mx-6 my-4 transition-transform duration-200 ease-in-out transform hover:scale-95 active:scale-90 ' alt="" />
                        </a>

                        <a href="https://x.com/GondolaCTO" target="_blank" rel="noopener noreferrer">

                            <img src={xround} className='w-14 lg:w-20 mx-3 lg:mx-6 my-4 transition-transform duration-200 ease-in-out transform hover:scale-95 active:scale-90 ' alt="" />
                        </a>

                        <a href="https://www.reddit.com/r/Gondola/" target="_blank" rel="noopener noreferrer">

                            <img src={redditround} className='w-14 lg:w-20 mx-3 lg:mx-6 my-4 transition-transform duration-200 ease-in-out transform hover:scale-95 active:scale-90 ' alt="" />
                        </a>
                    </div>
                </Fade>

            </div>
        </div>
    )
}

export default Join
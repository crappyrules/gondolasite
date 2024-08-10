import React from 'react'
import whatis from '../assets/whatis.svg'
import whatismobile from '../assets/whatismobile.svg'
import gondolaabout from '../assets/gondolaabout.png'
import gondolaaboutmobile from '../assets/gondolaaboutmobile.png'
import miniscarfdola from '../assets/miniscarfdola.png'

import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';
import Video from './Video'

function What() {
    return (
        <div id='about' className='flex flex-col justify-center items-center p-5 noise2 relative lg:pb-20'>

            <Bounce left>

                <img src={miniscarfdola} alt="" className='w-96 absolute -top-20  right-0 ' />
            </Bounce>
            <Bounce right>

                <img src={whatis} alt="" className='w-11/12 hidden lg:flex mb-3 z-10' />
            </Bounce>

            <img src={whatismobile} alt="" className='w-10/12 lg:hidden flex mb-3 z-10' />
            <img src={gondolaaboutmobile} alt="" className='lg:hidden flex mb-3 z-10' />
            <div className="aboutt relative flex justify-center items-center">
                <img src={gondolaabout} alt="" className='hidden lg:flex z-10' />
                <Video />
            </div>



            <p className='comic text-center text-xl flex lg:hidden'>
                Gondolas are relaxed, harmless, and innocent creatures created by internet denizens searching for a thoughtful being to represent them. Known as ‘Silent Observers’, they rarely interfere or talk, preferring the calming silence of the environments they inhabit. Having no hands, they embody the Taoist principle of ‘Wu Wei’ (non-action), while their comforting expression shows their complete and utter acceptance of the world as it is. With over 10 years of original memes crafted by a cult community, GONDOLA stands as a symbol of peaceful contemplation, nature, and the inner nature of our world.
                Join us, and let's observe together Gondola’s journey.
            </p>
        </div>
    )
}

export default What
import React from 'react'
import whalephoto from '../assets/whalephoto.png'
import Fade from 'react-reveal/Fade';

function Theblack() {
    return (
        <div className='flex flex-col justify-center items-center bg-[#0C0608] p-4 py-20'>
            <img src={whalephoto} alt="" className='lg:w-10/12 -mb-32 lg:mb-0s z-50' />
        </div>
    )
}

export default Theblack
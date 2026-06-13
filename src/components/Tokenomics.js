import React from 'react'
import tokenomics from '../assets/tokenomics.webp'
import supply from '../assets/supply.webp'
import liq from '../assets/liq.webp'
import taxes from '../assets/taxes.webp'
import contractrev from '../assets/contractrev.webp'
import ca2 from '../assets/ca2.webp'
import Fade from 'react-reveal/Fade';

function Tokenomics() {
    return (
        <div id='tokenomics' className='flex flex-col justify-center items-center bg-[#B3E7FE] w-full py-20'>
            <Fade cascade big >

                <img src={tokenomics} alt="" className='w-9/12' loading="lazy" decoding="async" />
            </Fade>

            <div className=' flex flex-col lg:flex-row justify-center items-center'>
                <Fade cascade big >
                    <img src={taxes} alt="" className='p-2  lg:w-80 w-96 ' loading="lazy" decoding="async" />
                    <img src={liq} alt="" className='p-2  lg:w-80 w-96 ' loading="lazy" decoding="async" />
                    <img src={supply} alt="" className='p-2  lg:w-80 w-96 ' loading="lazy" decoding="async" />
                    <img src={contractrev} alt="" className='p-2  lg:w-80 w-96 ' loading="lazy" decoding="async" />
                </Fade>
            </div>
            {/* <img src={ca2} alt="" className='p-2 lg:w-10/12' /> */}
        </div>
    )
}

export default Tokenomics
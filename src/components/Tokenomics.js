import React from 'react'
import tokenomics from '../assets/tokenomics.png'
import supply from '../assets/supply.png'
import liq from '../assets/liq.png'
import taxes from '../assets/taxes.png'
import contractrev from '../assets/contractrev.png'
import ca2 from '../assets/ca2.png'
import Fade from 'react-reveal/Fade';

function Tokenomics() {
    return (
        <div id='tokenomics' className='flex flex-col justify-center items-center bg-[#B3E7FE] w-full py-20'>
            <Fade cascade big >

                <img src={tokenomics} alt="" className='w-9/12' />
            </Fade>

            <div className=' flex flex-col lg:flex-row justify-center items-center'>
                <Fade cascade big >
                    <img src={taxes} alt="" className='p-2  lg:w-80 w-96 ' />
                    <img src={liq} alt="" className='p-2  lg:w-80 w-96 ' />
                    <img src={supply} alt="" className='p-2  lg:w-80 w-96 ' />
                    <img src={contractrev} alt="" className='p-2  lg:w-80 w-96 ' />
                </Fade>
            </div>
            {/* <img src={ca2} alt="" className='p-2 lg:w-10/12' /> */}
        </div>
    )
}

export default Tokenomics
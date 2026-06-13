import React from 'react'
import howtobuy from '../assets/howtobuy.webp'
import sittingdola from '../assets/sittingdola.webp'
import step2 from '../assets/step2.webp'
import step1 from '../assets/step1.webp'
import rollblurr from '../assets/rollblurr.webp'
import lilcloud from '../assets/lilcloud.webp'
import maxiscarfdola from '../assets/maxiscarfdola.webp'
import awkwardgondola from '../assets/awkwardgondola.webp'
import ordinarygondola from '../assets/ordinarygondola.webp'
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';

function Howto() {
    return (
        <div id='howto' className='flex flex-col items-center justify-center howto relative pt-20'>

            <div className="thing relative flex flex-col justify-center items-center w-full">
                <Fade cascade big >

                    <img src={howtobuy} alt="" className='w-8/12 z-20' loading="lazy" decoding="async" />
                </Fade>
                <img src={rollblurr} alt="" className='  absolute wf z-[12]' loading="lazy" decoding="async" />
            </div>

            <div className="total flex flex-col lg:flex-row justify-center items-center">
                <div className="left z-20">
                    <Fade left cascade >

                        <img src={step1} alt="" className='w-[600px] p-2 z-20 ' loading="lazy" decoding="async" />
                        <img src={step2} alt="" className='w-[600px] p-2 z-20 ' loading="lazy" decoding="async" />
                    </Fade>
                </div>
                <div className="right z-20">
                    <Fade right cascade >  
                        <iframe
                            className='w-[400px] h-[680px] p-4'
                            src="https://flooz.xyz/embed/trade?swapDisabled=false&swapNetwork=eth&swapToTokenAddress=0xd43fbA1f38d9B306AEEF9d78aD177d51Ef802B46&swapLockToToken=true&onRampDisabled=false&onRampNetwork=eth&onRampAsDefault=true&onRampTokenAddress=0xd43fbA1f38d9B306AEEF9d78aD177d51Ef802B46&onRampLockToken=true&network=eth&lightMode=true&backgroundColor=transparent&miniApp=false&miniappIntent=swap"
                            loading="lazy"
                            allowFullScreen
                            title="Flooz trade widget"
                        ></iframe>
                    </Fade>
                </div>
            </div>

            <img src={lilcloud} alt="" className='absolute right-0 lg:right-0 w-40 lg:w-[500px] top-0 z-[11]' loading="lazy" decoding="async" />
            <Bounce bottom>

                <div className='flex absolute  -top-10 lg:-top-[300px]'>
                    <img src={maxiscarfdola} alt="" className='   w-72 lg:w-[850px] z-[10] animate-pulse' loading="lazy" decoding="async" />
                </div>
            </Bounce>
            <img src={awkwardgondola} alt="" className='absolute right-0 lg:right-10 w-10 lg:w-32 z-40' loading="lazy" decoding="async" />
            <img src={ordinarygondola} alt="" className='absolute right-10 w-10 lg:w-40 bottom-40 rotate-12' loading="lazy" decoding="async" />
        </div>
    )
}

export default Howto
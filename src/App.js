import roll2 from './assets/roll2.svg'
import pinkblur from './assets/pinkblur.webp'
import pinkblur2 from './assets/pinkblur2.webp'
import Hero from './components/Hero'
import Link from './components/Link'
import Buy from './components/Buy'
import What from './components/What'
import Howto from './components/Howto'
import Tokenomics from './components/Tokenomics'
import Gallery from './components/Gallery'
import Theblack from './components/Theblack'
import Footer from './components/Footer'
import Join from './components/Join'
import blockspotImage from './assets/blockspot.webp'

function App() {
  return (
    <div className="App flex flex-col justify-center items-center overflow-clip">

      <Hero />
      <img src={roll2} alt="" className=' moving-image z-20 w-[1500px]  lg:w-[3000px] max-w-none lg:-mt-28 -mt-14 -mb-14 lg:-mb-32' />

      <div className="noise w-full flex flex-col justify-center items-center ">
        <Link />
        <div className="flex flex-col items-center space-y-4">
          <p className="font-bold text-black text-lg">
            Now listed at Blockspot.io
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <a href="https://blockspot.io/coin/gondola/" target="_blank" rel="noopener noreferrer">
              <img 
                src={blockspotImage} 
                alt="Gondola on Blockspot" 
                className="w-full max-w-[300px] rounded-lg"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>
        </div>
        <Buy />
      </div>
      <What />
      <Howto />
      <Tokenomics />

      <Gallery />
      <Theblack />

      <Join />
      <div>
        <img src={pinkblur} alt="" className='z-20 w-[1500px]  lg:w-[3000px] max-w-none lg:-mt-72 -mt-52 hidden lg:flex -mb-96' loading="lazy" decoding="async" />
        <img src={pinkblur2} alt="" className='z-20 w-[100vw]  max-w-none lg:-mt-72 -mt-24 lg:hidden flex -mb-96' loading="lazy" decoding="async" />
      </div>

      <Footer />

    </div>
  );
}

export default App;

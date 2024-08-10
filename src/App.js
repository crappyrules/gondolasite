import roll2 from './assets/roll2.svg'
import pinkblur from './assets/pinkblur.png'
import pinkblur2 from './assets/pinkblur2.png'
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

function App() {
  return (
    <div className="App flex flex-col justify-center items-center overflow-clip">

      <Hero />
      <img src={roll2} alt="" className=' moving-image z-20 w-[1500px]  lg:w-[3000px] max-w-none lg:-mt-28 -mt-14 -mb-14 lg:-mb-32' />

      <div className="noise w-full flex flex-col justify-center items-center ">
        <Link />
        <Buy />
      </div>
      <What />
      <Howto />
      <Tokenomics />

      <Gallery />
      <Theblack />

      <Join />
      <div>
        <img src={pinkblur} alt="" className='z-20 w-[1500px]  lg:w-[3000px] max-w-none lg:-mt-72 -mt-52 hidden lg:flex -mb-96' />
        <img src={pinkblur2} alt="" className='z-20 w-[100vw]  max-w-none lg:-mt-72 -mt-24 lg:hidden flex -mb-96' />
      </div>

      <Footer />

    </div>
  );
}

export default App;

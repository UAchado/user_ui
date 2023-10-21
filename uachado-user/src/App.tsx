import './App.css'
import itemsLogo from '../public/items-icon.png'
import placesLogo from '../public/places-icon.png'
import generalLogo from '../public/general-icon.png'
function App() {
  return (
    <div className=''>
      <div className="navbar w- bg-primary rounded-lg">
        <div className="flex-1">
          <img className='w-32 -mr-8' src={generalLogo}></img>
          <a className="btn btn-ghost normal-case text-xl pl-0">UAchado</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-ghost">
            Staff Sign-In
          </button>
        </div>
      </div>
      <div className=' flex justify-center items-center h-screen '>
        <div className="mockup-window bg-primary-focus">
          <div className="sm:flex flex-column justify-center px-20 py-16 bg-primary gap-40">
            <div className="card w-96 image-full hover:cursor-pointer mb-10 py-10">
              <figure className='shadow-xl'><img src={placesLogo} alt="Places Icon" /></figure>
              <div className="card-body m-auto">
                <h2 className="card-title text-5xl">Find Authorized Points</h2>
              </div>
            </div>
            <div className="card w-96 image-full hover:cursor-pointer mb-10 py-10">
              <figure className='shadow-xl'><img src={itemsLogo} alt="Places Icon" /></figure>
              <div className="card-body m-auto">
                <h2 className="card-title text-5xl">Find Lost Items</h2>
              </div>
            </div>
          </div>
        </div>
        <div />
      </div>
    </div>
  )
}

export default App

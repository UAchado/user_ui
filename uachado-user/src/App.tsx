import './App.css'
import itemsLogo from '../public/items-icon.png'
import placesLogo from '../public/places-icon.png'
function App() {
  return (
    <>
      <div className="mockup-window bg-primary-focus">
        <div className="flex justify-center px-4 py-16 bg-primary gap-20">
          <div className="card w-96 image-full hover:cursor-pointer ">
            <figure className='shadow-xl '><img src={placesLogo} alt="Places Icon" /></figure>
            <div className="card-body m-auto">
              <h2 className="card-title text-5xl">Find Authorized Points</h2>
            </div>
          </div>
          <div className="card w-96 image-full hover:cursor-pointer">
          <figure className='shadow-xl'><img src={itemsLogo} alt="Places Icon" /></figure>
            <div className="card-body m-auto">
              <h2 className="card-title text-5xl">Find Lost Items</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

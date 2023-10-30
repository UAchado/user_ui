import itemsLogo from "../../../public/items-icon.png";
import placesLogo from "../../../public/places-icon.png";
import { Link } from "react-router-dom";
import "./home.css";
import pinLogo from "../../../public/pin-icon.png";
const Home = () => {
  return (
    <>
      <div className="justify-center w-full gap-40 px-40 py-16 sm:flex flex-column bg-primary bg-opacity-20">
        <Link to="/dropPoints">
          <div className="relative w-full p-10 mb-10 custom-card image-full hover:cursor-pointer">
            <img className="absolute top-0 left-0 w-36" src={pinLogo}></img>
            <figure>
              <img src={placesLogo} alt="Places Icon"/>
            </figure>
            <div className="m-auto card-body">
              <h2 className="text-5xl card-title">Pontos Autorizados</h2>
            </div>
          </div>
        </Link>
        <Link to="/findItems">
          <div className="w-full py-10 mb-10 custom-card image-full hover:cursor-pointer">
            <figure className="shadow-xl">
              <img src={itemsLogo} alt="Places Icon" style={{mixBlendMode: "luminosity"}} />
            </figure>
            <div className="m-auto card-body">
              <h2 className="text-5xl card-title">Objetos Perdidos</h2>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Home;

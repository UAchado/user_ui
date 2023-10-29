import itemsLogo from "../../../public/items-icon.png";
import placesLogo from "../../../public/places-icon.png";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="justify-center w-full gap-40 px-40 py-16 sm:flex flex-column bg-primary">
        <Link to="/dropPoints">
          <div className="w-full py-10 mb-10 card custom-card image-full hover:cursor-pointer">
            <figure className="shadow-xl">
              <img src={placesLogo} alt="Places Icon" />
            </figure>
            <div className="m-auto card-body">
              <h2 className="text-5xl card-title">Pontos Autorizados</h2>
            </div>
          </div>
        </Link>
        <Link to="/findItems">
          <div className="w-full py-10 mb-10 card custom-card image-full hover:cursor-pointer">
            <figure className="shadow-xl">
              <img src={itemsLogo} alt="Places Icon" />
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

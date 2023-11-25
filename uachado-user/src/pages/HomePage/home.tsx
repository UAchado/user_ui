import itemsLogo from "../../../public/items-icon.png";
import placesLogo from "../../../public/places-icon.png";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/dropPoints">
          <div className="custom-card flex flex-col items-center lg:m-10 p-4 bg-white rounded shadow-lg hover:cursor-pointer">
            <div className="flex-grow">
              <img
                src={placesLogo}
                alt="Places Icon"
                className="max-w-full h-auto shadow-xl"
              />
            </div>
            <h2 className="text-3xl sm:text-5xl mt-4">Pontos Autorizados</h2>
          </div>
        </Link>
        <Link to="/findItems">
          <div className="custom-card flex flex-col items-center lg:m-10 p-4 bg-white rounded shadow-lg hover:cursor-pointer">
            <div className="flex-grow">
              <img
                src={itemsLogo}
                alt="Items Icon"
                className="max-w-full h-auto shadow-xl"
              />
            </div>
            <h2 className="text-3xl sm:text-5xl mt-4">Objetos Perdidos</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;

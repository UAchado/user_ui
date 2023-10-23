import itemsLogo from "../../../public/items-icon.png";
import placesLogo from "../../../public/places-icon.png";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" flex justify-center items-center h-screen ">
      <div className="card bg-primary shadow-xl">
        <div className="card-body">
          <div className="sm:flex flex-column justify-center px-20 py-16 bg-primary gap-40">
            <Link to="/dropPoints">
              <div className="card custom-card w-96 image-full hover:cursor-pointer mb-10 py-10">
                <figure className="shadow-xl">
                  <img src={placesLogo} alt="Places Icon" />
                </figure>
                <div className="card-body m-auto">
                  <h2 className="card-title text-5xl">
                    Find Authorized Points
                  </h2>
                </div>
              </div>
            </Link>
            <Link to="/findItems">
              <div className="card custom-card w-96 image-full hover:cursor-pointer mb-10 py-10">
                <figure className="shadow-xl">
                  <img src={itemsLogo} alt="Places Icon" />
                </figure>
                <div className="card-body m-auto">
                  <h2 className="card-title text-5xl">Find Lost Items</h2>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

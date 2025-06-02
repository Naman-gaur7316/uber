import React from "react";
import uberLogo from "../assets/images/uberLogo.png";
import { FaUser } from "react-icons/fa";

function Home() {
  const userLocation = [37.7749, -122.4194];
  return (
    <div>
      {/* navbar */}
      <div className="p-4 flex justify-between items-center">
        <div>
          <img className="w-16" src={uberLogo} alt="uber" />
        </div>
        <div>
          <span className="bg-white rounded-full shadow-md p-3 inline-block">
            <FaUser size={24} />
          </span>
        </div>
      </div>
      {/* Map */}
      <div></div>
      {/* trip booking */}
      <div className="px-5 py-4 rounded-t-xl shadow-sm absolute w-full bottom-0 left-0">
        <h4 className="font-bold text-xl mb-5">Find a trip</h4>
        <div className="mb-6">
        
          <input
            type="text"
            className="bg-neutral-200 border border-gray-300 p-2 w-full rounded"
            required
            placeholder="Pick up"
          />
        </div>
        <div className="mb-6">
          
          <input
            type="text"
            className="bg-neutral-200 border border-gray-300 p-2 w-full rounded"
            required
            placeholder="Destination"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;

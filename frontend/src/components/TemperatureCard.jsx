import React from "react";
import { MapPin } from "lucide-react";

const TemperatureCard = () => {
  return (
    <div
      className="bg-white rounded-xl  p-5 w-full sm:w-[300px]  overflow-hidden shadow-md  border border-gray-100 
             hover:shadow-xl hover:border-green-300 
             transition-all duration-300 ease-in-out"
    >
      {/* Location & Unit Toggle */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 bg-green-50 px-3 py-1 text-green-700 text-sm rounded-full">
          <MapPin className="w-4 h-4" />
          Ngawi, Indonesia
        </div>
        <div className="flex gap-1 text-xs font-semibold bg-gray-100 px-2 py-1 rounded-full">
          <span className="bg-green-500 text-white px-2 py-0.5 rounded-full">
            °C
          </span>
          <span className="text-gray-600 px-2 py-0.5">F</span>
        </div>
      </div>

      {/* Day & Date */}
      <div className="mb-2 flex justify-between">
        <div>
          <p className="text-lg font-semibold text-gray-800">Sunday</p>
          <p className="text-sm text-gray-500">20 May, 2024</p>
        </div>

        <div>
          <img
            src="/sunny.jpg" // <-- use your weather icon here
            alt="Sunny"
            className="w-20 h-20"
          />
        </div>
      </div>

      {/* Temperature & Weather */}
      <div className="flex items-center justify-between mt-3">
        <div>
          <p className="text-3xl font-bold text-gray-800">28° C</p>
          <p className="text-xs text-gray-500">High: 32 Low: 18</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-700 font-medium">Sunny</p>
          <p className="text-xs text-gray-500">Feels like 31</p>
        </div>
      </div>
    </div>
  );
};

export default TemperatureCard;

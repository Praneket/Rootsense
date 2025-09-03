import React from "react";

const soilTypes = [
  {
    name: "Alluvial Soil",
    image: "/Soil/sandy.jpeg", // replace with your local or hosted image
    trait: "Fertile & found in river plains",
  },
  {
    name: "Black Soil",
    image: "/Soil/sandy.jpeg",
    trait: "Ideal for cotton, retains moisture",
  },
  {
    name: "Red Soil",
    image: "/Soil/sandy.jpeg",
    trait: "Low in nutrients, needs fertilization",
  },
  {
    name: "Laterite Soil",
    image: "/Soil/sandy.jpeg",
    trait: "Rich in iron, used for tea & coffee",
  },
  {
    name: "Desert Soil",
    image: "/Soil/sandy.jpeg",
    trait: "Sandy, dry, needs irrigation",
  },
];

const SoilTypesSection = () => {
  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold text-green-800 mb-4">
          Various Soil Types in India
        </h2>
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
          {soilTypes.map((soil, idx) => (
            <div
              key={idx}
              className="min-w-[220px] bg-green-50 border border-green-100 rounded-lg shadow hover:shadow-md transition-transform hover:scale-105"
            >
              <img
                src={soil.image}
                alt={soil.name}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-md font-semibold text-green-700">
                  {soil.name}
                </h3>
                <p className="text-sm text-gray-600">{soil.trait}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SoilTypesSection;

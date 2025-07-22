import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const NutrientRing = ({ label, percentage, color }) => {
  return (
    <div className="flex flex-col items-center w-28">
      <CircularProgressbarWithChildren
        value={percentage}
        strokeWidth={10}
        styles={buildStyles({
          pathColor: color,
          trailColor: "#f3f4f6", // light gray
        })}
      >
        <div className="text-lg font-bold text-gray-800">{label}</div>
        <div className="text-sm text-gray-500">{percentage}%</div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default NutrientRing;

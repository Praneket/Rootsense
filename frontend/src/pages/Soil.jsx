import React from "react";
import FarmerNavbar from "../components/FarmerNavbar";
import SoilAndWater from "../components/SoilAndWater";
import GovernmentSchemesSection from "../components/GovernmentSchemsSection";
import SoilHealthCard from "../components/SoilHealthcard";
import SoilTypesSection from "../components/SoilTypesSection";
import NutrientAnalysisSection from "../components/NutrientAnalysisSection";
import CropSuggestionSection from "../components/CropSuggestionSection";
import NearbyLabsSection from "../components/NearByLabsSection";
import FertilizerRecommendation from "../components/FertilizerRecommendation";
import WaterInsightsSection from "../components/WaterInsightsSection";

const Soil = () => {
  return (
    <div>
      <FarmerNavbar />

      {/* <SoilTypesSection /> */}
      <NutrientAnalysisSection />
      <CropSuggestionSection />
      <NearbyLabsSection />
      <FertilizerRecommendation />
      <WaterInsightsSection />
      {/* <SoilAndWater /> */}
      <GovernmentSchemesSection />
    </div>
  );
};

export default Soil;

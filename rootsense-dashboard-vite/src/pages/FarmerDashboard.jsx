import React from "react";
import LogoutButton from "../components/LogoutButton";
import Dashboard from "./Dashboard"; // Reuse main dashboard

export default function FarmerDashboard() {
  return (
    <div>
      <Dashboard />
      <div className="p-4">
        <LogoutButton />
      </div>
    </div>
  );
}

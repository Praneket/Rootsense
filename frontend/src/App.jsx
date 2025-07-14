import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FarmerDashboard from "./pages/FarmerDashboard";
import ExpertDashboard from "./pages/ExpertDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import UserDashboard from "./pages/UserDashboard";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration in ms
      once: true, // animate only once when in view
      easing: "ease-in-out",
      offset: 50, // start animating 50px before element enters view
      delay: 0, // no delay
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/farmer"
          element={
            <PrivateRoute>
              <FarmerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/expert"
          element={
            <PrivateRoute>
              <ExpertDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

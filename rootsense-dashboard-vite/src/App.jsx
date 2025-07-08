import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/FarmerDashboard';
import ExpertDashboard from './pages/ExpertDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from "./components/PrivateRoute";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
        <Route path="/farmer" element={<PrivateRoute><FarmerDashboard /></PrivateRoute>} />
        <Route path="/expert" element={<PrivateRoute><ExpertDashboard /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

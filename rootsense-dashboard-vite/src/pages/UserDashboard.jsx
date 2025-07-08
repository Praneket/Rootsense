import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import Dashboard from './Dashboard';

export default function UserDashboard() {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      const uid = auth.currentUser?.uid;
      const userDoc = await getDoc(doc(db, "users", uid));
      setRole(userDoc.data()?.role);
    };
    fetchRole();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">🌱 RootSense Dashboard</h1>
      <Dashboard />
      <div className="mt-6 flex justify-between items-center">
        <LogoutButton />
        {role && (
          <button
            onClick={() => navigate(`/${role}`)}
            className="bg-blue-600 px-4 py-2 rounded text-white"
          >
            Go to {role.charAt(0).toUpperCase() + role.slice(1)} Panel
          </button>
        )}
      </div>
    </div>
  );
}

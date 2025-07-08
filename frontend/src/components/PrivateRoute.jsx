import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p className="text-white p-4">Loading...</p>;
  if (!user) return <Navigate to="/" />;
  return children;
}

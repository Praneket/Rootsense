import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <button
      className="bg-red-500 px-4 py-2 rounded text-white"
      onClick={logout}
    >
      Logout
    </button>
  );
}

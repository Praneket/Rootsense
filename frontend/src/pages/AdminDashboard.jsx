import LogoutButton from "../components/LogoutButton";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-yellow-500 mb-4">Admin Panel</h1>
      <p className="mb-4 text-white">Manage users and system stats here.</p>
      {/* Future: Admin controls and analytics */}
      <LogoutButton />
    </div>
  );
}

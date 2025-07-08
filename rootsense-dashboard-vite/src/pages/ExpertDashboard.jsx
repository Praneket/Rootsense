import LogoutButton from "../components/LogoutButton";

export default function ExpertDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl text-green-600 font-bold mb-4">Expert Dashboard</h1>
      <p className="mb-4 text-white">You can add suggestions for farmers here.</p>
      {/* Future: Form to submit farming tips */}
      <LogoutButton />
    </div>
  );
}

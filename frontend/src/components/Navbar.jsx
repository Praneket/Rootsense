export default function Navbar() {
  return (
    <div className="bg-green-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">🌱 RootSense</h1>
      <div className="space-x-4">
        <a href="#" className="hover:underline">Dashboard</a>
        <a href="#" className="hover:underline">Reports</a>
        <a href="#" className="hover:underline">Settings</a>
        <button className="bg-green-600 px-4 py-1 rounded">Log out</button>
      </div>
    </div>
  );
}

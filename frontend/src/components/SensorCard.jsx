export default function SensorCard({ title, value, unit }) {
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow p-4 w-full sm:w-1/2 lg:w-1/4 m-2">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold">{value}{unit}</p>
      <div className="text-xs mt-2 opacity-70">Live data</div>
    </div>
  );
}

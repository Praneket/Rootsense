export default function AdviceCard({ advice, speak }) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg mt-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-green-400">
          Farming Tip (AI-Powered)
        </h3>
        <p>{advice}</p>
      </div>
      <button
        className="bg-yellow-500 text-black px-4 py-2 rounded ml-4"
        onClick={speak}
      >
        🔊 Speak
      </button>
    </div>
  );
}

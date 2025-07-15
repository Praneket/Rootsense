import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import SensorCard from "../components/SensorCard";
import AdviceCard from "../components/AdviceCard";
import SensorChart from "../components/SensorChart";
import Navbar from "../components/Navbar";
import { getFarmingTip } from "../utils/openai";            // Fallback (OpenAI)
import { getAgroRecommendation } from "../utils/agrothink"; // Primary (Local API)

export default function Dashboard() {
  const [data, setData] = useState({});
  const [advice, setAdvice] = useState("Loading smart farming tip...");
  const [moistureLog, setMoistureLog] = useState([]);
  const [phLog, setPhLog] = useState([]);
  const [tempLog, setTempLog] = useState([]);
  const [npkLog, setNpkLog] = useState([]);

  // 🔴 Live sensor data
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "sensors", "current"), (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data());
      }
    });

    return () => unsub();
  }, []);

  // 🔵 AI Smart Farming Tip Generator
  useEffect(() => {
  if (data.moisture && data.ph && data.temperature && data.npk) {
    getAgroRecommendation(data)
      .then((tip) => {
        if (!tip || tip.toLowerCase().includes("error")) {
          throw new Error("Invalid response");
        }
        setAdvice(tip);
      })
      .catch(async (err) => {
        console.warn("AgroThink failed. Falling back to OpenAI.", err);
        const fallback = await getFarmingTip(data);
        setAdvice(fallback || "⚠️ AI unavailable");
      });
  }
}, [data]);


  // 🟡 Sensor logs for charting
  useEffect(() => {
    const q = query(
      collection(db, "sensor_logs"),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const moist = [];
      const ph = [];
      const temp = [];
      const npk = [];

      snapshot.forEach((doc) => {
        const d = doc.data();
        const time = new Date(d.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        moist.push({ time, value: d.moisture });
        ph.push({ time, value: d.ph });
        temp.push({ time, value: d.temperature });
        npk.push({ time, value: d.npk });
      });

      setMoistureLog(moist.reverse());
      setPhLog(ph.reverse());
      setTempLog(temp.reverse());
      setNpkLog(npk.reverse());
    });

    return () => unsubscribe();
  }, []);

  // 🔊 Text-to-Speech Button
  const speak = () => {
    const msg = new SpeechSynthesisUtterance(advice);
    msg.lang = "en-IN";
    speechSynthesis.speak(msg);
  };

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">🌱 AI-Powered Soil Dashboard</h1>

        {/* Sensor Readings */}
        <div className="flex flex-wrap justify-start gap-4">
          <SensorCard title="Moisture" value={data.moisture} unit="%" />
          <SensorCard title="Soil pH" value={data.ph} unit="" />
          <SensorCard title="Temperature" value={data.temperature} unit="°C" />
          <SensorCard title="NPK (Raw)" value={data.npk} unit="" />
        </div>

        {/* AI Advice */}
        <AdviceCard advice={advice} speak={speak} />

        {/* Sensor Trend Charts */}
        <SensorChart title="Moisture (%)" dataPoints={moistureLog} color="teal" />
        <SensorChart title="Soil pH" dataPoints={phLog} color="orange" />
        <SensorChart title="Temperature (°C)" dataPoints={tempLog} color="red" />
        <SensorChart title="NPK Level" dataPoints={npkLog} color="purple" />
      </div>
    </div>
  );
}

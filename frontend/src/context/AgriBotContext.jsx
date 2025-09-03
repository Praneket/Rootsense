// src/context/AgriBotContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AgriBotContext = createContext();

export const AgriBotProvider = ({ children }) => {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("agriChat")) || [];
    setChat(stored);
  }, []);

  const sendMessage = async (message) => {
    const userMsg = message || input;
    if (!userMsg.trim()) return;

    const newChat = [...chat, { role: "user", text: userMsg }];
    setChat(newChat);
    setInput("");

    try {
      const res = await fetch("/api/agri-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMsg }),
      });
      const data = await res.json();

      setChat((prev) => [
        ...prev,
        { role: "bot", text: data.reply || "No response from AI." },
      ]);

      localStorage.setItem(
        "agriChat",
        JSON.stringify([
          ...newChat,
          { role: "bot", text: data.reply || "No response from AI." },
        ])
      );
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Error connecting to AgriBot." },
      ]);
    }
  };

  return (
    <AgriBotContext.Provider
      value={{ chat, setChat, input, setInput, sendMessage }}
    >
      {children}
    </AgriBotContext.Provider>
  );
};

export const useAgriBot = () => useContext(AgriBotContext);

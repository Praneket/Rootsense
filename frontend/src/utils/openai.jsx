// utils/openai.js
export async function getFarmingTip(sensorData) {
  const prompt = `
You are an agriculture expert. Give a 1–2 line soil improvement tip based on:
- Moisture: ${sensorData.moisture}%
- pH: ${sensorData.ph}
- Temperature: ${sensorData.temperature}°C
- NPK: ${sensorData.npk}
Tip:
  `;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 60,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      console.warn("OpenAI API limit or malformed response:", data);
      return "⚠️ AI unavailable (Rate limited or invalid response)";
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "⚠️ Error connecting to AI service";
  }
}

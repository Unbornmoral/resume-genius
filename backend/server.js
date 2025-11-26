// backend/server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Load Hugging Face API key from .env
const HF_API_KEY = process.env.HF_API_KEY;

// Quick check to confirm the key is loaded
console.log("Loaded HF_API_KEY:", HF_API_KEY ? "Yes" : "No");


console.log("HF_API_KEY value:", HF_API_KEY);

// Route for AI generation
/*app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://router.huggingface.co", {
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        model: "facebook/bart-large-cnn",   // ✅ model goes in body
        inputs: prompt
      }),
    }); 

    // Safely parse JSON only if content-type is JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      console.log("HF raw response:", data);
      res.json(data);
    } else {
      const text = await response.text();
      console.error("HF raw text response:", text);
      res.status(response.status).send({ error: text });
    }
  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).json({ error: "Failed to fetch from Hugging Face" });
  }
});
*/





// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});

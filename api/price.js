import getPrice from "./getPrice.js";

export default async function handler(req, res) {
  try {
    const { symbol } = req.query;

    if (!symbol) {
      return res.status(400).json({ error: "symbol is required" });
    }

    const data = await getPrice(symbol);

    if (data.error) {
      return res.status(404).json(data);
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error("API /price error:", err);
    return res.status(500).json({ error: "internal server error" });
  }
}


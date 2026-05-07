export default async function getPrice(symbol) {
  if (!symbol) return { error: "symbol required" };

  const upper = symbol.toUpperCase();

  // BYBIT (spot)
  const bybitUrl = `https://api.bybit.com/v5/market/tickers?category=spot&symbol=${upper}USDT`;

  try {
    const bybitRes = await fetch(bybitUrl);
    const bybitData = await bybitRes.json();

    if (bybitData?.result?.list?.length > 0) {
      const price = bybitData.result.list[0].lastPrice;
      return {
        symbol: upper,
        price: Number(price),
        source: "bybit"
      };
    }
  } catch (err) {
    console.error("Bybit error:", err);
  }

  // KRAKEN (fallback)
  const krakenPair = upper === "XMR" ? "XXMRZUSD" : `${upper}USD`;
  const krakenUrl = `https://api.kraken.com/0/public/Ticker?pair=${krakenPair}`;

  try {
    const krakenRes = await fetch(krakenUrl);
    const krakenData = await krakenRes.json();

    const key = Object.keys(krakenData.result)[0];
    if (key) {
      const price = krakenData.result[key].c[0];
      return {
        symbol: upper,
        price: Number(price),
        source: "kraken"
      };
    }
  } catch (err) {
    console.error("Kraken error:", err);
  }

  return { error: "no data found" };
}


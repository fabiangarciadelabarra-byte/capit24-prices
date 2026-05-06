export default async function handler(req, res) {
  try {
    const [coingeckoRes, binanceRes, krakenRes] = await Promise.all([
      fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd"),
      fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"),
      fetch("https://api.kraken.com/0/public/Ticker?pair=BTCUSD"),
    ]);

    const coingecko = await coingeckoRes.json();
    const binance = await binanceRes.json();
    const kraken = await krakenRes.json();

    return res.status(200).json({
      success: true,
      sources: {
        coingecko,
        binance,
        kraken,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Internal error" });
  }
}

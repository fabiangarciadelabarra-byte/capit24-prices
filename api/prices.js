export default async function handler(request) {
  try {
    const [coingeckoRes, binanceRes, krakenRes] = await Promise.all([
      fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd"),
      fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"),
      fetch("https://api.kraken.com/0/public/Ticker?pair=BTCUSD"),
    ]);

    const coingecko = await coingeckoRes.json();
    const binance = await binanceRes.json();
    const kraken = await krakenRes.json();

    return new Response(
      JSON.stringify({
        success: true,
        sources: {
          coingecko,
          binance,
          kraken,
        },
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: "Internal error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


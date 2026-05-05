export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  try {
    const [cg, binanceBTC, binanceETH] = await Promise.all([
      fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"),
      fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"),
      fetch("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT")
    ]);

    const cgData = await cg.json();
    const btcBinance = await binanceBTC.json();
    const ethBinance = await binanceETH.json();

    return new Response(
      JSON.stringify({
        BTC: {
          coingecko: cgData.bitcoin.usd,
          binance: btcBinance.price
        },
        ETH: {
          coingecko: cgData.ethereum.usd,
          binance: ethBinance.price
        }
      }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

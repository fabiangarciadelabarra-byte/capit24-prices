export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  try {
    const [cgRes, binBTC, binETH] = await Promise.all([
      fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"),
      fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"),
      fetch("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT")
    ]);

    const cg = await cgRes.json();
    const btc = await binBTC.json();
    const eth = await binETH.json();

    return new Response(
      JSON.stringify({
        BTC: {
          coingecko: cg.bitcoin.usd,
          binance: parseFloat(btc.price),
        },
        ETH: {
          coingecko: cg.ethereum.usd,
          binance: parseFloat(eth.price),
        }
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "API error", details: err.message }),
      { status: 500 }
    );
  }
}


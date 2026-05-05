export default async function handler(req, res) {
  try {
    // CoinGecko
    const cg = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
    ).then(r => r.json());

    // Kraken
    const kraken = await fetch(
      "https://api.kraken.com/0/public/Ticker?pair=XBTUSD,ETHUSD"
    ).then(r => r.json());

    // Binance
    const binanceBTC = await fetch(
      "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
    ).then(r => r.json());

    const binanceETH = await fetch(
      "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"
    ).then(r => r.json());

    const data = {
      BTC: {
        coingecko: cg.bitcoin.usd,
        kraken: parseFloat(kraken.result.XXBTZUSD.c[0]),
        binance: parseFloat(binanceBTC.price),
        average: (
          (cg.bitcoin.usd +
            parseFloat(kraken.result.XXBTZUSD.c[0]) +
            parseFloat(binanceBTC.price)) /
          3
        ).toFixed(2)
      },
      ETH: {
        coingecko: cg.ethereum.usd,
        kraken: parseFloat(kraken.result.XETHZUSD.c[0]),
        binance: parseFloat(binanceETH.price),
        average: (
          (cg.ethereum.usd +
            parseFloat(kraken.result.XETHZUSD.c[0]) +
            parseFloat(binanceETH.price)) /
          3
        ).toFixed(2)
      }
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching prices", details: error.message });
  }
}


export default async function handler(request, response) {
  try {
    const btc = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json").then(r => r.json());

    return response.status(200).json({
      price: btc.bpi.USD.rate_float,
      time: btc.time.updatedISO
    });
  } catch (error) {
    return response.status(500).json({ error: "Error fetching BTC price" });
  }
}

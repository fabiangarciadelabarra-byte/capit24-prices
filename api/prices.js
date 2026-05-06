export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  try {
    const btc = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json").then(r => r.json());

    return new Response(
      JSON.stringify({
        price: btc.bpi.USD.rate_float,
        time: btc.time.updatedISO
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching BTC price" }), {
      status: 500
    });
  }
}

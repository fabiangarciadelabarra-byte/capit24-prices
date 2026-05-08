import getPrice from "./getPrice";

let cache = {
  all: null,
  timestamp: 0
};

export default async function handler(req, res) {
  const now = Date.now();

  if (cache.all && now - cache.timestamp < 5000) {
    return res.status(200).json(cache.all);
  }

  const symbols = ["btc", "eth", "sol", "xmr", "aave"];
  const results = {};

  for (const s of symbols) {
    results[s.toUpperCase()] = await getPrice(s);
  }

  cache.all = results;
  cache.timestamp = now;

  return res.status(200).json(results);
}

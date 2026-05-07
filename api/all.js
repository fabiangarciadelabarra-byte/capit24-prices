import getPrice, { maps } from "./getPrice";

let cache = {
  all: null,
  timestamp: 0
};

export default async function handler(req, res) {
  const now = Date.now();

  if (cache.all && now - cache.timestamp < 5000) {
    return res.status(200).json(cache.all);
  }

  const symbols = Object.keys(maps.geckoMap);
  const results = {};

  for (const s of symbols) {
    results[s.toUpperCase()] = await getPrice(s);
  }

  cache.all = results;
  cache.timestamp = now;

  return res.status(200).json(results);
}

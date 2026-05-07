import getPrice from "./getPrice";

export default async function handler(req, res) {
  const symbol = req.query.symbol;
  const data = await getPrice(symbol);
  return res.status(200).json(data);
}

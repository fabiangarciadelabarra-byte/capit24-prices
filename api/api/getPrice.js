export const maps = {
  geckoMap: {
    btc: "bitcoin",
    eth: "ethereum",
    sol: "solana",
    xrp: "ripple",
    ada: "cardano",
    doge: "dogecoin",
    bnb: "binancecoin",
    avax: "avalanche-2",
    dot: "polkadot",
    ltc: "litecoin",
    bch: "bitcoin-cash",
    link: "chainlink",
    matic: "polygon",
    trx: "tron",
    xlm: "stellar",
    etc: "ethereum-classic",
    fil: "filecoin",
    atom: "cosmos",
    near: "near",
    apt: "aptos",
    hbar: "hedera-hashgraph",
    vet: "vechain",
    rune: "thorchain",
    inj: "injective-protocol",
    arb: "arbitrum",
    op: "optimism",
    algo: "algorand",
    eos: "eos",
    xmr: "monero",
    aave: "aave"
  },

  paprikaMap: {
    btc: "btc-bitcoin",
    eth: "eth-ethereum",
    sol: "sol-solana",
    xrp: "xrp-xrp",
    ada: "ada-cardano",
    doge: "doge-dogecoin",
    bnb: "bnb-binance-coin",
    avax: "avax-avalanche",
    dot: "dot-polkadot",
    ltc: "ltc-litecoin",
    bch: "bch-bitcoin-cash",
    link: "link-chainlink",
    matic: "matic-polygon",
    trx: "trx-tron",
    xlm: "xlm-stellar",
    etc: "etc-ethereum-classic",
    fil: "fil-filecoin",
    atom: "atom-cosmos",
    near: "near-near-protocol",
    apt: "apt-aptos",
    hbar: "hbar-hedera-hashgraph",
    vet: "vet-vechain",
    rune: "rune-thorchain",
    inj: "inj-injective",
    arb: "arb-arbitrum",
    op: "op-optimism",
    algo: "algo-algorand",
    eos: "eos-eos",
    xmr: "xmr-monero",
    aave: "aave-aave"
  }
};

export default async function getPrice(symbol) {
  const s = symbol.toLowerCase();
  const { geckoMap, paprikaMap } = maps;

  if (!geckoMap[s]) return { symbol: s.toUpperCase(), error: "invalid symbol" };

  const headers = {
    "User-Agent": "Mozilla/5.0",
    "Accept": "application/json"
  };

  // 1) CoinGecko
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${geckoMap[s]}&vs_currencies=usd`,
      { headers }
    );
    const json = await res.json();
    const price = json[geckoMap[s]]?.usd;
    if (price) return { symbol: s.toUpperCase(), coingecko: price };
  } catch {}

  // 2) Binance
  try {
    const res = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${s.toUpperCase()}USDT`,
      { headers }
    );
    const json = await res.json();
    const price = parseFloat(json.price);
    if (price) return { symbol: s.toUpperCase(), binance: price };
  } catch {}

  // 3) CoinPaprika
  try {
    const id = paprikaMap[s];
    if (id) {
      const res = await fetch(
        `https://api.coinpaprika.com/v1/tickers/${id}`,
        { headers }
      );
      const json = await res.json();
      const price = json?.quotes?.USD?.price;
      if (price) return { symbol: s.toUpperCase(), paprika: price };
    }
  } catch {}

  return { symbol: s.toUpperCase(), error: "no price available" };
}

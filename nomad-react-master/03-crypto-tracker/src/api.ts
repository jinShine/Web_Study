const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  return await fetch(`${BASE_URL}/coins`).then((res) => res.json());
}

export async function fetchCoin(coinId: string) {
  return await fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
}

export async function fetchTicker(coinId: string) {
  return await fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
}

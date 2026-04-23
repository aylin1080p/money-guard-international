import axios from "axios";

const BASE_URL = "https://api.binance.com/api/v3";

export async function fetchCandles(symbol, interval, limit = 220) {
  const response = await axios.get(`${BASE_URL}/klines`, {
    params: {
      symbol,
      interval,
      limit,
    },
  });

  return response.data.map(item => ({
    openTime: item[0],
    open: Number(item[1]),
    high: Number(item[2]),
    low: Number(item[3]),
    close: Number(item[4]),
    volume: Number(item[5]),
    closeTime: item[6],
  }));
}

export async function fetchTicker24h(symbol) {
  const response = await axios.get(`${BASE_URL}/ticker/24hr`, {
    params: { symbol },
  });

  return {
    lastPrice: Number(response.data.lastPrice),
    priceChangePercent: Number(response.data.priceChangePercent),
    highPrice: Number(response.data.highPrice),
    lowPrice: Number(response.data.lowPrice),
    volume: Number(response.data.volume),
  };
}

export async function measureLatency() {
  const startTime = performance.now();
  await axios.get(`${BASE_URL}/time`);
  return Math.round(performance.now() - startTime);
}

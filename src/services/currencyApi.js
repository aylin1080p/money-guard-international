import axios from 'axios';

import { env } from '../config/env.js';
import { storageKeys } from '../utils/auth.js';

const ONE_HOUR_IN_MS = 60 * 60 * 1000;

const normalizeRate = rate => ({
  currencyCodeA: rate.currencyCodeA,
  currencyCodeB: rate.currencyCodeB,
  rateBuy: rate.rateBuy ?? rate.rateCross ?? 0,
  rateSell: rate.rateSell ?? rate.rateCross ?? 0,
});

export const getCachedCurrency = () => {
  try {
    const rawRates = localStorage.getItem(storageKeys.currency);
    const rawTimestamp = localStorage.getItem(storageKeys.currencyTimestamp);

    if (!rawRates || !rawTimestamp) {
      return null;
    }

    const rates = JSON.parse(rawRates);
    const timestamp = Number(rawTimestamp);

    if (!Array.isArray(rates) || Number.isNaN(timestamp)) {
      return null;
    }

    return { rates, timestamp };
  } catch {
    return null;
  }
};

export const setCachedCurrency = rates => {
  localStorage.setItem(storageKeys.currency, JSON.stringify(rates));
  localStorage.setItem(storageKeys.currencyTimestamp, String(Date.now()));
};

export const fetchUsdEuroValues = async () => {
  const cached = getCachedCurrency();

  if (cached && Date.now() - cached.timestamp < ONE_HOUR_IN_MS) {
    return cached.rates;
  }

  const { data } = await axios.get(env.monobankApiUrl);
  const filteredRates = data
    .filter(
      currency =>
        (currency.currencyCodeA === 840 && currency.currencyCodeB === 980) ||
        (currency.currencyCodeA === 978 && currency.currencyCodeB === 980)
    )
    .map(normalizeRate);

  setCachedCurrency(filteredRates);

  return filteredRates;
};

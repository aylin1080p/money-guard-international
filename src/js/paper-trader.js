const JOURNAL_LIMIT = 8;
const MAX_DAILY_DRAWDOWN_PCT = 3;
const SIGNAL_LABELS = {
  flat: "Bekle",
  watch: "Hazirlik",
  long: "Long adayi",
  short: "Short adayi",
  blocked: "Filtre bloke",
};

export const DEFAULT_SETTINGS = {
  symbol: "BTCUSDT",
  interval: "4h",
  initialCapital: 50,
  riskPerTradePct: 1.5,
  commissionPct: 0.1,
  spreadPct: 0.04,
  baseSlippagePct: 0.03,
  headlinesText: "",
};

export function createInitialState(settings) {
  return {
    settings: { ...settings },
    capital: settings.initialCapital,
    peakCapital: settings.initialCapital,
    totalFeesPaid: 0,
    totalRealizedPnl: 0,
    lastLatencyMs: null,
    lastTicker: null,
    lastMarket: null,
    signal: "flat",
    signalReasons: [],
    newsScore: 0,
    newsSummary: evaluateHeadlines(settings.headlinesText),
    trades: [],
    openPosition: null,
    lastProcessedCloseTime: null,
    lastRefreshTime: null,
    streamStatus: "connecting",
  };
}

export function updatePaperBot(state, { candles, ticker, latencyMs, now, headlinesText }) {
  const closedCandles = candles.slice(0, -1);

  if (closedCandles.length < 60) {
    throw new Error("Yeterli 4 saatlik veri bulunamadi.");
  }

  const indicators = buildIndicators(closedCandles);
  const lastClosedCandle = closedCandles.at(-1);
  const latestMarketPrice = ticker.lastPrice;
  const newsSummary = evaluateHeadlines(headlinesText);
  const signal = evaluateSignal(indicators, newsSummary, latencyMs);

  state.lastLatencyMs = latencyMs;
  state.lastTicker = ticker;
  state.lastMarket = {
    price: latestMarketPrice,
    candleTime: lastClosedCandle.closeTime,
    indicators,
  };
  state.signal = signal.type;
  state.signalReasons = signal.reasons;
  state.newsScore = newsSummary.score;
  state.newsSummary = newsSummary;
  state.lastRefreshTime = now;

  if (state.lastProcessedCloseTime === lastClosedCandle.closeTime) {
    updateFloatingPosition(state, latestMarketPrice, latencyMs, now);
    return;
  }

  state.lastProcessedCloseTime = lastClosedCandle.closeTime;
  updateFloatingPosition(state, latestMarketPrice, latencyMs, now);
  maybeExitPosition(state, indicators, latestMarketPrice, latencyMs, now);
  maybeEnterPosition(state, indicators, signal, latestMarketPrice, latencyMs, now);
}

export function applyLiveTicker(state, ticker, now = Date.now()) {
  if (!ticker) {
    return;
  }

  state.lastTicker = {
    ...(state.lastTicker ?? {}),
    ...ticker,
  };
  state.lastRefreshTime = now;

  if (state.lastMarket) {
    state.lastMarket.price = ticker.lastPrice;
  }

  updateFloatingPosition(state, ticker.lastPrice, state.lastLatencyMs ?? 0);
}

export function evaluateHeadlines(headlinesText) {
  const headlines = headlinesText
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  if (headlines.length === 0) {
    return {
      score: 0,
      tone: "neutral",
      volatilityBias: "Belirsiz",
      summary: "Otomatik haber akisi yok. Baslik eklersen risk filtresi sertlesir.",
      breakdown: "Haber filtresi su an pasif. Bu bot fiyat verisini otomatik cekiyor; haber analizi icin basliklari sen girebilir ya da ileride bir news API baglayabiliriz.",
      headlines,
    };
  }

  const positiveWords = [
    "approval",
    "approved",
    "breakout",
    "buying",
    "demand",
    "inflow",
    "surge",
    "bullish",
    "adoption",
    "record",
    "strong",
    "rebound",
    "support",
  ];
  const negativeWords = [
    "ban",
    "hack",
    "lawsuit",
    "liquidation",
    "crash",
    "selloff",
    "outflow",
    "fraud",
    "probe",
    "recession",
    "war",
    "tariff",
    "panic",
    "bearish",
  ];
  const volatilityWords = [
    "fed",
    "cpi",
    "rates",
    "etf",
    "sec",
    "volatility",
    "whale",
    "liquidation",
    "shock",
    "urgent",
  ];

  let score = 0;
  let volatilityHits = 0;

  headlines.forEach(headline => {
    const normalized = headline.toLowerCase();
    positiveWords.forEach(word => {
      if (normalized.includes(word)) {
        score += 1;
      }
    });
    negativeWords.forEach(word => {
      if (normalized.includes(word)) {
        score -= 1;
      }
    });
    volatilityWords.forEach(word => {
      if (normalized.includes(word)) {
        volatilityHits += 1;
      }
    });
  });

  const tone =
    score >= 2 ? "positive" : score <= -2 ? "negative" : "neutral";
  const volatilityBias =
    volatilityHits >= Math.max(2, Math.ceil(headlines.length / 2))
      ? "Yuksek oynaklik riski"
      : "Normal";

  return {
    score,
    tone,
    volatilityBias,
    summary: `Baslik skoru ${score > 0 ? "+" : ""}${score}. ${volatilityBias}.`,
    breakdown: `${headlines.length} baslik tarandi. Analiz: Etki yaratabilecek olaylar.`,
    headlines,
  };
}

export function evaluateSingleHeadline(headline) {
  const normalized = headline.toLowerCase();
  let score = 0;
  let summarySentence = "";

  const positiveMeanings = {
    "approval": "Kritik bir onay sürecinden geçildi, piyasada olumlu beklenti var.",
    "breakout": "Teknik veya temel bir kırılım yaşanıyor, yükseliş tetiklenebilir.",
    "buying": "Kurumsal veya genel piyasa alımları hızlanıyor, talep artıyor.",
    "demand": "Piyasada ciddi bir talep artışı raporlandı, fiyatı destekliyor.",
    "inflows": "Güçlü fon (sermaye) girişleri kaydedildi, alım baskısı yaratabilir.",
    "inflow": "Fona veya borsalara sıcak para girişi var, trend olumlu.",
    "surge": "Fiyatta veya metriklerde ani bir sıçrama yaşanıyor, ivme yüksek.",
    "bullish": "Genel piyasa algısı ve analist beklentileri yükseliş yönünde.",
    "adoption": "Kripto paraların kurumsal veya bireysel benimsenmesi güçleniyor.",
    "record": "Önemli bir tarihi rekor kırıldı, piyasada iyimserlik hakim.",
    "strong": "Teknik veya makro veriler bekleneninden daha güçlü görünüyor.",
    "rebound": "Düşüş sonrası güçlü bir toparlanma ve geri dönüş belirtisi var.",
    "support": "Ekstra destek noktası bulundu, piyasa tutunmayı başarıyor.",
    "yield": "Getiri oranları güçlü seyrediyor, yatırımcı iştahı artıyor.",
    "lending": "Kredi ve finansman sektörü canlanıyor, likidite olumlu."
  };

  const negativeMeanings = {
    "lawsuit": "Hukuki bir sorun veya dava haberi piyasayı baskılamaya başladı.",
    "ban": "Kısıtlayıcı bir yasak veya yasal engel gündemde, panik gelebilir.",
    "hack": "Ciddi bir siber saldırı veya güvenlik ihlali yaşandı, endişe yüksek.",
    "liquidation": "Sert bir tasfiye (likidasyon) dalgası var, düşüş derinleşiyor.",
    "crash": "Piyasada ani ve sert bir çöküş durumu veya tehlikesi raporlandı.",
    "selloff": "Toplu bir panik satışı durumu var, yatırımcı nakde dönüyor.",
    "outflow": "Piyasadan veya kurumsal fonlardan sıcak para çıkışı yaşanıyor.",
    "fraud": "Bir dolandırıcılık vakası ortaya çıktı, yatırımcı güveni sarsıldı.",
    "probe": "Düzenleyici kurumlarca (SEC vb.) sıkı bir soruşturma başlatıldı.",
    "recession": "Durgunluk (resesyon) korkusu riskli varlıkları olumsuz vuruyor.",
    "war": "Savaş veya ciddi bir jeopolitik kriz piyasalara korku salıyor.",
    "tariff": "Sert yaptırımlar veya vergiler küresel pazar hacmini daraltıyor.",
    "panic": "Piyasada net bir panik havası hakim, rasyonel kararlar zorlaşıyor.",
    "bearish": "Genel analizler ve duygular düşüş (ayı dönemi) yönüne evrildi.",
    "fear": "Korku endeksi oldukça yüksek, yatırımcılar riskten kaçınıyor."
  };

  // Check positive words
  for (const [word, meaning] of Object.entries(positiveMeanings)) {
    if (normalized.includes(word)) {
      score += 1;
      if (!summarySentence) summarySentence = meaning;
    }
  }

  // Check negative words
  for (const [word, meaning] of Object.entries(negativeMeanings)) {
    if (normalized.includes(word)) {
      score -= 1;
      if (!summarySentence) summarySentence = meaning;
    }
  }

  const tone = score > 0 ? "positive" : score < 0 ? "negative" : "neutral";
  const reasonText = summarySentence ? summarySentence : "Haberde piyasa yönünü tayin edecek net bir kelime tespit edilmedi.";

  return { score, tone, reasonText };
}

export function buildTradeSnapshot(state) {
  const floatingPnl = state.openPosition?.floatingNetPnl ?? 0;
  const openEquityValue = state.openPosition?.estimatedExitValueAfterFee ?? 0;
  const capitalNow = state.capital + openEquityValue;
  const totalPnl = capitalNow - state.settings.initialCapital;
  const pnlPct = ((capitalNow - state.settings.initialCapital) / state.settings.initialCapital) * 100;
  const currentPrice = state.lastTicker?.lastPrice ?? NaN;
  const dayChange = state.lastTicker?.priceChangePercent ?? 0;
  const newsTone = mapSentimentTone(state.newsSummary.tone);
  const journal = [
    ...state.trades
      .slice()
      .reverse()
      .map(trade => ({
        title: trade.exitTime ? "Pozisyon kapandi" : "Pozisyon acik",
        meta: `${formatDateTime(trade.entryTime)} | ${trade.sizeBtc.toFixed(6)} BTC`,
        value: trade.exitTime
          ? `${formatSignedMoney(trade.netPnl)} net`
          : `${formatSignedMoney(trade.floatingNetPnl ?? 0)} acik PnL`,
        tone:
          (trade.exitTime ? trade.netPnl : trade.floatingNetPnl ?? 0) >= 0
            ? "positive"
            : "negative",
      })),
    ...state.signalReasons.slice(0, 2).map(reason => ({
      title: "Sinyal notu",
      meta: "Kurali aciklar",
      value: reason,
      tone: "neutral",
    })),
  ].slice(0, JOURNAL_LIMIT);

  return {
    price: currentPrice,
    dayChangeText: `${dayChange >= 0 ? "+" : ""}${dayChange.toFixed(2)}% / 24s`,
    dayChangeTone: dayChange >= 0 ? "positive" : "negative",
    latencyText: Number.isFinite(state.lastLatencyMs) ? `${state.lastLatencyMs} ms` : "-",
    signalText: SIGNAL_LABELS[state.signal] ?? "Bekle",
    signalTone:
      state.signal === "long"
        ? "positive"
        : state.signal === "blocked"
          ? "negative"
          : "neutral",
    capitalText: formatMoney(capitalNow),
    pnlText: `${formatSignedMoney(totalPnl)} (${pnlPct >= 0 ? "+" : ""}${pnlPct.toFixed(2)}%)`,
    pnlTone: totalPnl >= 0 ? "positive" : "negative",
    tradeCountText: String(state.trades.length),
    positionText: state.openPosition
      ? `${state.openPosition.sizeBtc.toFixed(6)} BTC @ ${formatMoney(state.openPosition.entryFillPrice)}`
      : "Acik pozisyon yok",
    feesText: formatMoney(state.totalFeesPaid),
    riskText: `%${state.settings.riskPerTradePct.toFixed(2)} (Oto-Dinamik)`,
    newsText: state.newsSummary.summary,
    newsTone,
    statusText: buildStatusText(state),
    statusTone: buildStatusTone(state),
    strategyText: buildStrategyText(state),
    setupText: buildSetupText(state),
    guardrailText: buildGuardrailText(state),
    headlineBreakdownText: state.newsSummary.breakdown,
    journal,
  };
}

function buildIndicators(candles) {
  const closes = candles.map(candle => candle.close);
  const volumes = candles.map(candle => candle.volume);
  const ema20 = calculateEma(closes, 20);
  const ema50 = calculateEma(closes, 50);
  const rsi14 = calculateRsi(closes, 14);
  const atr14 = calculateAtr(candles, 14);
  const adx14 = calculateAdx(candles, 14);
  const volumeSma20 = average(volumes.slice(-20)); // current volume simple moving average
  
  const lastClose = closes.at(-1);
  const previousClose = closes.at(-2);
  const lastVolume = volumes.at(-1);

  return {
    lastClose,
    previousClose,
    ema20,
    ema50,
    rsi14,
    atr14,
    atrPct: (atr14 / lastClose) * 100,
    adx14,
    lastVolume,
    volumeSma20,
    lastCandle: candles.at(-1),
  };
}

function evaluateSignal(indicators, newsSummary, latencyMs) {
  const reasons = [];
  let type = "flat";

  const trendLong =
    indicators.lastClose > indicators.ema20 && indicators.ema20 > indicators.ema50;
  const trendShort = 
    indicators.lastClose < indicators.ema20 && indicators.ema20 < indicators.ema50;
  
  const momentumLong = indicators.rsi14 >= 54 && indicators.rsi14 <= 68;
  const momentumShort = indicators.rsi14 <= 46 && indicators.rsi14 >= 32;

  const volatilityReady = indicators.atrPct >= 1.2 && indicators.atrPct <= 4.8;
  const trendStrong = indicators.adx14 >= 25;
  const volumeReady = indicators.lastVolume > (indicators.volumeSma20 * 1.5);

  const newsReadyLong = newsSummary.tone !== "negative";
  const newsReadyShort = newsSummary.tone !== "positive";
  const latencyReady = latencyMs < 1500;

  if (trendLong) reasons.push("Fiyat EMA20 > EMA50 (Trend Up).");
  if (trendShort) reasons.push("Fiyat EMA20 < EMA50 (Trend Down).");
  if (!trendStrong) reasons.push(`ADX = ${indicators.adx14.toFixed(1)}; Yatay Piyasa (Bekle).`);
  else reasons.push(`ADX = ${indicators.adx14.toFixed(1)}; Trend Gucu Onayli.`);
  if (!volumeReady) reasons.push(`Hacim zayif (< 1.5x SMA). Onay yok.`);

  if (!latencyReady) reasons.push("Gecikme yuksek; islem bloke.");

  const canLong = trendLong && momentumLong && volatilityReady && trendStrong && volumeReady && newsReadyLong && latencyReady;
  const canShort = trendShort && momentumShort && volatilityReady && trendStrong && volumeReady && newsReadyShort && latencyReady;

  if (canLong) {
    type = "long";
  } else if (canShort) {
    type = "short";
  } else if ((trendLong && (momentumLong || volatilityReady)) || (trendShort && (momentumShort || volatilityReady))) {
    type = "watch";
  }

  if ((trendLong && !newsReadyLong) || (trendShort && !newsReadyShort) || !latencyReady) {
    type = "blocked";
  }

  return { type, reasons };
}

function maybeEnterPosition(state, indicators, signal, marketPrice, latencyMs, now) {
  if (state.openPosition || (signal.type !== "long" && signal.type !== "short")) {
    return;
  }

  const dailyDrawdownPct = ((state.peakCapital - state.capital) / state.peakCapital) * 100;

  if (dailyDrawdownPct >= MAX_DAILY_DRAWDOWN_PCT) {
    state.signal = "blocked";
    state.signalReasons = [
      `Gun ici dusus limiti asildi (%${dailyDrawdownPct.toFixed(2)}).`,
    ];
    return;
  }

  const feeRate = state.settings.commissionPct / 100;
  
  // Dinamik Boyutlandırma (ATR Sizing & Drawdown Penalty)
  // Başlangıçta hedeflenen risk yüzdesi
  let dynamicRiskPct = state.settings.riskPerTradePct;
  const currentAtrPct = indicators.atrPct;

  // 1. Oynaklık Çarpanı (Volatility Penalty)
  // Eğer ATR (mum başı ortalama dalgalanma) %3'ün üzerindeyse piyasa çok tehlikelidir, işlemi ufalt.
  if (currentAtrPct > 4.0) {
    dynamicRiskPct = dynamicRiskPct * 0.4; // %60 risk kesintisi
  } else if (currentAtrPct > 3.0) {
    dynamicRiskPct = dynamicRiskPct * 0.6; // %40 risk kesintisi
  } else if (currentAtrPct > 2.0) {
    dynamicRiskPct = dynamicRiskPct * 0.8; // %20 risk kesintisi
  }

  // 2. Özkaynak Erime Çarpanı (Drawdown Penalty / Anti-Martingale)
  // Eğer kasa zaten erimektedir (Örn: %1.5 zarar etmiş), işleri zorlama, savunmaya geç.
  if (dailyDrawdownPct > 1.5) {
     dynamicRiskPct = dynamicRiskPct * 0.7; // Kırmızıda işlemi %30 ufalt
  }

  const riskAmount = state.capital * (dynamicRiskPct / 100);
  const stopDistance = indicators.atr14 * 1.15;
  const maxAffordableSize = state.capital / (marketPrice * (1 + feeRate));
  const sizeBtc = Math.min(riskAmount / stopDistance, maxAffordableSize);

  if (!Number.isFinite(sizeBtc) || sizeBtc <= 0) {
    return;
  }

  const side = signal.type;
  const slippageRate = getEffectiveSlippageRate(state.settings.baseSlippagePct, latencyMs);
  const entryFillPrice = side === "long" 
    ? marketPrice * (1 + state.settings.spreadPct / 200 + slippageRate)
    : marketPrice * (1 - state.settings.spreadPct / 200 - slippageRate);
    
  const entryValue = entryFillPrice * sizeBtc;
  const entryFee = entryFillPrice * sizeBtc * feeRate;

  state.capital -= entryValue + entryFee;
  state.totalFeesPaid += entryFee;
  state.openPosition = {
    symbol: state.settings.symbol,
    side,
    entryTime: now,
    entryFillPrice,
    marketPrice,
    sizeBtc,
    entryValue,
    stopPrice: side === "long" ? entryFillPrice - stopDistance : entryFillPrice + stopDistance,
    targetPrice: side === "long" ? entryFillPrice + indicators.atr14 * 2.2 : entryFillPrice - indicators.atr14 * 2.2,
    entryFee,
    floatingNetPnl: -entryFee,
    estimatedExitValueAfterFee: entryValue - entryFee,
  };
}

function maybeExitPosition(state, indicators, marketPrice, latencyMs, now) {
  const position = state.openPosition;

  if (!position) {
    return;
  }

  let exitSignal = false;
  if (position.side === "long") {
    exitSignal =
      marketPrice <= position.stopPrice ||
      marketPrice >= position.targetPrice ||
      marketPrice < indicators.ema20 ||
      indicators.rsi14 < 48;
  } else {
    exitSignal =
      marketPrice >= position.stopPrice ||
      marketPrice <= position.targetPrice ||
      marketPrice > indicators.ema20 ||
      indicators.rsi14 > 52;
  }

  if (!exitSignal) {
    return;
  }

  const feeRate = state.settings.commissionPct / 100;
  const slippageRate = getEffectiveSlippageRate(state.settings.baseSlippagePct, latencyMs);
  
  const exitFillPrice = position.side === "long"
    ? marketPrice * (1 - state.settings.spreadPct / 200 - slippageRate)
    : marketPrice * (1 + state.settings.spreadPct / 200 + slippageRate);
    
  const exitValue = exitFillPrice * position.sizeBtc;
  const entryValue = position.entryValue;
  const exitFee = exitValue * feeRate;
  
  const grossPnl = position.side === "long"
    ? exitValue - entryValue
    : entryValue - exitValue;
    
  const netPnl = grossPnl - position.entryFee - exitFee;

  // Capital recovery includes the returned margin + gained/lost PnL
  state.capital += position.entryValue + netPnl;
  state.totalFeesPaid += exitFee;
  state.totalRealizedPnl += netPnl;
  state.peakCapital = Math.max(state.peakCapital, state.capital);
  state.trades.push({
    ...position,
    exitTime: now,
    exitFillPrice,
    exitFee,
    grossPnl,
    netPnl,
  });
  state.openPosition = null;
}

function updateFloatingPosition(state, marketPrice, latencyMs) {
  const position = state.openPosition;

  if (!position) {
    return;
  }

  const feeRate = state.settings.commissionPct / 100;
  const slippageRate = getEffectiveSlippageRate(state.settings.baseSlippagePct, latencyMs);
  
  const markPriceLong = marketPrice * (1 - state.settings.spreadPct / 200 - slippageRate);
  const markPriceShort = marketPrice * (1 + state.settings.spreadPct / 200 + slippageRate);
  const markPrice = position.side === "long" ? markPriceLong : markPriceShort;
  
  const grossPnl = position.side === "long"
    ? (markPrice - position.entryFillPrice) * position.sizeBtc
    : (position.entryFillPrice - markPrice) * position.sizeBtc;

  const estimatedExitFee = markPrice * position.sizeBtc * feeRate;
  // Exit value after fee is entry margin + gross PnL - exit fee
  const estimatedExitValueAfterFee = position.entryValue + grossPnl - estimatedExitFee;

  position.marketPrice = marketPrice;
  position.floatingNetPnl = grossPnl - position.entryFee - estimatedExitFee;
  position.estimatedExitValueAfterFee = estimatedExitValueAfterFee;

  const equity = state.capital + estimatedExitValueAfterFee;
  state.peakCapital = Math.max(state.peakCapital, equity);

  // Trailing Stop Logic (If profit > 1%, move stop to trail by 1.5%)
  if (position.side === "long") {
    const profitPct = (markPrice - position.entryFillPrice) / position.entryFillPrice;
    if (profitPct > 0.01) {
       const newStop = markPrice * (1 - 0.015);
       if (newStop > position.stopPrice) position.stopPrice = newStop;
    }
  } else {
    const profitPct = (position.entryFillPrice - markPrice) / position.entryFillPrice;
    if (profitPct > 0.01) {
       const newStop = markPrice * (1 + 0.015);
       if (newStop < position.stopPrice) position.stopPrice = newStop;
    }
  }
}

function getEffectiveSlippageRate(baseSlippagePct, latencyMs) {
  const latencyPenaltyPct = Math.min(latencyMs / 1000, 2) * 0.015;
  return (baseSlippagePct + latencyPenaltyPct) / 100;
}

function calculateEma(values, period) {
  const multiplier = 2 / (period + 1);
  let ema = average(values.slice(0, period));

  for (let index = period; index < values.length; index += 1) {
    ema = (values[index] - ema) * multiplier + ema;
  }

  return ema;
}

function calculateRsi(values, period) {
  let gains = 0;
  let losses = 0;

  for (let index = values.length - period; index < values.length; index += 1) {
    const delta = values[index] - values[index - 1];

    if (delta >= 0) {
      gains += delta;
    } else {
      losses += Math.abs(delta);
    }
  }

  const averageGain = gains / period;
  const averageLoss = losses / period || 0.0001;
  const relativeStrength = averageGain / averageLoss;

  return 100 - 100 / (1 + relativeStrength);
}

function calculateAtr(candles, period) {
  const ranges = [];

  for (let index = candles.length - period; index < candles.length; index += 1) {
    const current = candles[index];
    const previousClose = candles[index - 1].close;
    const trueRange = Math.max(
      current.high - current.low,
      Math.abs(current.high - previousClose),
      Math.abs(current.low - previousClose),
    );
    ranges.push(trueRange);
  }

  return average(ranges);
}

function calculateAdx(candles, period) {
  if (candles.length <= period * 2) return 20; // fallback if not enough data
  
  let plusDmSum = 0;
  let minusDmSum = 0;
  let trSum = 0;
  
  // Calculate initial sums
  for (let i = candles.length - period * 2; i < candles.length - period; i++) {
    const current = candles[i];
    const prev = candles[i - 1];
    
    const upMove = current.high - prev.high;
    const downMove = prev.low - current.low;
    
    let plusDm = 0;
    let minusDm = 0;
    
    if (upMove > downMove && upMove > 0) plusDm = upMove;
    if (downMove > upMove && downMove > 0) minusDm = downMove;
    
    const tr = Math.max(
      current.high - current.low,
      Math.abs(current.high - prev.close),
      Math.abs(current.low - prev.close)
    );
    
    plusDmSum += plusDm;
    minusDmSum += minusDm;
    trSum += tr;
  }
  
  let dxs = [];
  
  // Smoothed averages
  for (let i = candles.length - period; i < candles.length; i++) {
    const current = candles[i];
    const prev = candles[i - 1];
    
    const upMove = current.high - prev.high;
    const downMove = prev.low - current.low;
    
    let plusDm = 0;
    let minusDm = 0;
    
    if (upMove > downMove && upMove > 0) plusDm = upMove;
    if (downMove > upMove && downMove > 0) minusDm = downMove;
    
    const tr = Math.max(
      current.high - current.low,
      Math.abs(current.high - prev.close),
      Math.abs(current.low - prev.close)
    );
    
    plusDmSum = plusDmSum - (plusDmSum / period) + plusDm;
    minusDmSum = minusDmSum - (minusDmSum / period) + minusDm;
    trSum = trSum - (trSum / period) + tr;
    
    const diPlus = 100 * (plusDmSum / trSum);
    const diMinus = 100 * (minusDmSum / trSum);
    
    const dx = 100 * Math.abs(diPlus - diMinus) / (diPlus + diMinus || 1);
    dxs.push(dx);
  }
  
  return average(dxs);
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function buildStatusText(state) {
  if (state.streamStatus === "reconnecting") {
    return "Canli akis yeniden baglaniyor";
  }

  if (state.streamStatus === "error") {
    return "Canli akista sorun var";
  }

  if (state.openPosition) {
    return "Paper trade acik, canli fiyat akiyor";
  }

  if (state.signal === "long") {
    return "Yeni mumda long adayi";
  }

  if (state.signal === "short") {
    return "Yeni mumda short adayi";
  }

  if (state.signal === "blocked") {
    return "Risk filtresi aktif";
  }

  return "Izleme modunda";
}

function buildStatusTone(state) {
  if (state.streamStatus === "error") {
    return "negative";
  }

  if (state.openPosition || state.signal === "long") {
    return "positive";
  }
  
  if (state.signal === "short") {
    return "negative";
  }

  if (state.signal === "blocked") {
    return "negative";
  }

  return "neutral";
}

function buildStrategyText(state) {
  const indicators = state.lastMarket?.indicators;

  if (!indicators) {
    return "Veri bekleniyor.";
  }

  return `4 saatlik kapanisa gore calisiyor. Trend filtresi EMA20 > EMA50, momentum filtresi RSI ${indicators.rsi14.toFixed(1)}, oynaklik filtresi ATR %${indicators.atrPct.toFixed(2)}. Yeni pozisyon sadece kapanmis mumda degerlendirilir; bu sayede internet hizi scalp kadar kritik olmaz.`;
}

function buildSetupText(state) {
  const indicators = state.lastMarket?.indicators;

  if (!indicators) {
    return "Kurulum bekleniyor.";
  }

  return `Son kapanis ${formatMoney(indicators.lastClose)}. EMA20 ${formatMoney(indicators.ema20)}, EMA50 ${formatMoney(indicators.ema50)}. Stop kabaca 1.15 ATR, hedef 2.2 ATR. Komisyon %${state.settings.commissionPct.toFixed(3)}, spread %${state.settings.spreadPct.toFixed(3)}, baz slippage %${state.settings.baseSlippagePct.toFixed(3)} varsayiliyor.`;
}

function buildGuardrailText(state) {
  return `Islem basina risk %${state.settings.riskPerTradePct.toFixed(2)} ile sinirli. Pozisyonlar sabit bir sureye zorlanmaz; cikis sadece stop, hedef veya zayiflayan kosullara gore olur. Gecikme 1500 ms ustune cikarsa veya haber tonu belirgin negatifse yeni islem acilmaz. Gun ici dusus limiti %${MAX_DAILY_DRAWDOWN_PCT}.`;
}

function mapSentimentTone(tone) {
  if (tone === "positive") {
    return "positive";
  }

  if (tone === "negative") {
    return "negative";
  }

  return "neutral";
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatSignedMoney(value) {
  return `${value >= 0 ? "+" : "-"}${formatMoney(Math.abs(value))}`;
}

function formatDateTime(timestamp) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(timestamp);
}

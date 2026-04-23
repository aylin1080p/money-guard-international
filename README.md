# BTC Paper Trader

Vite tabanli bu uygulama, `Binance BTCUSDT` public verisini okuyup `4h` mum kapanislarina gore paper-trade sinyali uretir.

## Ne Yapiyor

- Gercek emir gondermez
- `BTCUSDT` icin son fiyat, 24 saatlik degisim ve baglanti gecikmesini ceker
- `EMA20`, `EMA50`, `RSI14`, `ATR14` ile yavas tempolu long filtresi kurar
- Komisyon, spread ve slippage varsayimini net PnL hesabina dahil eder
- Gunluk drawdown filtresi uygular ve cikislari sadece kosullara gore degerlendirir
- Elle girilen haber basliklarini basit bir risk filtresi olarak analiz eder
- Tarayici bildirimi izni verilirse sinyal ve paper trade olaylarini bildirir

## Calistirma

```bash
npm install
npm run dev
```

## Notlar

- Bu surum haberleri otomatik API'den cekmez; haber basliklarini paneldeki alana yapistirarak risk filtresini kullanirsin.
- Haber yorumu yon garantisi vermez. Sadece pozisyon acarken daha secici davranmak icin kullanilir.
- Gercek piyasada fill kalitesi, likidite ve slippage paper sonuclardan farkli olabilir.

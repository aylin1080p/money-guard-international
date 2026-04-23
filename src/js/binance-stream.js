const STREAM_BASE_URL = "wss://stream.binance.com:9443/ws";

export function createTickerStream(symbol, callbacks = {}) {
  const streamName = `${symbol.toLowerCase()}@ticker`;
  const url = `${STREAM_BASE_URL}/${streamName}`;

  let socket = null;
  let reconnectTimerId = 0;
  let manuallyClosed = false;

  const clearReconnect = () => {
    if (reconnectTimerId) {
      window.clearTimeout(reconnectTimerId);
      reconnectTimerId = 0;
    }
  };

  const connect = () => {
    clearReconnect();

    socket = new WebSocket(url);

    socket.addEventListener("open", () => {
      callbacks.onStatusChange?.("connected");
    });

    socket.addEventListener("message", event => {
      try {
        const payload = JSON.parse(event.data);
        callbacks.onTicker?.({
          lastPrice: Number(payload.c),
          priceChangePercent: Number(payload.P),
          highPrice: Number(payload.h),
          lowPrice: Number(payload.l),
          volume: Number(payload.v),
          eventTime: Number(payload.E),
        });
      } catch {
        callbacks.onStatusChange?.("error");
      }
    });

    socket.addEventListener("error", () => {
      callbacks.onStatusChange?.("error");
    });

    socket.addEventListener("close", () => {
      socket = null;

      if (manuallyClosed) {
        callbacks.onStatusChange?.("closed");
        return;
      }

      callbacks.onStatusChange?.("reconnecting");
      reconnectTimerId = window.setTimeout(connect, 2500);
    });
  };

  const disconnect = () => {
    manuallyClosed = true;
    clearReconnect();

    if (socket) {
      socket.close();
    }
  };

  connect();

  return {
    disconnect,
  };
}

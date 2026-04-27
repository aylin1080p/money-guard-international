import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCurrency = createAsyncThunk(
  "currency/fetchAll",
  async (_, thunkAPI) => {
    try {
      // Monobank bazen çok hızlı istek atınca hata verir, bu yüzden beklemeli/kontrollü alıyoruz
      const response = await axios.get("https://api.monobank.ua/bank/currency");
      
      if (!response.data || !Array.isArray(response.data)) return [];

      const filtered = response.data.filter(
        (item) =>
          (item.currencyCodeA === 840 && item.currencyCodeB === 980) || 
          (item.currencyCodeA === 978 && item.currencyCodeB === 980)
      );

      return filtered;
    } catch (error) {
      // Hata alsa bile uygulamayı çökertme, boş dizi dön
      return [];
    }
  }
);
import { createSlice } from '@reduxjs/toolkit';

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    data: [],
    lastUpdated: null, // Zaman damgası burada tutulacak
    isLoading: false,
  },
  reducers: {
    setCurrencyData: (state, action) => {
      state.data = action.payload;
      state.lastUpdated = Date.now(); // Veri geldiğinde anlık zamanı kaydet
    },
  },
});

export const { setCurrencyData } = currencySlice.actions;
export default currencySlice.reducer;

// Selectors & Thunks kısmında limit kontrolü:
export const fetchCurrencyWithLimit = () => async (dispatch, getState) => {
  const { lastUpdated } = getState().currency;
  const ONE_HOUR = 3600000; // Milisaniye cinsinden 1 saat

  if (lastUpdated && Date.now() - lastUpdated < ONE_HOUR) {
    console.log('Veri henüz taze, API isteği atılmadı.');
    return;
  }

  // Eğer 1 saat geçmişse API'den çek
  const data = await getCurrencyData();
  dispatch(setCurrencyData(data));
};
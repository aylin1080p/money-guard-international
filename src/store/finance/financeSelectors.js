export const selectTransactions = state => state.finance?.transactions ?? [];
export const selectTotalBalance = state => state.finance?.totalBalance ?? 0;
export const selectCurrency = state => state.finance?.currency ?? [];
export const selectCategories = state => state.finance?.categories ?? [];

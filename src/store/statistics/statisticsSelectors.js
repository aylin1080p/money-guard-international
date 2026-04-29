export const selectStatistics = state => state.statistics?.categoriesSummary ?? [];
export const selectIncomeSummary = state => state.statistics?.incomeSummary ?? 0;
export const selectExpenseSummary = state => state.statistics?.expenseSummary ?? 0;
export const selectPeriodTotal = state => state.statistics?.periodTotal ?? 0;
export const selectStatisticsMonth = state =>
  state.statistics?.selectedMonth ?? new Date().getMonth() + 1;
export const selectStatisticsYear = state =>
  state.statistics?.selectedYear ?? new Date().getFullYear();
export const selectStatisticsIsLoading = state => state.statistics?.isLoading ?? false;

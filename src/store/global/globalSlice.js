import { createSlice } from "@reduxjs/toolkit";

export const globalInitialState = {
  isLoading: false,
  error: null,
  isLogoutModalOpen: false,
  isAddTransactionModalOpen: false,
  isEditTransactionModalOpen: false,
  isMobileMenuOpen: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState: globalInitialState,

  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    clearError(state) {
      state.error = null;
    },

    openLogoutModal(state) {
      state.isLogoutModalOpen = true;
    },

    closeLogoutModal(state) {
      state.isLogoutModalOpen = false;
    },

    openAddTransactionModal(state) {
      state.isAddTransactionModalOpen = true;
    },

    closeAddTransactionModal(state) {
      state.isAddTransactionModalOpen = false;
    },

    openEditTransactionModal(state) {
      state.isEditTransactionModalOpen = true;
    },

    closeEditTransactionModal(state) {
      state.isEditTransactionModalOpen = false;
    },

    openMobileMenu(state) {
      state.isMobileMenuOpen = true;
    },

    closeMobileMenu(state) {
      state.isMobileMenuOpen = false;
    },

    toggleMobileMenu(state) {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  openLogoutModal,
  closeLogoutModal,
  openAddTransactionModal,
  closeAddTransactionModal,
  openEditTransactionModal,
  closeEditTransactionModal,
  openMobileMenu,
  closeMobileMenu,
  toggleMobileMenu,
} = globalSlice.actions;

export default globalSlice.reducer;

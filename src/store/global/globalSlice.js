import { createSlice } from '@reduxjs/toolkit';

const globalInitialState = {
  isLoading: false,
  error: null,
  isLogoutModalOpen: false,
  isAddTransactionModalOpen: false,
  isEditTransactionModalOpen: false,
  editingTransaction: null,
};

const globalSlice = createSlice({
  name: 'global',
  initialState: globalInitialState,
  reducers: {
    openAddTransactionModal: (state) => {
      state.isAddTransactionModalOpen = true;
    },
    closeAddTransactionModal: (state) => {
      state.isAddTransactionModalOpen = false;
    },
    openEditTransactionModal: (state, action) => {
      state.isEditTransactionModalOpen = true;
      state.editingTransaction = action.payload;
    },
    closeEditTransactionModal: (state) => {
      state.isEditTransactionModalOpen = false;
      state.editingTransaction = null;
    },
    openLogoutModal: (state) => {
      state.isLogoutModalOpen = true;
    },
    closeLogoutModal: (state) => {
      state.isLogoutModalOpen = false;
    },
  },
});

export const {
  openAddTransactionModal,
  closeAddTransactionModal,
  openEditTransactionModal,
  closeEditTransactionModal,
  openLogoutModal,
  closeLogoutModal,
} = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
"use client";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type User = { id: string; name: string; email: string } | null;

export type CompareSnapshot = {
  id: string;
  collegeIds: string[];
  createdAt: string;
};

type AppState = {
  user: User;
  compareIds: string[];
  savedIds: string[];
  compareHistory: CompareSnapshot[];
};

const initialState: AppState = {
  user: null,
  compareIds: [],
  savedIds: [],
  compareHistory: [],
};

const appSlice = createSlice({
  name: "pathwise",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    toggleCompare: (state, action: PayloadAction<string>) => {
      const exists = state.compareIds.includes(action.payload);
      state.compareIds = exists
        ? state.compareIds.filter((id) => id !== action.payload)
        : [...state.compareIds, action.payload].slice(-3);
    },
    removeCompare: (state, action: PayloadAction<string>) => {
      state.compareIds = state.compareIds.filter((id) => id !== action.payload);
    },
    setCompare: (state, action: PayloadAction<string[]>) => {
      state.compareIds = action.payload.slice(0, 3);
    },
    toggleSaved: (state, action: PayloadAction<string>) => {
      state.savedIds = state.savedIds.includes(action.payload)
        ? state.savedIds.filter((id) => id !== action.payload)
        : [...state.savedIds, action.payload];
    },
    setSaved: (state, action: PayloadAction<string[]>) => {
      state.savedIds = action.payload;
    },
    setCompareHistory: (state, action: PayloadAction<CompareSnapshot[]>) => {
      state.compareHistory = action.payload;
    },
    resetWorkspace: (state) => {
      state.compareIds = [];
      state.savedIds = [];
      state.compareHistory = [];
    },
  },
});

export const {
  setUser,
  toggleCompare,
  removeCompare,
  setCompare,
  toggleSaved,
  setSaved,
  setCompareHistory,
  resetWorkspace,
} = appSlice.actions;
export const appReducer = appSlice.reducer;

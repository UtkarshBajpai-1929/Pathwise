"use client";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type User = { id: string; name: string; email: string } | null;

type AppState = {
  user: User;
  compareIds: string[];
  savedIds: string[];
};

const initialState: AppState = {
  user: null,
  compareIds: [],
  savedIds: [],
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
    toggleSaved: (state, action: PayloadAction<string>) => {
      state.savedIds = state.savedIds.includes(action.payload)
        ? state.savedIds.filter((id) => id !== action.payload)
        : [...state.savedIds, action.payload];
    },
    setSaved: (state, action: PayloadAction<string[]>) => {
      state.savedIds = action.payload;
    },
  },
});

export const { setUser, toggleCompare, removeCompare, toggleSaved, setSaved } = appSlice.actions;
export const appReducer = appSlice.reducer;

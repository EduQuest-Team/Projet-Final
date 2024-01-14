/* eslint-disable @typescript-eslint/no-base-to-string */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import axios from 'axios';

const initialState = {
  loading: true,
  pharmaciens: [],
  pharmacie: [],
};

export type MyPharmaciensState = Readonly<typeof initialState>;

const apiUrl = 'api/pharmaciens';

export const getPharmaciens = createAsyncThunk(
  'pharmaciens/get_pharmaciens',
  async ({ zone, ville }: { zone: any; ville: any }) => axios.get<any>(`${apiUrl}/${zone}/${ville}`),
  {
    serializeError: serializeAxiosError,
  },
);

export const getPharmacyByPharmacistId = createAsyncThunk(
  'pharmaciens/get_pharmacy_by_pharmacist_id',
  async ({ pharmacistId }: { pharmacistId: any }) => axios.get<any>(`${apiUrl}/${pharmacistId}/pharmacy`),
  {
    serializeError: serializeAxiosError,
  },
);

export const MyPharmaciensSlice = createSlice({
  name: 'pharmaciens',
  initialState: initialState as MyPharmaciensState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPharmaciens.pending, state => {
        state.loading = true;
      })
      .addCase(getPharmaciens.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          pharmaciens: action.payload.data,
        };
      })
      .addCase(getPharmacyByPharmacistId.pending, state => {
        state.loading = true;
      })
      .addCase(getPharmacyByPharmacistId.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          pharmacie: action.payload.data,
        };
      });
  },
});

// Reducer
export default MyPharmaciensSlice.reducer;

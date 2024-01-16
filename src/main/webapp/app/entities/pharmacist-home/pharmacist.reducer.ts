import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';

const initialState = {
  loading: true,
  pharmacieGuard: [],
};

const apiUrl = 'api/pharmacie-gardes';

// Actions
export type MyPharmacyGuardState = Readonly<typeof initialState>;

export const getPharmacyGuard = createAsyncThunk(
  'pharmacieGarde/fetch_guard',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/ph-garde/${id}`;
    return axios.get<any>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

// slice

export const PharmacyGardeSlice = createSlice({
  name: 'pharmacyGarde',
  initialState: initialState as MyPharmacyGuardState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPharmacyGuard.pending, state => {
        state.loading = true;
      })
      .addCase(getPharmacyGuard.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          pharmacieGuard: action.payload.data,
        };
      });
  },
});

// Reducer
export default PharmacyGardeSlice.reducer;

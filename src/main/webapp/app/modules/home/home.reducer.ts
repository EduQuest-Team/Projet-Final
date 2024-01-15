import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import axios from 'axios';

const initialState = {
  loading: true,
  countStats: {} as any,
  zonesPerCity: [] as any[],
  pharmacyPerCity: [] as any[],
  pharmacyPerZone: [] as any[],

  // pharmacyPerCity: {} as any,
};

export type HomeState = Readonly<typeof initialState>;

const apiUrl = 'api/stats';

export const fetchStatsData = createAsyncThunk('dashboard/fetchData', async (_, { dispatch }) => {
  try {
    await dispatch(getCountStats());
    await dispatch(getZonesPerCity());
    await dispatch(getPharmaciesPerVille());
    await dispatch(getPharmaciesPerZone());
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

export const getCountStats = createAsyncThunk('dashboard/get_count_stats', async () => axios.get<any>(apiUrl), {
  serializeError: serializeAxiosError,
});

export const getZonesPerCity = createAsyncThunk('dashboard/zones_per_ville', async () => axios.get<any>(`${apiUrl}/zones-per-ville`), {
  serializeError: serializeAxiosError,
});

export const getPharmaciesPerVille = createAsyncThunk(
  'dashboard/get_phar_per_ville',
  async () => axios.get<any>(`${apiUrl}/get_phar_per_ville`),
  {
    serializeError: serializeAxiosError,
  },
);
export const getPharmaciesPerZone = createAsyncThunk(
  'dashboard/get-phar-per-zone',
  async () => axios.get<any>(`${apiUrl}/get-phar-per-zone`),
  {
    serializeError: serializeAxiosError,
  },
);
export const DashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState as HomeState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchStatsData.pending, state => {
        state.loading = true;
      })
      .addCase(fetchStatsData.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(getCountStats.fulfilled, (state, action) => {
        return {
          ...state,
          countStats: action.payload.data,
        };
      })
      .addCase(getZonesPerCity.fulfilled, (state, action) => {
        return {
          ...state,
          zonesPerCity: action.payload.data,
        };
      })
      .addCase(getPharmaciesPerZone.fulfilled, (state, action) => {
        return {
          ...state,
          pharmacyPerZone: action.payload.data,
        };
      })
      .addCase(getPharmaciesPerVille.fulfilled, (state, action) => {
        return {
          ...state,
          pharmacyPerCity: action.payload.data,
        };
      });
  },
});

// Reducer
export default DashboardSlice.reducer;

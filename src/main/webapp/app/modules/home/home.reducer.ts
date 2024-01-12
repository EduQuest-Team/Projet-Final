import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import axios from 'axios';

const initialState = {
  loading: true,
  countStats: {} as any,
  zonesPerCity: [] as any[],
  // pwsPerGroup: {} as any,
};

export type HomeState = Readonly<typeof initialState>;

const apiUrl = 'api/stats';

export const fetchStatsData = createAsyncThunk('dashboard/fetchData', async (_, { dispatch }) => {
  try {
    await dispatch(getCountStats());
    await dispatch(getZonesPerCity());
    // await dispatch(getPWsPerGroup());
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

// export const getPWsPerGroup = createAsyncThunk('dashboard/get_pw_per_group', async () => axios.get<any>(`${apiUrl}/pw-per-groupe`), {
//   serializeError: serializeAxiosError,
// });

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
      });
    // .addCase(getPWsPerGroup.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     pwsPerGroup: action.payload.data,
    //   };
    // });
  },
});

// Reducer
export default DashboardSlice.reducer;

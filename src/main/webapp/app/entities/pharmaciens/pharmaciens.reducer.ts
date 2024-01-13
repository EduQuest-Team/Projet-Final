/* eslint-disable @typescript-eslint/no-base-to-string */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import axios from 'axios';

const initialState = {
  loading: true,
  pharmaciens: [],
  // pws: [],
};

export type MyPharmaciensState = Readonly<typeof initialState>;

const apiUrl = 'api/pharmaciens/myPharmaciens';

export const getPharmaciens = createAsyncThunk(
  'pharmaciens/get_pharmaciens',
  async ({ zone, ville }: { zone: any; ville: any }) => axios.get<any>(`${apiUrl}/${zone}/${ville}`),
  {
    serializeError: serializeAxiosError,
  },
);

// export const getPWsByStudentId = createAsyncThunk(
//   'myPharmaciens/get_pws_by_student_id',
//   async ({ studentId }: { studentId: any }) => axios.get<any>(`api/Pharmaciens/${studentId}/pws`),
//   {
//     serializeError: serializeAxiosError,
//   },
// );

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
      });
    // .addCase(getPWsByStudentId.pending, state => {
    //   state.loading = true;
    // })
    // .addCase(getPWsByStudentId.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     loading: false,
    //     pws: action.payload.data,
    //   };
    // });
  },
});

// Reducer
export default MyPharmaciensSlice.reducer;

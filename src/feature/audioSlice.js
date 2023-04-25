import { createSlice } from '@reduxjs/toolkit';
const audioSlice = createSlice({
    name: 'audio',
    initialState: [],
    reducers: {
      setRecordedAudio: (state, action) => action.payload,
    },
  });

  export const { setRecordedAudio } = audioSlice.actions;
  export default audioSlice.reducer;
  
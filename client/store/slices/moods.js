import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allMoods: [],
  selectedMood: null,
  error: null,
};

export const fetchAllMoods = createAsyncThunk('fetchAllMoods', async () => {
  try {
    const { data } = await axios.get('/api/moods');
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
});

export const createMood = createAsyncThunk(
  'createMood',
  async ({ mood, date, userId }) => {
    try {
      const { data: newMood } = await axios.post('/api/moods', {
        mood,
        date,
        userId,
      });
      return { newMood };
    } catch (error) {
      console.error('Unable to create mood.', error);
      return { error };
    }
  }
);

export const deleteMood = createAsyncThunk('deleteMood', async ({ id }) => {
  try {
    const { data } = await axios.delete(`/api/moods/${id}`);
    return { id, data };
  } catch (error) {
    console.error('Unable to delete mood.', error);
    return { error };
  }
});

const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {
    setError: (state, { payload: error }) => {
      state.error = error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllMoods.fulfilled, (state, action) => {
      state.allMoods = action.payload;
    });
    builder.addCase(createMood.fulfilled, (state, { payload }) => {
      if (payload.error) {
        let errorMessage = 'Something went wrong.';
        if (payload.error.response.status === 500) {
          errorMessage = 'Can not create mood.';
        }
        return { ...state, error: errorMessage };
      }
      state.allMoods.push(payload.newMood);
    });
    builder.addCase(deleteMood.fulfilled, (state, { payload }) => {
      state.allMoods = state.allMoods.filter((mood) => mood.id !== payload.id);
    });
  },
});

export const { setError, selectMood, updateMood } = moodSlice.actions;

export const selectAllMoods = (state) => state.mood.allMoods;
export const selectSelectedMood = (state) => state.mood.selectedMood;

export default moodSlice.reducer;

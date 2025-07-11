import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  testimonials: [],
  isloading: false,
  error: null,
};

const TESTIMONIALS_URL = "http://localhost:4000/testimonials";

export const getTestimonialsFromServer = createAsyncThunk(
  "testimonials/getTestimonialsFromServer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(TESTIMONIALS_URL);
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        return data;
      }
    } catch (error) {
      // console.log(error.message);
      return rejectWithValue({ error: "No Testimonials Found" });
    }
  }
);

const testimonialSlice = createSlice({
  name: "Testimonial",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTestimonialsFromServer.pending, (state) => {
        state.isloading = true;
      })
      .addCase(getTestimonialsFromServer.fulfilled, (state, action) => {
        state.isloading = false;
        state.testimonials = action.payload;
      })
      .addCase(getTestimonialsFromServer.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload.error;
      });
  },
});

export default testimonialSlice.reducer;

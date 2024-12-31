import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  filter: "all",
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    addMovie: (state, action) => {
      state.movies.push(action.payload);
    },
    deleteMovie: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setMovies, addMovie, deleteMovie, setFilter } =
  movieSlice.actions;
export default movieSlice.reducer;

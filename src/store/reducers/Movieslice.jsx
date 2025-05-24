import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    info : null,
}

export const MovieSlice = createSlice({
  name: 'Movie',
  initialState,
  reducers: {
    loadmovie : (state , action)=>{
        state.info = action.payload;
        // console.log(action.payload)
        // console.log(state.info)
    },

    removemovie : (state , action)=>{
        state.info = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { loadmovie, removemovie} = MovieSlice.actions

export default MovieSlice.reducer
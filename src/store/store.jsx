import { configureStore } from '@reduxjs/toolkit'
import moviereducer from './reducers/Movieslice'
import personreducer from './reducers/Personslice'
import tveducer from './reducers/Tvslice'

export const store = configureStore({
  reducer: {
    movie : moviereducer,
    tv : tveducer,
    person : personreducer,
  },
})
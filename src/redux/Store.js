import { configureStore } from '@reduxjs/toolkit'
import slideReducer from './Features/slide'
export default configureStore({
    reducer: {
        slide: slideReducer,
    }
})
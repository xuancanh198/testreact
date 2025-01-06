import { createSlice } from '@reduxjs/toolkit'

export const Slice = createSlice({
    name: 'slide',
    initialState: {
        data: 8,
        isModal : false
    },
    reducers: {
        setData(state, action) {
            state.data = action.payload;
        },
        setIsModal(state, action) {
            state.isModal = action.payload;
        },
    }
})


export const {
    setData,
    setIsModal
} = Slice.actions;
export default Slice.reducer;

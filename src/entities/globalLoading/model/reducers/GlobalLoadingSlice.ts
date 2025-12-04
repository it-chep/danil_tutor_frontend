import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalLoadingInitialState } from "./GlobalLoadingInitialState";

export const GlobalLoadingSlice = createSlice({
    name: 'globalLoading',
    initialState: GlobalLoadingInitialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        }
    }
})

export default GlobalLoadingSlice.reducer
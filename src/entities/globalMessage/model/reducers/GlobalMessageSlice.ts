import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalMessageInitialState } from "./GlobalMessageState";
import { IGlobalMessage } from "../types";



export const GlobalMessageSlice = createSlice({
    name: 'globalMessage',
    initialState: GlobalMessageInitialState,
    reducers: {
        setMessage(state, action: PayloadAction<string>){
            state.globalMessage.message = action.payload;
        },
        setType(state, action: PayloadAction<IGlobalMessage['type']>){
            state.globalMessage.type = action.payload;
        },
        setGlobalMessage(state, action: PayloadAction<IGlobalMessage>){
            state.globalMessage = action.payload;
        }
    }
})

export default GlobalMessageSlice.reducer
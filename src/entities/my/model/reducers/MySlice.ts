import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyInitialState } from "./MyState";
import { IMy } from "../types";


export const MySlice = createSlice({
    name: 'my',
    initialState: MyInitialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string>){
            state.error = action.payload;
        },
        setIsAuth(state, action: PayloadAction<boolean>){
            state.my.isAuth = action.payload;
        },
        setEmail(state, action: PayloadAction<string>){
            state.my.email = action.payload;
        },
        setRole(state, action: PayloadAction<IMy['role']>){
            state.my.role = action.payload;
        },
        setId(state, action: PayloadAction<number>){
            state.my.id = action.payload;
        }
    }
})

export const myReducer =  MySlice.reducer
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { myReducer } from "../../entities/my";
import { globalMessageReducer } from "../../entities/globalMessage";
import { globalLoadingReducer } from "../../entities/globalLoading";
import { studentReducer } from "../../entities/student";


const store = configureStore({
    reducer: {
        myReducer,
        globalMessageReducer,
        globalLoadingReducer,
        studentReducer,
    }
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default store

import { bindActionCreators } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../../../app/store/store"
import { MySlice } from "../../model/reducers/MySlice"




export const useMyActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(MySlice.actions, dispatch)
}
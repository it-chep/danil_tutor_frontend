import { bindActionCreators } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../../../app/store/store"
import { GlobalLoadingSlice } from "../../model/reducers/GlobalLoadingSlice"




export const useGlobalLoadingActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(GlobalLoadingSlice.actions, dispatch)
}
import { bindActionCreators } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../../../app/store/store"
import { GlobalMessageSlice } from "../../model/reducers/GlobalMessageSlice"


export const useGlobalMessageActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(GlobalMessageSlice.actions, dispatch)
}
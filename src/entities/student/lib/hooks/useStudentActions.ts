import { bindActionCreators } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../../../app/store/store"
import { StudentSlice } from "../../model/reducers/StudentSlice"


export const useStudentActions = () => {
    const dispath = useAppDispatch()
    return bindActionCreators(StudentSlice.actions, dispath)
}
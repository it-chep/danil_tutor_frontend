import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StudentInitialState } from "./StudentInitialState";
import { IStudentChange } from "../types";


export const StudentSlice = createSlice({
    name: 'student',
    initialState: StudentInitialState,
    reducers: {
        setStudent(state, action: PayloadAction<IStudentChange>){
            state.student = action.payload;
        },
        setFirstName(state, action: PayloadAction<string>){
            state.student.first_name = action.payload;
        },
        setLastName(state, action: PayloadAction<string>){
            state.student.last_name = action.payload;
        },
        setMiddleName(state, action: PayloadAction<string>){
            state.student.middle_name = action.payload;
        },
        setPhone(state, action: PayloadAction<string>){
            state.student.phone = action.payload;
        },
        setTg(state, action: PayloadAction<string>){
            state.student.tg = action.payload;
        },
        setCostPerHour(state, action: PayloadAction<string>){
            state.student.cost_per_hour = action.payload;
        },
        setSubjectId(state, action: PayloadAction<number>){
            state.student.subject_id = action.payload;
        },
        setTutorId(state, action: PayloadAction<number>){
            state.student.tutor_id = action.payload;
        },
        setParentFullName(state, action: PayloadAction<string>){
            state.student.parent_full_name = action.payload;
        },
        setParentPhone(state, action: PayloadAction<string>){
            state.student.parent_phone = action.payload;
        },
        setParentTg(state, action: PayloadAction<string>){
            state.student.parent_tg = action.payload;
        },
        setInitialState(state, action: PayloadAction<void>){
            state.student = StudentInitialState.student;
        },
        setTgAdminUsername(state, action: PayloadAction<string>){
            state.student.tg_admin_username = action.payload;
        }
    }
})

export default StudentSlice.reducer
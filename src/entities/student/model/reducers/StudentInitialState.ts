import { IStudentInitialState } from "../types";




export const StudentInitialState: IStudentInitialState = {
    student: {
        first_name: '',
        last_name: '',
        middle_name: '',
        phone: '',
        tg: '',
        cost_per_hour: '',
        subject_id: -1,
        tutor_id: -1,
        parent_full_name: '',
        parent_phone: '',
        parent_tg: '',
        tg_admin_username: ''
    },
    isLoading: false,
    error: ''
}
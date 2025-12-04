
export interface IStudent {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    tg: string;
    parent_full_name: string;
    is_only_trial_finished: boolean;
    is_balance_negative: boolean;
    is_newbie: boolean;
    balance: string;
}

export interface IStudentData {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    phone: string;
    tg: string;
    cost_per_hour: string;
    subject_name : string;
    subject_id: number;
    tutor_name: string;
    tutor_id: number;
    parent_full_name: string;
    parent_phone: string;
    parent_tg: string;
    balance: string;
    is_only_trial_finished: boolean;
    is_balance_negative: boolean;
    tg_admin_username: string;
    is_newbie: boolean;
    tg_id?: number;
}

export interface IStudentChange {
    id?: number,
    first_name: string;
    last_name: string;
    middle_name: string;
    phone: string;
    tg: string;
    cost_per_hour: string;
    subject_id: number;
    tutor_id: number;
    parent_full_name: string;
    parent_phone: string;
    parent_tg: string;
    tg_admin_username: string;
}

export interface IStudentInitialState {
    student: IStudentChange;
    isLoading: boolean;
    error: string;
}

export interface IStudentFinance {
    count: number;
    amount: string;
}

export interface ILesson{
    id: number;
    student_id: number;
    tutor_id: number;
    student_full_name: string;   
    date: string;
    duration_minutes: number;
}

export interface ITransactions {
    id: string;
    created_at: string;
    amount: string;
    is_confirmed: boolean;
}

export interface INotifications {
    id: number;
    created_at: string;
}
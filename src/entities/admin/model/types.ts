


export interface IAdmin {
    id: number;
    full_name: string;
    tg: string;
}

export interface IAdminData {
    id: number;
    full_name: string;
    phone: string;
    tg: string;
}

export interface IAdminCreate {
    full_name: string;
    phone: string;
    tg: string;
    email: string;
}

export interface ITransactionsAdmin {
    id: string;
    created_at: string;
    amount: string;
    is_confirmed: boolean;
    student_name: string;
    student_id: number;
}

export interface IAdminLesson {
    id: number;
    student_id: number;
    tutor_id: number;
    tutor_name: string;   
    student_name: string;
    created_at: string;
    duration_in_minutes: number;
}

export interface IAdminFinance {
    profit: string;
    cash_flow: string;
    conversion: number;
    lessons_count: number;
    base_lessons: number;
    trial_lessons: number;
}
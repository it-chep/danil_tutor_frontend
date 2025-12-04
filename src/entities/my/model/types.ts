
export type TRole = "tutor" | "admin" | "super_admin"

export interface IMy {
    id: number;
    role: TRole,
    email: string;
    isAuth: boolean;
}

export interface IMyInitialState {
    my: IMy;
    isLoading: boolean;
    error: string;
}


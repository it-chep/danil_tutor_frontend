import { IMyInitialState } from "../types";


export const MyInitialState: IMyInitialState = {
    my: {
        id: -1,
        email: '',
        isAuth: false,
        role: 'tutor',
    },
    isLoading: false,
    error: ''
} 
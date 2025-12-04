import { IGlobalMessageInitialState } from "../types";

export const GlobalMessageInitialState: IGlobalMessageInitialState = {
    globalMessage: {
        message: '',
        type: 'ok'
    },
    isLoading: false,
    error: ''
}
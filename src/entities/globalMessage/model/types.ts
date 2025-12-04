


export interface IGlobalMessage {
    message: string;
    type: 'ok' | 'error'
}

export interface IGlobalMessageInitialState {
    globalMessage: IGlobalMessage;
    isLoading: boolean;
    error: string;
}
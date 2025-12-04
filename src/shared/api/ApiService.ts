import { AuthError } from "../lib/helpers/AuthError";

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;
const requestQueue: Array<() => void> = [];

async function refreshToken(): Promise<string> {
    const authError = async (res: Response) => {
        const {message}: {message: string} = await res.json()
        throw new AuthError(message)
    }
    try {
        const newToken = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/auth/refresh`, {
            credentials: 'include'
        })
        if(!newToken.ok) await authError(newToken)
        const res: {token: string} = await newToken.json()
        return res.token;
    } 
    catch (error) {
        throw new Error('Failed to refresh token');
    }
}

export async function handleUnauthorized(requestFn: () => Promise<Response>): Promise<Response> {
    
    if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshToken();
        try {
            const newToken = await refreshPromise;
            localStorage.setItem('auth_token', newToken);
            
            // Выполняем все запросы из очереди
            requestQueue.forEach(cb => cb());
            requestQueue.length = 0;
            
            return requestFn(); // Повторяем исходный запрос
        } 
        finally {
            isRefreshing = false;
            refreshPromise = null;
        }
    } else {
    // Если refresh уже в процессе, ставим запрос в очередь
        return new Promise((resolve) => {
            requestQueue.push(() => {
                resolve(requestFn());
            });
        });
    }
}

export const fetchAuth = async (url: string, init?: RequestInit, isRetry?: boolean): Promise<Response> => {
    const newInit: RequestInit = {...init};

    newInit.headers = {
        ...newInit.headers,
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    } 
    newInit.credentials = 'include'
    const res = await fetch(url, newInit)

    const authError = async (res: Response) => {
        const {message}: {message: string} = await res.json()
        throw new AuthError(message)
    }

    if(!res.ok) {
        if((res.status === 401 || res.status === 403)){
            if(!isRetry){
                return await handleUnauthorized(() => fetchAuth(url, init, true))
            }
            else{
                await authError(res)
            }
        }
        else{
            throw new Error('Ошибка в запросе')
        }
    }
    
    return res
}

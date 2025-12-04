import { FC, useState } from "react";
import classes from './auth.module.scss'
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { myService, useMyActions } from "../../../entities/my";
import { VisiblePassword } from "../../../features/visiblePassword";
import { MyButton } from "../../../shared/ui/button";
import { useAppSelector } from "../../../app/store/store";
import { AUTH_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from "../../../app/router/routes";
import { AuthError } from "../../../shared/err/AuthError";


export const AuthVerify: FC = () => {

    const router = useNavigate()

    const {my, isLoading, error} = useAppSelector(s => s.myReducer)
    const {setIsAuth, setId, setRole, setIsLoading, setError} = useMyActions()

    const {pathname} = useLocation()
    const isLogin = pathname === LOGIN_ROUTE.path;

    const {setState} = useOutletContext<{setState: (state: 1 | 2) => void}>()

    const [code, setCode] = useState<string>('')

    const onClick = async () => {
        try{
            setIsLoading(true)
            if(isLogin){
                await myService.loginVerify(my.email, code)
            }
            else{
                await myService.registerVerify(my.email, code)
            }
            const user = await myService.getInfo()
            setId(user.id)
            setRole(user.role)
            setIsAuth(true)
            router(HOME_ROUTE.path)
            setState(1)
        }
        catch(e){
            if(e instanceof AuthError){
                setError(e.message)
            }
            else{
                setError('Неверный код или другая ошибка')
                console.log(e)
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    const onBack = () => {
        if(isLoading) return 
        setState(1)
        router(AUTH_ROUTE.path)
    }

    return (
        <section className={classes.container}>
            <h1 className={classes.title}>{isLogin ? 'Вход' : 'Регистрация'}</h1>
            <p>Код для подтверждения отпрален на ваш email, введите его ниже</p>
            <VisiblePassword 
                placeholder="Введите код из письма..."
                value={code} 
                setValue={setCode} 
                isLoading={isLoading}
                setError={setError}
            />
            <section className={classes.button}>
                <MyButton
                    onClick={onClick}
                    isLoading={isLoading}
                    error={error}
                >
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </MyButton>
            </section>
            <section 
                onClick={onBack}
                className={classes.back + (isLoading ? ` ${classes.disabled}` : '')}
            >
                Вернуться назад
            </section>
        </section>
    )
}
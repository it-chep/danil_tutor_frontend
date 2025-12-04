import { Navigate, useOutletContext } from 'react-router-dom'
import classes from './auth.module.scss'
import { AUTH_ROUTE } from '../../../app/router/routes'
import { AuthVerify } from '../../../widgets/authVerify'


export default function AuthVerifyPage(){

    const {state} = useOutletContext<{state: 1 | 2}>()

    if(state === 1){
        return <Navigate to={AUTH_ROUTE.path} replace />
    }

    return (
        <section className={classes.wrapper}>
            <AuthVerify />
        </section>
    )
}
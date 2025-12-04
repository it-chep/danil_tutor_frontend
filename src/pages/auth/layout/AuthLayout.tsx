import { useState } from 'react';
import { HOME_ROUTE } from '../../../app/router/routes';
import { useAppSelector } from '../../../app/store/store';
import classes from './auth.module.scss'
import { Navigate, Outlet } from 'react-router-dom';


export default function AuthLayoutPage(){

    const {my} = useAppSelector(s => s.myReducer) 
    const [state, setState] = useState<1 | 2>(1)

    if(my.isAuth){
        return <Navigate to={HOME_ROUTE.path} replace />
    }

    return (
        <section className={classes.wrapper}>
            <Outlet context={{state, setState}} />
        </section>
    )
}
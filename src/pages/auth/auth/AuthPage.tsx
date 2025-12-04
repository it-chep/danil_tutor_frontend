import classes from './auth.module.scss'
import { Auth } from '../../../widgets/auth';


export default function AuthPage(){

    return (
        <section className={classes.wrapper}>
            <Auth />
        </section>
    )
}
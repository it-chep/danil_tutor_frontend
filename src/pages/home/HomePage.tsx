import { Logout } from '../../features/logout'
import { NavHome } from '../../widgets/nav'
import classes from './home.module.scss'


export default function HomePage(){


    return (
        <section className={classes.container}>
            <NavHome />
            <Logout />
        </section>
    )
}
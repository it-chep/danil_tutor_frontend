import { Link } from 'react-router-dom'
import { MyButton } from '../../shared/ui/button'
import classes from './notFound.module.scss'
import { HOME_ROUTE } from '../../app/router/routes'

export default function NotFoundPage() {


    return (
        <section className={classes.container}>
            <section className={classes.code}>404</section>
            <section className={classes.text}>Страница не найдена</section>
            <Link to={HOME_ROUTE.path} className={classes.button}>
                <MyButton>
                    На главную
                </MyButton>
            </Link>
        </section>
    )
}
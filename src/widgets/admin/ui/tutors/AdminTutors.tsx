import { FC, PropsWithChildren } from "react";
import classes from './tutors.module.scss'


export const AdminTutors: FC<PropsWithChildren> = ({children}) => {

    
    return (
        <section className={classes.container}>
            <section className={classes.title}>Репетиторы</section>
            {children}
        </section>  
    )
}
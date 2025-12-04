import { FC, PropsWithChildren } from "react";
import classes from './students.module.scss'


export const TutorStudents: FC<PropsWithChildren> = ({children}) => {

    
    return (
        <section className={classes.container}>
            <section className={classes.title}>Студенты</section>
            {children}
        </section>  
    )
}
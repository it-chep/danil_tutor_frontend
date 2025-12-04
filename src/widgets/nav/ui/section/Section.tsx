import { FC } from "react";
import classes from './section.module.scss'
import { Link } from "react-router-dom";


interface IProps {
    title: string;
    sections: {
        title: string;
        link: string;
    }[]
}

export const Section: FC<IProps> = ({title, sections}) => {


    return (
        <section className={classes.container}>
            <section className={classes.title}>{title}</section>
            <ul className={classes.sections}>
                {
                    sections.map(section => 
                        <li key={section.title} className={classes.section}>
                            <Link  
                                to={section.link}
                                className={classes.link}
                            >
                                {section.title}
                            </Link>
                        </li>
                    )
                }
            </ul>
        </section>
    )
}
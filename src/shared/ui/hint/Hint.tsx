import { FC, useState } from "react";
import classes from './hint.module.scss'
import img from '../../lib/assets/question.png'

interface IProps {
    hints: {
        color: string;
        text: string;
    }[]
}

export const Hint: FC<IProps> = ({hints}) => {

    const [open, setOpen] = useState<boolean>(false)



    return (
        <section className={classes.container}>
            <img onClick={() => setOpen(!open)} src={img} />
            {
                open
                    &&
                <ul className={classes.list}>
                    {hints.map((hint, ind) => 
                        <li 
                            key={ind + Math.random()}
                            className={classes.hint}
                        >
                            <span 
                                style={{backgroundColor: hint.color}} 
                                className={classes.color}
                            ></span>
                            <span className={classes.text}>
                                {hint.text}
                            </span>
                        </li>
                    )}
                </ul>
            }
        </section>
    )
}
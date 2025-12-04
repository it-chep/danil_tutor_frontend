import { FC, useState } from "react";
import classes from './date.module.scss'
import { MyInput } from "../../../shared/ui/input";
import { formatDateForInput } from "../../../shared/lib/helpers/formatDateForInput";

interface IProps {
    setError: (err: string) => void;
    setDate: (date: Date) => void;
    date: Date;   
}

export const SelectDate: FC<IProps> = ({date, setDate, setError}) => {

    const [stage, setStage] = useState<1 | 2>(1)

    const onSetDate = (date: string) => {
        const now = new Date()
        const [year, month, day] = date.split('-')
        const fullDate = new Date(+year, +month - 1, +day, now.getHours(), now.getMinutes(), now.getSeconds())
        setDate(fullDate)
    }

    return (
        <section className={classes.container}>
            <section className={classes.header}>
                <section 
                    onClick={() => setStage(1)}
                    className={classes.badge + (stage === 1 ? ` ${classes.selected}` : '')}
                >
                    Сегодня
                </section>
                <section 
                    onClick={() => setStage(2)}
                    className={classes.badge + (stage === 2 ? ` ${classes.selected}` : '')}
                >
                    Выбор даты
                </section>
            </section>
            {
                stage === 2
                    &&
                <section className={classes.input}>
                    <MyInput 
                        setError={setError} 
                        value={formatDateForInput(date)} 
                        setValue={onSetDate} 
                        type="date" 
                    />
                </section>
            }
        </section>
    )
}
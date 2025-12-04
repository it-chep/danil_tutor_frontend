import { FC } from "react";
import classes from './tutorFeatures.module.scss'
import { DeleteAction } from "../../../../features/deleteAction";
import { tutorService } from "../../../../entities/tutor";
import { useNavigate } from "react-router-dom";
import { STUDENTS_ROUTE } from "../../../../app/router/routes";
import { Conducted } from "../conducted/Conducted";

interface IProps{
    id: number;
    newbie: boolean;
}

export type TValue = {name: string, value: string}

export const TutorFeatures: FC<IProps> = ({id, newbie}) => {

    const router = useNavigate()

    const onTrialSession = async () => {
        await tutorService.trialLesson(id)
        router(STUDENTS_ROUTE.path)
    }

    return (
        <section className={classes.container}>
            {
                newbie
                    &&
                <DeleteAction 
                    successText="Пробное занятие проведено"
                    errorText="Ошибка"
                    questionText="Точно хотите провести студенту пробное занятие ?"
                    onDelete={onTrialSession}
                >
                    <section className={classes.button}>Пробное занятие</section>
                </DeleteAction>
            }
            <Conducted id={id} />
        </section>
    )
}
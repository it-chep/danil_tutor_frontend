import { FC } from "react";
import classes from './table.module.scss'
import { ILesson, LessonItem } from "../../../../entities/student";
import { ChangeDurationLesson } from "../../../../features/changeDurationLesson";
import { DeleteAction } from "../../../../features/deleteAction";

interface IProps{
    lessons: ILesson[];
    setData: (ind: number) => (date: string, duration_minutes: number) => void;
    onDelete: (ind: number, lessonId: number) => Promise<void>
}

export const Table: FC<IProps> = ({lessons, setData, onDelete}) => {


    return (
        <table className={classes.table}>
            <thead>
                <tr className={classes.item}>
                    <th>Дата</th>
                    <th>Фио</th>
                    <th>Длительность</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {lessons.map((lesson, ind) => 
                    <LessonItem key={lesson.id} showFio lesson={lesson}>
                        <section className={classes.features}>
                            <ChangeDurationLesson
                                lessonId={lesson.id}
                                durationInit={`${lesson.duration_minutes}`} 
                                dateInit={lesson.date}
                                setData={setData(ind)}
                            />
                            <DeleteAction 
                                questionText="Вы точно хотите удалить занятие ?"
                                successText="Занятие успешно удалено"
                                errorText="Ошибка при удалении занятия"
                                onDelete={() => onDelete(ind, lesson.id)}
                            />
                        </section>
                    </LessonItem>
                )}
            </tbody>
        </table>
    )
}
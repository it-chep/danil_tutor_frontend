import { FC, useState, useCallback } from "react";
import classes from './lessons.module.scss'
import { ILesson, LessonItem, studentService } from "../../../entities/student";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useMyActions } from "../../../entities/my";
import { AuthError } from "../../../shared/err/AuthError";
import { Calendar } from "../../../features/calendar";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { DeleteAction } from "../../../features/deleteAction";
import { ChangeDurationLesson } from "../../../features/changeDurationLesson";
import { getDateUTC } from "../../../shared/lib/helpers/getDateUTC";
import { OpenContainer } from "../../../features/openContainer";

interface IProps {
    studentId: number;
}

export const Lessons: FC<IProps> = ({studentId}) => {

    const [lessons, setLessons] = useState<ILesson[] | null>(null) 
    const [count, setCount] = useState<number>(0)   
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {setGlobalMessage} = useGlobalMessageActions()    
    const {setIsAuth} = useMyActions()
            
    const setDate = useCallback((startDate: Date | null, endDate: Date | null) => {
        if(startDate && endDate){
            getLessons(getDateUTC(startDate), getDateUTC(endDate))
        }
    }, [])

    const setData = (ind: number) => {
        return (date: string, duration_minutes: number) => {
            setLessons(prev => prev ? prev.map((l, index) => index === ind ? {...l, date, duration_minutes} : l): prev)
        }
    }

    const onDelete = async (ind: number, lessonId: number) => {
        await studentService.deleteLesson(lessonId)
        setLessons(prev => prev ? prev.filter((l, i) => i !== ind) : prev)
    }

    const getLessons = async (from: string, to: string) => {
        try{
            setIsLoading(true)
            const lessonsRes = await studentService.getLessons(studentId, from, to)
            setLessons(lessonsRes.lessons)
            setCount(lessonsRes.lessons_count)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении занятий студента', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.container}>
            <OpenContainer title="Занятия">
                <section className={classes.content}>
                    <Calendar onDateRangeSelect={setDate} />
                    {
                        isLoading
                            ?
                        <section className={classes.loader}><LoaderSpinner /></section>
                            :
                        lessons
                            &&
                        <>
                            <section className={classes.count}>Кол-во занятий: {count}</section>
                        {
                            lessons?.length
                                ?
                            <section className={classes.wrapTable}>
                                <table className={classes.table}>
                                    <thead>
                                        <tr className={classes.item}>
                                            <th>Дата</th>
                                            <th>Длительность</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lessons.map((lesson, ind) => 
                                            <LessonItem key={lesson.id} lesson={lesson}>
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
                            </section>
                                :
                            <></>
                        }
                        </>
                    }
                </section>
            </OpenContainer>
        </section>
    )
}
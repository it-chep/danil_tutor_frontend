import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './tutorWidget.module.scss'
import { ITutor, ITutorData } from "../../../../entities/tutor/model/types";
import { useMyActions } from "../../../../entities/my";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { TutorCard, tutorService } from "../../../../entities/tutor";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import { TutorCalendar } from "../calendar/TutorCalendar";
import { TutorStudents } from "../students/TutorStudents";
import { DeleteAction } from "../../../../features/deleteAction";
import { TUTORS_ROUTE } from "../../../../app/router/routes";
import { StudentsMove } from "../../../../features/studentsMove";

interface IProps {
    id: number;
    tutorLessons?: React.ReactNode;
}

export const TutorWidget: FC<IProps & PropsWithChildren> = ({id, tutorLessons, children}) => {

    const [isLoaing, setIsLoading] = useState<boolean>(true)
    const [tutor, setTutor] = useState<ITutorData>()
    const [newTutor, setNewTutor] = useState<ITutor>()
    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const [isStudentsMove, setIsStudentsMove] = useState<boolean>(false)

    const router = useNavigate()

    const getData = async () => {
        try{
            if(id){
                setIsLoading(true)
                const tutorRes = await tutorService.get(+id)
                setTutor(tutorRes)
            }
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении данных о репетиторе', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const onDelete = async () => {
        if(tutor){
            await tutorService.delete(tutor.id)
            router(TUTORS_ROUTE.path)
        }
    }

    const onMove = (tutor: ITutor) => {
        setNewTutor(tutor)
        setIsStudentsMove(true)
    }

    return (
        <section className={classes.container}>   
            {
                isLoaing
                    ?
                <section></section>
                    :
                tutor
                    &&
                <>
                    <section className={classes.delete}>
                        <DeleteAction
                            successText="Репетитор удален"        
                            errorText="Ошибка при удалении репетитора"
                            onDelete={onDelete}
                            questionText="Точно хотите удалить Репетитора ?"
                        />
                    </section>
                    <TutorCard
                        tutor={tutor}
                    >
                        <TutorCalendar id={tutor.id} />
                    </TutorCard>
                    {
                        !isStudentsMove
                            &&
                        <section className={classes.move}>
                            <StudentsMove
                                title="Перенести студентов к новому репетитору" 
                                tutorId={tutor.id}
                                onSelected={onMove}
                                />
                        </section>
                    }
                    {
                        tutorLessons
                            &&
                        <section className={classes.tutorLessons}>
                            {tutorLessons}
                        </section>
                    }
                    <TutorStudents>
                        {
                            isStudentsMove
                                ?
                            <span>Студенты были перемещены к репетитору: {newTutor?.full_name}</span>
                                :
                            children
                        }
                    </TutorStudents>
                </>
            }
        </section>
    )
}
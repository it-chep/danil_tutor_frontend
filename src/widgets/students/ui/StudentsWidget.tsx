import { FC, useEffect, useRef, useState } from "react";
import classes from './studentsWidget.module.scss'
import { IStudent, StudentItem, studentService } from "../../../entities/student";
import { MyButton } from "../../../shared/ui/button";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { AuthError } from "../../../shared/lib/helpers/AuthError";
import { useMyActions } from "../../../entities/my";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useNavigate } from "react-router-dom";
import { STUDENT_CREATE_ROUTE } from "../../../app/router/routes";
import { useAppSelector } from "../../../app/store/store";
import { HintWrap } from "./hint/Hint";
import { SearchItems } from "../../../features/searchItems";
import { StudentFilters } from "../../../features/studentFilters";

interface IProps {
    request: () => Promise<{students: IStudent[], students_count: number}>
    add: boolean;
    highlight?: boolean;
}

export const StudentsWidget: FC<IProps> = ({request, add, highlight=true}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [students, setStudents] = useState<IStudent[]>([])
    const [studentsCount, setStudentsCount] = useState<number>(0)
    const [studentsSearch, setStudentsSearch] = useState<IStudent[]>([])

    const router = useNavigate()

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const {my} = useAppSelector(s => s.myReducer)

    const getData = async (req: () => Promise<{students: IStudent[], students_count: number}>) => {
        try{
            setIsLoading(true)
            const studentsRes = await req()
            setStudentsCount(studentsRes.students_count)
            setStudents(studentsRes.students)
            setStudentsSearch(studentsRes.students)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении списка студентов', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    const isOne = useRef<boolean>(true)
    const onSelectedFilters = (tgAdmins: string[], isLost: boolean) => {
        if(isOne.current){
            isOne.current = false
            return
        }
        if(tgAdmins.length || isLost){
            getData(() => studentService.getAllByFilters(tgAdmins, isLost))
        }
        else{
            getData(request)
        }
    }

    useEffect(() => {
        getData(request)
    }, [])

    return (
        <section className={classes.container}>
            {
                (add || highlight)
                    &&
                <section className={classes.header}>
                    {
                        highlight
                            &&
                        <HintWrap />
                    }
                    {
                        my.role === 'admin'
                            &&
                        <section className={classes.filter}>
                            <StudentFilters onSelectedFilters={onSelectedFilters} />
                        </section>
                    }
                    {
                        add 
                            &&
                        <section className={classes.button}> 
                            <MyButton onClick={() => router(STUDENT_CREATE_ROUTE.path)}>
                                Добавить студента
                            </MyButton>
                        </section>
                    }
                </section>
            }
            <section className={classes.search}>
                <section className={classes.searchItems}>
                    <SearchItems
                        placeholder="Введите фио студента или родителя"
                        items={students.map(
                            student => ({
                                ...student, 
                                name: student.last_name + ' ' + student.first_name + ' ' + student.middle_name + ' ' + student.parent_full_name
                            })
                        )}
                        setItems={setStudentsSearch}
                    />
                </section>
                {
                    !isLoading
                        &&
                    <section>
                        Кол-во студентов: {studentsCount}
                    </section>
                }
            </section>
            {
                isLoading
                    ?
                <section className="loader"><LoaderSpinner /></section>
                    :
                <table className={classes.table}>
                    <thead>
                        <tr className={classes.item}>
                            <th>ID</th>
                            <th>Фио</th>
                            {
                                my.role !== 'tutor'
                                    &&
                                <>
                                    <th>Фио родителя</th>
                                    <th>Телеграм</th>
                                    <th>Баланс</th>
                                </>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {studentsSearch.map(student => 
                            <StudentItem 
                                highlight={highlight}
                                key={student.id}
                                student={student}
                            >
                                <MyButton onClick={() => router('/student/' + student.id)}>
                                    Подробнее
                                </MyButton>
                            </StudentItem>
                        )}
                    </tbody>
                </table>
            }
        </section>
    )
}
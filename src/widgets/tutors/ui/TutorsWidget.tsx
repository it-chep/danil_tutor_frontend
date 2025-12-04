import { FC, useEffect, useState } from "react";
import classes from './tutorsWidget.module.scss'
import { MyButton } from "../../../shared/ui/button";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { AuthError } from "../../../shared/lib/helpers/AuthError";
import { useMyActions } from "../../../entities/my";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useNavigate } from "react-router-dom";
import { TUTOR_CREATE_ROUTE } from "../../../app/router/routes";
import { ITutor, TutorItem } from "../../../entities/tutor";
import { HintWrap } from "./hint/Hint";
import { SearchItems } from "../../../features/searchItems";

interface IProps {
    request: () => Promise<{tutors: ITutor[], tutors_count: number}>
    add: boolean;
    highlight?: boolean;
}

export const TutorsWidget: FC<IProps> = ({add, request, highlight=true}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [tutors, setTutors] = useState<ITutor[]>([])
    const [tutorsSearch, setTutorsSearch] = useState<ITutor[]>([])
    const [tutorsCount, setTutorsCount] = useState<number>(0)

    const router = useNavigate()

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const getData = async () => {
        try{
            setIsLoading(true)
            const tutorsRes = await request()
            setTutors(tutorsRes.tutors)
            setTutorsSearch(tutorsRes.tutors)
            setTutorsCount(tutorsRes.tutors_count)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении списка репетиторов', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
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
                        add 
                            &&
                        <section className={classes.button}> 
                            <MyButton onClick={() => router(TUTOR_CREATE_ROUTE.path)}>
                                Добавить репетитора
                            </MyButton>
                        </section>
                    }
                </section>
            }
            <section className={classes.search}>
                <section className={classes.searchItems}>
                    <SearchItems
                        placeholder="Введите фио репетитора"
                        items={tutors.map(
                            tutor => ({...tutor, name: tutor.full_name})
                        )}
                        setItems={setTutorsSearch}
                    />
                </section>
                {
                    !isLoading
                        &&
                    <section>
                        Кол-во репетиторов: {tutorsCount}
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
                            <th>Телеграм</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tutorsSearch.map(tutor => 
                            <TutorItem 
                                highlight={highlight}
                                key={tutor.id}
                                tutor={tutor}
                            >
                                <MyButton onClick={() => router('/tutor/' + tutor.id)}>
                                    Подробнее
                                </MyButton>
                            </TutorItem>
                        )}
                    </tbody>
                </table>
            }
        </section>
    )
}
import { FC, useCallback, useState } from "react";
import { INotifications, ITransactions, NotificationItem, studentService, TransactionItem } from "../../../entities/student";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useMyActions } from "../../../entities/my";
import { AuthError } from "../../../shared/err/AuthError";
import classes from './notifications.module.scss'
import { Calendar } from "../../../features/calendar";
import { OpenContainer } from "../../../features/openContainer";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { getDateUTC } from "../../../shared/lib/helpers/getDateUTC";


interface IProps {
    studentId: number;
}

export const Notifications: FC<IProps> = ({studentId}) => {

    const [notifications, setNotifications] = useState<INotifications[] | null>(null)    
    const [count, setCount] = useState<number>(0)   
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {setGlobalMessage} = useGlobalMessageActions()    
    const {setIsAuth} = useMyActions()

    const getNotifications = async (from: string, to: string) => {
        try{
            setIsLoading(true)
            const notificationsRes = await studentService.notifications(studentId, from, to)
            setNotifications(notificationsRes.notifications)
            setCount(notificationsRes.notifications_count)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении историй уведомлений студента', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    const setDate = useCallback((startDate: Date | null, endDate: Date | null) => {
        if(startDate && endDate){
            getNotifications(getDateUTC(startDate), getDateUTC(endDate))
        }
    }, [])

    return (
        <section className={classes.container}>
            <OpenContainer title="История уведомлений">
                <section className={classes.content}>
                    <Calendar onDateRangeSelect={setDate} />
                    {
                        isLoading
                            ?
                        <section className={classes.loader}><LoaderSpinner /></section>
                            :
                        notifications
                            &&
                        <>
                        {
                            !isLoading
                                &&
                            <section className={classes.count}>Кол-во занятий: {count}</section>
                        }
                        {
                            notifications.length
                                ?
                            <section className={classes.wrapTable}>
                                <table className={classes.table}>
                                    <thead>
                                        <tr className={classes.item}>
                                            <th>Дата</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {notifications.map((notification, ind) => 
                                            <NotificationItem 
                                                key={notification.id} 
                                                notification={notification} 
                                            />
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
import { FC, useState } from "react";
import classes from './adminCalendar.module.scss'
import { LoaderSpinner } from "../../../../shared/ui/spinner";
import {  } from "../../../../entities/tutor";
import { Calendar } from "../../../../features/calendar";
import { adminService, IAdminFinance } from "../../../../entities/admin";
import { useMyActions } from "../../../../entities/my";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import { getDateUTC } from "../../../../shared/lib/helpers/getDateUTC";

interface IProps {
    id: number;
}

export const AdminCalendar: FC<IProps> = ({id}) => {

    const [finance, setFinance] = useState<IAdminFinance | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const getData = async (startDate: string, endDate: string) => {
        try{
            setIsLoading(true)
            const financeRes = await adminService.getFinance(startDate, endDate, id)
            setFinance(financeRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении данных', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    const setDate = (startDate: Date | null, endDate: Date | null) => {
        if(startDate && endDate){
            getData(getDateUTC(startDate), getDateUTC(endDate))
        }
        if(!startDate && !endDate){
            setFinance(null)
        }
    }

    return (
        <section className={classes.container}>
            <Calendar
                onDateRangeSelect={setDate} 
                isLoading={isLoading}
            />
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderSpinner /></section>
                    :
                finance
                    &&
                <section className={classes.data}>
                    <section className={classes.section}> 
                        <section className={classes.subtitle}>Общее</section>
                        <span>Прибыль: {finance.profit} ₽</span>
                        <span>Валовая прибыль (выручка): {finance.cash_flow} ₽</span>
                    </section>
                    <section className={classes.section}> 
                        <section className={classes.subtitle}>Репетиторы</section>
                        <span>Количество оплаченных занятий : {finance.base_lessons}</span>
                        <span>Количество пробных занятий: {finance.trial_lessons}</span>
                        <span>Общее количество занятий: {finance.lessons_count}</span>
                        <span>Конверсия: {finance.conversion} %</span>
                    </section>
                </section>
            }
        </section>
    )
}
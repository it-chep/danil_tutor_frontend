import { FC, useState } from "react";
import classes from './financeWidget.module.scss'
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useMyActions } from "../../../entities/my";
import { AuthError } from "../../../shared/lib/helpers/AuthError";
import { Calendar } from "../../../features/calendar";
import { useAppSelector } from "../../../app/store/store";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { adminService, IAdminFinance } from "../../../entities/admin";
import { getDateUTC } from "../../../shared/lib/helpers/getDateUTC";


export const FinanceWidget: FC = () => {

    const {my} = useAppSelector(s => s.myReducer)
    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsLoading} = useGlobalLoadingActions()
    const [finance, setFinance] = useState<IAdminFinance | null>(null)
    
    const getData = async (startDate: string, endDate: string) => {
        try{
            setIsLoading(true)
            const financeRes = await adminService.getFinance(startDate, endDate, my.id)
            setFinance(financeRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении данных о финансах', type: 'error'})
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
            <Calendar onDateRangeSelect={setDate}/> 
            {
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
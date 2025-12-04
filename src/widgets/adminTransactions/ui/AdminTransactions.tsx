import { FC, useCallback, useEffect, useState } from "react";
import classes from './adminTransactions.module.scss'
import { adminService, AdminTransactionItem, ITransactionsAdmin } from "../../../entities/admin";
import { AuthError } from "../../../shared/err/AuthError";
import { useMyActions } from "../../../entities/my";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { Calendar } from "../../../features/calendar";
import { getDateUTC } from "../../../shared/lib/helpers/getDateUTC";


export const AdminTransactions: FC = () => {

    const [transactions, setTransactions] = useState<ITransactionsAdmin[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const [count, setCount] = useState<number>(0)   

    const getData = async (from: string, to: string) => {
        try{
            setIsLoading(true)
            const transactionsRes = await adminService.getTransactions(from, to)
            setTransactions(transactionsRes.transactions)
            setCount(transactionsRes.transactions_count)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении списка транзакций', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }
    
    const setDate = useCallback((startDate: Date | null, endDate: Date | null) => {
        if(startDate && endDate){
            getData(getDateUTC(startDate), getDateUTC(endDate))
        }
    }, [])
    
    return (
        <section className={classes.container}>
            <Calendar onDateRangeSelect={setDate} />
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderSpinner /></section>
                    :
                transactions
                    &&
                <>
                {
                    !isLoading  
                        &&
                    <section className={classes.count}>Кол-во транзакций: {count}</section>
                }
                {
                    transactions.length
                        ?
                    <table className={classes.table}>
                        <thead>
                            <tr className={classes.item}>
                                <th>Дата</th>
                                <th>Сумма</th>
                                <th>Подтвержденная</th>
                                <th>ФИО студента</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, ind) => 
                                <AdminTransactionItem 
                                    key={transaction.id} 
                                    transaction={transaction} 
                                />
                            )}
                        </tbody>
                    </table>
                        :
                    <></>
                }
                </>
            }
        </section>
    )
}
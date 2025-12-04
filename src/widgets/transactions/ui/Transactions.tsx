import { FC, useCallback, useState } from "react";
import { ITransactions, studentService, TransactionItem } from "../../../entities/student";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useMyActions } from "../../../entities/my";
import { AuthError } from "../../../shared/err/AuthError";
import classes from './transactions.module.scss'
import { Calendar } from "../../../features/calendar";
import { OpenContainer } from "../../../features/openContainer";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { getDateUTC } from "../../../shared/lib/helpers/getDateUTC";


interface IProps {
    studentId: number;
}

export const Transactions: FC<IProps> = ({studentId}) => {

    const [transactions, setTransactions] = useState<ITransactions[] | null>(null)    
    const [count, setCount] = useState<number>(0)   
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {setGlobalMessage} = useGlobalMessageActions()    
    const {setIsAuth} = useMyActions()

    const getTransactions = async (from: string, to: string) => {
        try{
            setIsLoading(true)
            const transactionsRes = await studentService.transactions(studentId, from, to)
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
                setGlobalMessage({message: 'Ошибка при получении транзакций студента', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    const setDate = useCallback((startDate: Date | null, endDate: Date | null) => {
        if(startDate && endDate){
            getTransactions(getDateUTC(startDate), getDateUTC(endDate))
        }
    }, [])

    return (
        <section className={classes.container}>
            <OpenContainer title="Транзакции">
                <section className={classes.content}>
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
                            <section className={classes.wrapTable}>
                                <table className={classes.table}>
                                    <thead>
                                        <tr className={classes.item}>
                                            <th>Дата</th>
                                            <th>Сумма</th>
                                            <th>Подтвержденная</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map((transaction, ind) => 
                                            <TransactionItem 
                                                key={transaction.id} 
                                                transaction={transaction} 
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
import { FC } from "react";
import { ITransactions } from "../../model/types";
import classes from './transactionItem.module.scss'
import { getLocaleDate } from "../../../../shared/lib/helpers/getLocalDate";

interface IProps {
    transaction: ITransactions;
}

export const TransactionItem: FC<IProps> = ({transaction}) => {

    return (
        <tr 
            className={classes.item}
        >
            <td>
                {getLocaleDate(new Date(transaction.created_at + 'Z'), true)}
            </td>  
            <td>
                {transaction.amount}
            </td>
            <td>
                {transaction.is_confirmed ? <>&#9989;</> : <>&#10060;</>}
            </td>
        </tr>
    )
}
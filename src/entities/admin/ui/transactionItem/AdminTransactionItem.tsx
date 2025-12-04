import { FC } from "react";
import classes from './transactionItem.module.scss'
import { ITransactionsAdmin } from "../../model/types";
import { Link } from "react-router-dom";
import { getLocaleDate } from "../../../../shared/lib/helpers/getLocalDate";

interface IProps {
    transaction: ITransactionsAdmin;
}

export const AdminTransactionItem: FC<IProps> = ({transaction}) => {

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
            <td>
                <Link to={'/student/' + transaction.student_id}>{transaction.student_name}</Link>
            </td>  
        </tr>
       )
}
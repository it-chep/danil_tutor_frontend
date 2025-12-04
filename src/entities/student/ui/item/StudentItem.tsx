import { FC, PropsWithChildren } from "react";
import classes from './studentItem.module.scss'
import { IStudent } from "../../model/types";
import { useAppSelector } from "../../../../app/store/store";


interface IProps {
    student: IStudent;
    highlight?: boolean;
}


export const StudentItem: FC<IProps & PropsWithChildren> = ({student, highlight, children}) => {

    const {my} = useAppSelector(s => s.myReducer)

    return (
        <tr 
            className={
                classes.item + (
                    highlight
                        ?
                    student.is_balance_negative ? ` ${classes.balanceNegative}` : 
                    student.is_only_trial_finished ? ` ${classes.onlyTrial}` : 
                    student.is_newbie ? ` ${classes.newbie}` : ''
                        :
                    ` ${classes.nohighlight}`
                )
            }
        >
            <td className={classes.id}>
                {student.id}
            </td>  
            <td className={classes.fio}>
                {student.last_name + ' ' + student.first_name + ' ' + student.middle_name}
            </td>
            {
                my.role !== 'tutor'
                    &&
                <>
                    <td className={classes.fio}>
                        {student.parent_full_name}
                    </td>
                    <td className={classes.tg}>
                        <a target="_blank" className={classes.link} href={student.tg}>
                            Написать в ТГ
                        </a>
                    </td>
                    <td>
                        {student.balance} ₽
                    </td>
                </>
            }            
            <td className={classes.feature}>
                {children}
            </td>
        </tr>
    )
}
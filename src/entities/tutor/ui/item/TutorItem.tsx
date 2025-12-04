import { FC, PropsWithChildren } from "react";
import classes from './tutorItem.module.scss'
import { ITutor } from "../../model/types";


interface IProps {
    tutor: ITutor;
    highlight: boolean;
}


export const TutorItem: FC<IProps & PropsWithChildren> = ({tutor, highlight, children}) => {

    return (
        <tr 
            className={
                classes.item + 
                (
                    highlight
                        ?
                    tutor.has_balance_negative ? ` ${classes.balanceNegative}` : 
                    tutor.has_only_trial ? ` ${classes.onlyTrial}` : 
                    tutor.has_newbie ? ` ${classes.newbie}` : ''
                        :
                    ` ${classes.nohighlight}`
                )}
            >
            <td className={classes.id}>
                {tutor.id}
            </td>  
            <td className={classes.fio}>
                {tutor.full_name}
            </td>
            <td className={classes.tg}>
                <a target="_blank" className={classes.link} href={tutor.tg}>
                    Написать в ТГ
                </a>
            </td>
            <td className={classes.feature}>
                {children}
            </td>
        </tr>
    )
}
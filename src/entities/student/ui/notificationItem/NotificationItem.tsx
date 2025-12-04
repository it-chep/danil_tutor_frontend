import { FC } from "react";
import { INotifications } from "../../model/types";
import classes from './notificationItem.module.scss'
import { getLocaleDate } from "../../../../shared/lib/helpers/getLocalDate";


interface IProps {
    notification: INotifications;
}

export const NotificationItem: FC<IProps> = ({notification}) => {

    return (
        <tr 
            className={classes.item}
        >
            <td>
                {getLocaleDate(new Date(notification.created_at + 'Z'), true)}
            </td>  
        </tr>
       )
}
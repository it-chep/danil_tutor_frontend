import { FC, PropsWithChildren } from "react";
import classes from './adminItem.module.scss'
import { useAppSelector } from "../../../../app/store/store";
import { IAdmin } from "../../model/types";


interface IProps {
    admin: IAdmin;
}


export const AdminItem: FC<IProps & PropsWithChildren> = ({admin, children}) => {

    const {my} = useAppSelector(s => s.myReducer)

    return (
        <tr className={classes.item}>
            <td className={classes.id}>
                {admin.id}
            </td>  
            <td className={classes.fio}>
                {admin.full_name}
            </td>
            <td className={classes.tg}>
                <a target="_blank" className={classes.link} href={admin.tg}>
                    Написать в ТГ
                </a>
            </td>
            <td className={classes.feature}>
                {children}
            </td>
        </tr>
    )
}
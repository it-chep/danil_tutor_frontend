import { FC, PropsWithChildren } from "react";
import classes from './adminCard.module.scss'
import { DataList } from "../../../../shared/ui/dataList";
import { IAdminData } from "../../model/types";

interface IProps {
    admin: IAdminData;
}

export const AdminCard: FC<IProps & PropsWithChildren> = ({admin, children}) => {


    return (
        <section className={classes.card}>
            <DataList
                title="Данные"
                list={[
                    `ID: ${admin.id}`,
                    `ФИО: ${admin.full_name}`,
                    `Телефон: ${admin.phone}`,
                    <a 
                        target="_blank" 
                        href={admin.tg} 
                        className={classes.highlight}
                    >
                        Написать в тг
                    </a>
                ]}
            />
            <DataList 
                title="Финансы"
                list={[
                    children
                ]}
            />
        </section>
    )
}
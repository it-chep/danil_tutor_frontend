import { FC, PropsWithChildren } from "react";
import classes from './card.module.scss'
import { ITutorData } from "../../model/types";
import { DataList } from "../../../../shared/ui/dataList";
import { Calendar } from "../../../../features/calendar";

interface IProps {
    tutor: ITutorData;
}

export const TutorCard: FC<IProps & PropsWithChildren> = ({tutor, children}) => {


    return (
        <section className={classes.card}>
            <DataList
                title="Данные"
                list={[
                    `ID: ${tutor.id}`,
                    `ФИО: ${tutor.full_name}`,
                    `Телефон: ${tutor.phone}`,
                    `Стоимость часа: ${tutor.cost_per_hour} ₽`,
                    <a 
                        target="_blank" 
                        href={tutor.tg} 
                        className={classes.highlight}
                    >
                        Написать в тг
                    </a>,
                    `Предмет: ${tutor.subject_name}`,
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
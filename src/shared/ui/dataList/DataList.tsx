import React, { FC } from "react";
import classes from './dataList.module.scss'

interface IProps {
    title: string;
    list: (string | React.ReactNode)[];
}

export const DataList: FC<IProps> = ({title, list}) => {


    return (
        <section className={classes.container}>
            <section className={classes.title}> 
                {title}
            </section>
            <ul className={classes.list}>
                {list.map((l, ind) => 
                    <li className={classes.item} key={ind}>{l}</li>
                )}
            </ul>
        </section>
    )
}
import React, { FC } from "react";
import classes from './table.module.scss'

interface IProps {
    titles: string[];
    rows: (string | React.ReactNode)[][];
}

export const Table: FC<IProps> = ({titles, rows}) => {


    return (
        <table className={classes.table}>
            <thead>
                <tr>
                    {titles.map((title, ind) => 
                        <th key={ind + Math.random()}>{title}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, ind) => 
                    <tr key={ind + Math.random()}>
                        {row.map((r, ind) => 
                            <td key={ind + Math.random()}>{r}</td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    )
}
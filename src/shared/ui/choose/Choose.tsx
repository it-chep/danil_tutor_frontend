import { FC, useState } from "react";
import classes from './choose.module.scss'

interface IProps {
    title: string;
    values: {name: string, value: string}[];
    selected: string;
    onSelected: (value: string) => void;
}

export const Choose: FC<IProps> = (
    {title, onSelected=()=>{}, values, selected}
) => {

    const [open, setOpen] = useState<boolean>(false)
   
    return (
        <section className={classes.container}>
            <section 
                className={classes.title}
                onClick={() => setOpen(!open)}
                onMouseDown={e => e.preventDefault()}
            >
                {selected || title}
            </section>  
            {
                open
                    &&
                <ul className={classes.list}>
                    {values.map(value => 
                        <li 
                            key={value.value}
                            onClick={() => {
                                onSelected(value.value); 
                                setOpen(false)
                            }}
                            className={classes.item}
                        >
                            {value.name}
                        </li>
                    )}
                </ul>
            }
        </section>
    )
}
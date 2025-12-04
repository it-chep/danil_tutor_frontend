import {FC, MouseEvent, PropsWithChildren, useRef} from "react";
import classes from './toggleSwitch.module.scss'

interface IProps {
    label?: string;  
    checked: boolean;
    onSelected: (val: boolean) => void;
    elemTop?: boolean;
}   

export const ToggleSwitch: FC<IProps & PropsWithChildren> = (
    {label, checked, onSelected, elemTop, children}
) => {

    const cancelSelection = (e: MouseEvent) => {
        e.preventDefault()
    }

    const onClick = () => {
        onSelected(!checked)
    }

    return (
        <>
            <label 
                className={classes.container + (elemTop ? ` ${classes.top}` : '')} 
                onMouseDown={cancelSelection}
                onClick={onClick}
            >
                <span className={classes.text}>{label || children}</span>
                <section className={classes.toggleSwitch + (checked ? ` ${classes.selected}` : '')}>
                    <section className={classes.thumb}></section>
                </section>
            </label>
            
        </>
    )
}
import { FC } from "react";
import classes from './spinner.module.scss'

interface IProps {
    color?: string;
}

export const LoaderSpinner: FC<IProps> = ({color}) => {

    return (
        <section style={{background: color}} className={classes.loaderSpinner} />
    )

}
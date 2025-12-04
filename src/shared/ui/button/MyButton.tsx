import { FC, PropsWithChildren } from "react";
import classes from './myButton.module.scss'
import { LoaderSpinner } from "../spinner";

interface IProps {
    onClick?: () => void;
    isLoading?: boolean;
    error?: string;
}

export const MyButton: FC<IProps & PropsWithChildren> = ({isLoading, error, onClick, children}) => {

    return (
        <section className={classes.wrapper}>
            <button 
                disabled={isLoading || Boolean(error)}
                onClick={onClick} 
                className={classes.button + (isLoading ? ` ${classes.loader}` : '')}
            >
                { 
                    isLoading 
                        ? 
                    <section className={classes.loader}>
                        <LoaderSpinner color="#FFF" />
                    </section> 
                        : 
                    children 
                }
            </button>
            { error && <section className={classes.error}>*{error}</section> }
        </section>
    )
}
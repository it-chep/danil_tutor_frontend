import { FC, PropsWithChildren } from "react";
import classes from './confirmationAction.module.scss'
import { LoaderSpinner } from "../spinner";


interface IProps{
    setOpen: (open: boolean) => void;
    onClick: () => void;
    title: string;
    type: 'delete' | 'send'
    isLoading?: boolean;
}

export const ConfirmationAction: FC<IProps & PropsWithChildren> = ({title, type, onClick, setOpen, isLoading}) => {

    const onNo = () => {
        setOpen(false)
    }

    return (
        <section className={classes.container + (type === 'delete' ? ` ${classes.delete}` : ` ${classes.send}`)}>
            {
                isLoading  
                    ?
                <section className={classes.loader}><LoaderSpinner /></section>
                    :
                <>
                    <section className={classes.title}>{title}</section>
                    <section className={classes.buttons}>
                        <button onClick={onNo} className={classes.no}>Нет</button>
                        <button onClick={onClick} className={classes.yes}>Да</button>
                    </section>
                </>
            }
        </section>
    )
}
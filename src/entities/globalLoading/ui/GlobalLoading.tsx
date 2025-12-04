import { FC, use } from "react";
import classes from './globalLoading.module.scss'
import { LoaderSpinner } from "../../../shared/ui/spinner";

export const GlobalLoading: FC = () => {

    return (
        <section className={classes.loader}>
            <LoaderSpinner />
        </section>
    )
}
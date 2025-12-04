import { FC, useEffect, useRef } from "react";
import classes from './globalMessage.module.scss'
import { useAppSelector } from "../../../app/store/store";
import { useGlobalMessageActions } from "../lib/hooks/useGlobalMessageActions";

export const GlobalMessage: FC = () => {

    const {globalMessage} = useAppSelector(s => s.globalMessageReducer)
    const {setMessage} = useGlobalMessageActions()

    const ref = useRef<NodeJS.Timeout>(null)

    useEffect(() => {
        if(ref.current){
            clearTimeout(ref.current)
        }
        ref.current = setTimeout(() => {
            setMessage('')
        }, 4000)
    }, [globalMessage.message])

    return (
        <section className={classes.container + (globalMessage.type === 'ok' ? ` ${classes.ok}` : ` ${classes.error}`)}>
            {globalMessage.message}
        </section>
    )
}
import { FC, PropsWithChildren, useState } from "react";
import classes from './deleteAction.module.scss'
import { ConfirmationAction } from "../../../shared/ui/confirmationAction";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import deleteImg from '../../../shared/lib/assets/delete.png'
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { AuthError } from "../../../shared/lib/helpers/AuthError";
import { useMyActions } from "../../../entities/my";
import { Modal } from "../../../shared/ui/modal";

interface IProps {
   onDelete: () => Promise<void>;
   questionText: string;
   errorText: string;
   successText: string;
}

export const DeleteAction: FC<IProps & PropsWithChildren> = ({onDelete, questionText, errorText, successText, children}) => {

    const [open, setOpen] = useState<boolean>(false)
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsLoading} = useGlobalLoadingActions()
    const {setIsAuth} = useMyActions()

    const onDeleteWrap = async () => {
        try{
            setIsLoading(true)
            setOpen(false)
            await onDelete()
            setGlobalMessage({message: successText, type: 'ok'})
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: errorText, type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <>
            <section 
                className={classes.action} 
                onClick={() => setOpen(true)}
            >
                {children || <img className={classes.deleteImg} src={deleteImg} />}
            </section>
            <Modal setOpen={setOpen} open={open}>
                <ConfirmationAction 
                    onClick={onDeleteWrap}
                    setOpen={setOpen} 
                    title={questionText}
                    type='delete'
                />
            </Modal>
        </>
    )
}
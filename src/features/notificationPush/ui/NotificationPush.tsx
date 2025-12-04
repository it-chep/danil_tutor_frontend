import { FC, useState } from "react";
import classes from './notificationPush.module.scss'
import tgImg from '../lib/assets/tg.png'
import { Modal } from "../../../shared/ui/modal";
import { ConfirmationAction } from "../../../shared/ui/confirmationAction";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { useMyActions } from "../../../entities/my";
import { AuthError } from "../../../shared/err/AuthError";
import { studentService } from "../../../entities/student";

interface IProps {
    studentId: number;
}

export const NotificationPush: FC<IProps> = ({studentId}) => {

    const [open, setOpen] = useState<boolean>(false)
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsLoading} = useGlobalLoadingActions()
    const {setIsAuth} = useMyActions()

    const push = async () => {
        try{
            setIsLoading(true)
            setOpen(false)
            await studentService.notificationPush(studentId)
            setGlobalMessage({message: 'Уведомление успешно отправилось', type: 'ok'})
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка отправки уведомления', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.container}>
            <img onClick={() => setOpen(!open)} src={tgImg} height={32} width={32} />
            <Modal open={open} setOpen={setOpen}>
                <ConfirmationAction 
                    onClick={push}
                    setOpen={setOpen}
                    title="Вы точно хотите отправить уведомление о задолженности ?"
                    type="send"
                />
            </Modal>
        </section>
    )
}
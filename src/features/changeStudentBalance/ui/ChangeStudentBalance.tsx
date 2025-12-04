import { FC, useState } from "react";
import classes from './changeStudentBalance.module.scss'
import editImg from '../../../shared/lib/assets/edit.png'
import { Modal } from "../../../shared/ui/modal";
import { MyInput } from "../../../shared/ui/input";
import { MyButton } from "../../../shared/ui/button";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { AuthError } from "../../../shared/err/AuthError";
import { useMyActions } from "../../../entities/my";
import { studentService } from "../../../entities/student";
import { ConfirmationAction } from "../../../shared/ui/confirmationAction";

interface IProps {
    studentId: number;
    setStudentBalance: (balance: string) => void;
}

export const ChangeStudentBalance: FC<IProps> = ({studentId, setStudentBalance}) => {

    const [open, setOpen] = useState<boolean>(false)
    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const [balance, setBalance] = useState<string>('')
    const {setIsAuth} = useMyActions()
    const [confirm, setConfirm] = useState<boolean>(false)

    const update = async () => {
        try{
            setOpen(false)
            setIsLoading(true)
            await studentService.changeWallet(studentId, balance)
            setStudentBalance(balance)
            setGlobalMessage({type: 'ok', message: 'Успешное редактирование баланса кошелька'})
        }   
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({type: 'error', message: 'Ошибка при редактировании баланса кошелька'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    const onClose = (open: boolean) => {
        if(!open){
            setConfirm(false)
        }
        setBalance('')
        setOpen(open)
    }

    return (
        <section className={classes.container}>
            
            <img src={editImg} onClick={() => setOpen(true)} />
            <Modal open={open} setOpen={onClose}>
                {
                    confirm
                        ?
                    <ConfirmationAction
                        title="Точно хотите изменить сумму кошелька студента ?"
                        setOpen={onClose}
                        onClick={update}
                        type="send"
                    />
                        :
                    <section className={classes.change}>
                        Изменить баланс кошелька
                        <MyInput type="number" placeholder="1500" value={balance} setValue={setBalance} />
                        <MyButton onClick={() => setConfirm(true)}>Изменить</MyButton>
                    </section>
                }
            </Modal>
        </section>
    )
}
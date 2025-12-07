import { FC, PropsWithChildren, useEffect, useState } from "react";
import classes from './changeState.module.scss'
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { AuthError } from "../../../shared/err/AuthError";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useMyActions } from "../../../entities/my";
import { DropDownListSelected } from "../../../shared/ui/dropDownSelected";
import { Modal } from "../../../shared/ui/modal";
import { ConfirmationAction } from "../../../shared/ui/confirmationAction";
import { IItem } from "../../../shared/model/types";
import { IState, studentService } from "../../../entities/student";

interface IProps {
    stateId: number;
    studentId: number;
}

export const ChangeState: FC<IProps & PropsWithChildren> = ({stateId, studentId}) => {

    const {setIsLoading: setIsLoadingGlobal} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()
    const [open, setOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [states, setStates] = useState<IState[]>([])

    const [selectedState, setSelectedState] = useState<number>(stateId)

    const getStates = async() => {
        try{
            setIsLoading(true)
            const statesRes = await studentService.getStates()
            setStates(statesRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }
    
    const onChange = async () => {
        try{
            setIsLoadingGlobal(true)
            await studentService.changeState(studentId, selectedState)
            setGlobalMessage({message: 'Успешная смена состояния', type: 'ok'})
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении списка статусов', type: 'error'})
            }
        }
        finally{
            setIsLoadingGlobal(false)
            setOpen(false)
        }

    }

    const onClose = () => {
        setSelectedState(stateId)
        setOpen(false)
    }

    const onSelectedState = (item: IItem) => {
        return (selected: boolean) => {
            const target = states.find(s => s.state === item.id)
            if(target && selected) {
                setSelectedState(target.state)
                setOpen(true)
            }
            else{
                setSelectedState(stateId)
            }
        }
    }
    
    useEffect(() => {
        getStates()
    }, [])

    return (
        <section className={classes.container}>
            <section className={classes.choose}>
                <DropDownListSelected 
                    isLoading={isLoading}
                    selectedIdItems={[selectedState]}
                    items={states.map(s => ({name: s.name, id: s.state}))}
                    onSelected={onSelectedState}
                    noDelete
                />
            </section>
            <Modal setOpen={onClose} open={open}>
                <ConfirmationAction 
                    onClick={onChange}
                    setOpen={onClose} 
                    title={'Вы точно хотите сменить статус ?'}
                    type='send'
                />
            </Modal>
        </section>
    )
}
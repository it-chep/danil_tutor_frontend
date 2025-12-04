import { FC, PropsWithChildren, useEffect, useState } from "react";
import classes from './studentsMove.module.scss'
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { ITutor, tutorService } from "../../../entities/tutor";
import { AuthError } from "../../../shared/err/AuthError";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useMyActions } from "../../../entities/my";
import { DropDownListSelected } from "../../../shared/ui/dropDownSelected";
import { Modal } from "../../../shared/ui/modal";
import { ConfirmationAction } from "../../../shared/ui/confirmationAction";
import { IItem } from "../../../shared/model/types";
import { studentService } from "../../../entities/student";
import { MyButton } from "../../../shared/ui/button";


interface IProps {
    title: string;
    tutorId: number;
    studentId?: number;
    onSelected?: (newTutorId: ITutor) => void;
}

export const StudentsMove: FC<IProps & PropsWithChildren> = ({title, tutorId, studentId, onSelected}) => {

    const {setIsLoading: setIsLoadingGlobal} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()
    const [open, setOpen] = useState<boolean>(false)
    const [widgetOpen, setWidgetOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [tutors, setTutors] = useState<ITutor[]>([])

    const [selectedTutor, setSelectedTutor] = useState<number>(tutorId)

    const getTutors = async() => {
        try{
            setIsLoading(true)
            const tutorsRes = await tutorService.getAll()
            setTutors(tutorsRes.tutors)
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
    
    const onMove = async () => {
        if(tutorId === selectedTutor) return 
        try{
            setIsLoadingGlobal(true)
            await studentService.move(tutorId, selectedTutor, studentId)
            setGlobalMessage({message: 'Успешная смена репетитора', type: 'ok'})
            if(onSelected){
                const target = tutors.find(t => t.id === selectedTutor)
                if(target){
                    onSelected(target)
                }
            }
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
            setIsLoadingGlobal(false)
            setOpen(false)
            setWidgetOpen(false)
        }

    }

    const onClose = () => {
        setSelectedTutor(tutorId)
        setOpen(false)
    }

    const onSelectedTutor = (item: IItem) => {
        return (selected: boolean) => {
            const target = tutors.find(t => t.id === item.id)
            if(target && selected) {
                setSelectedTutor(target.id)
                setOpen(true)
            }
            else{
                setSelectedTutor(tutorId)
            }
        }
    }
    
    useEffect(() => {
        getTutors()
    }, [])

    return (
        <section className={classes.container}>
            <section className={classes.buttonOpen}>
                <MyButton 
                    onClick={() => setWidgetOpen(!widgetOpen)}
                >
                    {title}
                </MyButton>
            </section>
            {   
                widgetOpen
                    &&
                <>
                    <section className={classes.choose}>
                        <DropDownListSelected 
                            isLoading={isLoading}
                            selectedIdItems={[selectedTutor]}
                            items={tutors.map(t => ({name: t.full_name, id: t.id}))}
                            onSelected={onSelectedTutor}
                        />
                    </section>
                    <Modal setOpen={onClose} open={open}>
                        <ConfirmationAction 
                            onClick={onMove}
                            setOpen={onClose} 
                            title={'Вы точно хотите сменить репетитора ?'}
                            type='send'
                        />
                    </Modal>
                </>
            }
        </section>
    )
}
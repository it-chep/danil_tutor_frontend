import { FC, useEffect, useState } from "react";
import classes from './conducted.module.scss'
import { Choose } from "../../../../shared/ui/choose";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { useGlobalLoadingActions } from "../../../../entities/globalLoading";
import { useMyActions } from "../../../../entities/my";
import { tutorService } from "../../../../entities/tutor";
import { TValue } from "../tutorFeatures/TutorFeatures";
import { AuthError } from "../../../../shared/err/AuthError";
import { Modal } from "../../../../shared/ui/modal";
import { ConfirmationAction } from "../../../../shared/ui/confirmationAction";
import { MyButton } from "../../../../shared/ui/button";
import { getDateUTC } from "../../../../shared/lib/helpers/getDateUTC";
import { getLocaleDate } from "../../../../shared/lib/helpers/getLocalDate";
import { SelectDate } from "../../../../features/selectDate";

interface IProps{
    id: number;
}

export const Conducted: FC<IProps> = ({id}) => {
    const [open, setOpen] = useState<boolean>(false)
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsLoading} = useGlobalLoadingActions()
    const {setIsAuth} = useMyActions()
    const [selected, setSelected] = useState<TValue>({name: '', value: ''})
    const [stage, setStage] = useState<number>(1)

    const getNowDate = () => new Date()

    const [date, setDate] = useState<Date>(getNowDate())
    const [error, setError] = useState<string>('')

    useEffect(() => {
        setSelected({name: '', value: ''})
        setDate(getNowDate())
    }, [open])

    const values: TValue[] = [
        {name: '1 час', value: '60'},
        {name: '1.5 часа', value: '90'},
        {name: '2 часа', value: '120'}
    ]

    const onOpenStage = (open: boolean) => {
        if(!open){
            setStage(1)
        }
        setOpen(open)
    }

    const onSession = async () => {
        try{
            setIsLoading(true)
            setOpen(false)
            console.log(id, +selected.value, getDateUTC(date))
            await tutorService.conductLesson(id, +selected.value, getDateUTC(date))
            setGlobalMessage({message: 'Занятие проведено', type: 'ok'})
            onOpenStage(false)
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
            setStage(1)
        }
    }   

    const onSelected = (value: string) => {
        setError('')
        setSelected(values.find(v => v.value === value) || {name: '', value: ''})
        setOpen(true)
    }

    const onConfirm = () => {
        if(!selected.value){
            setError('Укажите продолжительность')
            return
        }
        if(!date){
            setError('Укажите дату')
            return
        }
        setStage(2)
    }

    return (
        <section>
            <section className={classes.title} onClick={() => setOpen(true)}>
                Провести занятие
            </section>
            <Modal
                open={open}
                setOpen={onOpenStage}
            >
                {
                    stage === 1
                        ?
                    <section className={classes.content}>
                        <section className={classes.h2}>Провести занятие</section>
                        <section className={classes.selectedHour}>
                            <Choose 
                                title="Выбрать продолжительность"
                                selected={selected.name}
                                onSelected={onSelected}
                                values={values}
                            />
                        </section>
                        <section className={classes.calendar}>
                            {/* <Calendar oneDate /> */}
                            Выберите дату
                            <SelectDate 
                                date={date}
                                setDate={setDate}
                                setError={setError}
                            />
                        </section>
                        <section className={classes.button}>
                            <MyButton error={error} onClick={onConfirm}>
                                Провести занятие
                            </MyButton>
                        </section>
                    </section>
                        :
                    <ConfirmationAction 
                        setOpen={onOpenStage}
                        onClick={onSession}
                        title={`Вы уверены что вы провели занятие длительностью ${selected.name} ${getLocaleDate(date)}`}
                        type="delete"
                    />
                }
            </Modal>
        </section>
    )
}
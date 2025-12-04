import { FC, useEffect, useState } from "react";
import classes from './changeDurationLesson.module.scss'
import { DropDownListSelected } from "../../../shared/ui/dropDownSelected";
import { IItem } from "../../../shared/model/types";
import { Modal } from "../../../shared/ui/modal";
import editImg from '../../../shared/lib/assets/edit.png'
import { MyInput } from "../../../shared/ui/input";
import { MyButton } from "../../../shared/ui/button";
import { AuthError } from "../../../shared/err/AuthError";
import { useMyActions } from "../../../entities/my";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { studentService } from "../../../entities/student";
import { ConfirmationAction } from "../../../shared/ui/confirmationAction";

interface IProps{
    durationInit: string;
    dateInit: string;
    lessonId: number;
    setData: (date: string, duration: number) => void;
}

export const ChangeDurationLesson: FC<IProps> = ({lessonId, durationInit, dateInit, setData}) => {

    const values = [
        {id: 1, name: '1 час', value: '60'},
        {id: 2, name: '1.5 часа', value: '90'},
        {id: 3, name: '2 часа', value: '120'}
    ]
    
    const [open, setOpen] = useState<boolean>(false)
    const [date, setDate] = useState<string>(dateInit)
    const [selected, setSelected] = useState<number>(values.find(v => v.value === durationInit)?.id || values[0].id)
    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsLoading} = useGlobalLoadingActions()
    const [confirm, setConfirm] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        setSelected(values.find(v => v.value === durationInit)?.id || values[0].id)
        setDate(dateInit)
    }, [open])

    const onSelected = (item: IItem) => {
        return (s: boolean) => {
            if(s){
                setSelected(item.id)
            }
        }
    }

    const onChange = async () => {
        try{
            setIsLoading(true)
            onClose(false)
            const newDuration = values.find(v => v.id === selected)?.value || durationInit
            await studentService.changeLesson(lessonId, date, +newDuration)
            setData(date, +newDuration)
            setGlobalMessage({message: 'Успешное редактированте занятия', type: 'ok'})
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при редактировании занятия', type: 'error'})
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
        setOpen(open)
    }

    const DATE_TIME_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;

    const isValidDateTimeFormat = (str: string): boolean => {
        return DATE_TIME_REGEX.test(str);
    };

    const onCheckDate = () => {
        if(!isValidDateTimeFormat(date)){
            setError('Неправильный формат даты')
            return
        }
        setConfirm(true)
    }

    return (
        <section className={classes.container}>
            <img src={editImg} onClick={() => setOpen(true)} />
            <Modal open={open} setOpen={onClose}>
                {
                    confirm
                        ?
                    <ConfirmationAction 
                        title="Точно хотите изменить длительность или дату занятия ?"
                        setOpen={onClose}
                        onClick={onChange}
                        type="send"
                    />
                        :
                    <section className={classes.change}>
                        <section className={classes.date}>
                            <span>Дата в формате "YYYY-MM-DD HH:MM:SS"</span>
                            <MyInput   
                                value={date} 
                                setValue={setDate} 
                                setError={setError}
                            />
                        </section>
                        <DropDownListSelected 
                            items={values}
                            selectedIdItems={[selected]}
                            onSelected={onSelected}
                            isLoading={false}
                        />
                        <section className={classes.button}>
                            <MyButton 
                                onClick={onCheckDate}
                                error={error}
                            >
                                Изменить
                            </MyButton>
                        </section>
                    </section>
                }
            </Modal>
        </section>
    )
}
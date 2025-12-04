import { FC } from "react";
import { MyButton } from "../../../../shared/ui/button";
import classes from './send.module.scss'
import { useGlobalLoadingActions } from "../../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import { useMyActions } from "../../../../entities/my";
import { IStudentChange, studentService, useStudentActions } from "../../../../entities/student";
import { useAppSelector } from "../../../../app/store/store";
import { useNavigate } from "react-router-dom";
import { STUDENTS_ROUTE } from "../../../../app/router/routes";
import { IFormError } from "../../../../shared/model/types";

interface IProps {
    isCreate: boolean;
    formError: IFormError<IStudentChange>[];
    setFormError: (formError: IFormError<IStudentChange>[]) => void;
}

export const Send: FC<IProps> = ({isCreate, formError, setFormError}) => {

    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()
    const {student} = useAppSelector(s => s.studentReducer)
    const {setInitialState} = useStudentActions()

    const router = useNavigate()

    const checkData = (): boolean => {
        const error: IFormError<IStudentChange>[] = [];
        let isOk = true;
        for(let key in student){
            if(key as keyof IStudentChange === 'tg_admin_username') continue
            if(student[key as keyof IStudentChange] === '' || student[key as keyof IStudentChange] === -1){
                error.push({field: key as keyof IStudentChange, text: 'Обязательное поле'})
                isOk = false;
            }
        }
        setFormError(error)
        return isOk
    }

    const onSend = async () => {
        if(!checkData()){
            return
        }
        try{
            setIsLoading(true)
            if(isCreate){
                await studentService.create(student)
            }
            else{
                await studentService.update(student)
            }
            setInitialState()
            router(STUDENTS_ROUTE.path)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: `Ошибка при ${isCreate ? 'создании' : 'обновлении'} студента`, type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.button}>
            <MyButton 
                onClick={onSend}
                error={formError.length > 0 ? "Заполните обязательные поля" : ""}
            >
                {isCreate ? 'Создать' : 'Обновить'}
            </MyButton>
        </section>
    )
}
import { FC, PropsWithChildren } from "react";
import classes from './tutorChange.module.scss'
import { MyInput } from "../../../../shared/ui/input";
import { ITutorCreate, tutorChange, tutorService } from "../../../../entities/tutor";
import { useGlobalLoadingActions } from "../../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { useMyActions } from "../../../../entities/my";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import { MyButton } from "../../../../shared/ui/button";
import { useNavigate } from "react-router-dom";
import { TUTORS_ROUTE } from "../../../../app/router/routes";
import { IFormError } from "../../../../shared/model/types";
import { useAppSelector } from "../../../../app/store/store";

interface IProps {
    tutor: ITutorCreate;
    setTutor: (tutor: ITutorCreate) => void;
    formError: IFormError<ITutorCreate>[];
    setFormError: (formError: IFormError<ITutorCreate>[]) => void;
    setErrorFieldDelete: (field: keyof ITutorCreate) => () => void;
}

export const TutorChange: FC<IProps & PropsWithChildren> = ({tutor, setTutor, children, formError, setErrorFieldDelete, setFormError}) => {

    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()
    const {my} = useAppSelector(s => s.myReducer)

    const {setFullName, setCostPerHour, setPhone, setTg, setEmail} = tutorChange(tutor, setTutor)

    const router = useNavigate()

    const checkData = (): boolean => {
        const error: IFormError<ITutorCreate>[] = [];
        let isOk = true;
        for(let key in tutor){
            if(tutor[key as keyof ITutorCreate] === '' || (
                (tutor[key as keyof ITutorCreate] === -1) && !((key as keyof ITutorCreate === 'admin_id') && (my.role !== 'super_admin')))
            ){
                error.push({field: key as keyof ITutorCreate, text: 'Обязательное поле'})
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
            await tutorService.create(tutor)
            router(TUTORS_ROUTE.path)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: `Ошибка при создании репетитора`, type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.container}>
            <h1 className={classes.title}>Создание репетитора</h1>
            <MyInput 
                title="ФИО репетитора"
                value={tutor.full_name}
                setValue={setFullName}
                error={formError.find(error => error.field === 'full_name')?.text}
                setError={setErrorFieldDelete('full_name')}
            />
            <MyInput 
                title="Email репетитора"
                value={tutor.email}
                setValue={setEmail}
                error={formError.find(error => error.field === 'email')?.text}
                setError={setErrorFieldDelete('email')}
            />
            <MyInput 
                title="Ставка в час"
                value={tutor.cost_per_hour}
                setValue={setCostPerHour}
                error={formError.find(error => error.field === 'cost_per_hour')?.text}
                setError={setErrorFieldDelete('cost_per_hour')}
            />
            <MyInput 
                title="Номер телефона репетитора"
                value={tutor.phone}
                setValue={setPhone}
                error={formError.find(error => error.field === 'phone')?.text}
                setError={setErrorFieldDelete('phone')}
            />
            <MyInput 
                title="Телеграм репетитора"
                value={tutor.tg}
                setValue={setTg}
                error={formError.find(error => error.field === 'tg')?.text}
                setError={setErrorFieldDelete('tg')}
            />
            {children}
            <section className={classes.button}>
                <MyButton
                    onClick={onSend}
                >
                    Создать
                </MyButton>
            </section>
        </section>
    )
}
import { FC, useState } from "react";
import classes from './adminChange.module.scss'
import { MyInput } from "../../../../shared/ui/input";
import { useGlobalLoadingActions } from "../../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { useMyActions } from "../../../../entities/my";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import { MyButton } from "../../../../shared/ui/button";
import { useNavigate } from "react-router-dom";
import { ADMINS_ROUTE } from "../../../../app/router/routes";
import { adminChange, adminService, IAdminCreate } from "../../../../entities/admin";
import { IFormError } from "../../../../shared/model/types";
import { changeFormError } from "../../../../shared/lib/helpers/ChangeFormError";

export const AdminChange: FC = () => {

    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()
    const [formError, setFormError] = useState<IFormError<IAdminCreate>[]>([])
    const setErrorFieldDelete = changeFormError(formError, setFormError)

    const [admin, setAdmin] = useState<IAdminCreate>({
        "full_name": '',
        "phone": '',
        "tg": '',
        "email": '',
    })

    const {setTg, setFullName, setPhone, setEmail} = adminChange(admin, setAdmin)

    const router = useNavigate()

    const checkData = (): boolean => {
        const error: IFormError<IAdminCreate>[] = [];
        let isOk = true;
        for(let key in admin){
            if(admin[key as keyof IAdminCreate] === ''){
                error.push({field: key as keyof IAdminCreate, text: 'Обязательное поле'})
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
            await adminService.create(admin)
            router(ADMINS_ROUTE.path)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: `Ошибка при создании админа`, type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.container}>
            <h1 className={classes.title}>Создание админа</h1>
            <MyInput 
                title="ФИО админа"
                value={admin.full_name}
                setValue={setFullName}
                error={formError.find(error => error.field === 'full_name')?.text}
                setError={setErrorFieldDelete('full_name')}
            />
            <MyInput 
                title="Email админа"
                value={admin.email}
                setValue={setEmail}
                error={formError.find(error => error.field === 'email')?.text}
                setError={setErrorFieldDelete('email')}
            />
            <MyInput 
                title="Номер телефона админа"
                value={admin.phone}
                setValue={setPhone}
                error={formError.find(error => error.field === 'phone')?.text}
                setError={setErrorFieldDelete('phone')}
            />
            <MyInput 
                title="Телеграм админа"
                value={admin.tg}
                setValue={setTg}
                error={formError.find(error => error.field === 'tg')?.text}
                setError={setErrorFieldDelete('tg')}
            />
            <section className={classes.button}>
                <MyButton
                    onClick={onSend}
                    error={formError.length > 0 ? "Заполните обязательные поля" : ""}
                >
                    Создать
                </MyButton>
            </section>
        </section>
    )
}
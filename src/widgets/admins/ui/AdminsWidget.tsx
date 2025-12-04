import { FC, useEffect, useState } from "react";
import classes from './adminsWidget.module.scss'
import { MyButton } from "../../../shared/ui/button";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { AuthError } from "../../../shared/lib/helpers/AuthError";
import { useMyActions } from "../../../entities/my";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useNavigate } from "react-router-dom";
import { ADMIN_CREATE_ROUTE } from "../../../app/router/routes";
import { AdminItem, adminService, IAdmin } from "../../../entities/admin";


export const AdminsWidget: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [admins, setAdmins] = useState<IAdmin[]>([])

    const router = useNavigate()

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const getData = async () => {
        try{
            setIsLoading(true)
            const adminsRes = await adminService.getAll()
            setAdmins(adminsRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении списка админов', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <section className={classes.container}>
            <section className={classes.addStudentWrap}>
                <section className={classes.button}> 
                    <MyButton onClick={() => router(ADMIN_CREATE_ROUTE.path)}>
                        Добавить админа
                    </MyButton>
                </section>
            </section>
            {
                isLoading
                    ?
                <section className="loader"><LoaderSpinner /></section>
                    :
                <table className={classes.table}>
                    <thead>
                        <tr className={classes.item}>
                            <th>ID</th>
                            <th>Фио</th>
                            <th>Телеграм</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map(admin => 
                            <AdminItem 
                                key={admin.id}
                                admin={admin}
                            >
                                <MyButton onClick={() => router('/admin/' + admin.id)}>
                                    Подробнее
                                </MyButton>
                            </AdminItem>
                        )}
                    </tbody>
                </table>
            }
        </section>
    )
}
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useMyActions } from "../../../../entities/my";
import { adminService, IAdminData } from "../../../../entities/admin";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { useNavigate, useParams } from "react-router-dom";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import classes from './adminWidget.module.scss'
import { DeleteAction } from "../../../../features/deleteAction";
import { ADMINS_ROUTE } from "../../../../app/router/routes";
import { AdminCard } from "../../../../entities/admin/ui/card/AdminCard";
import { AdminCalendar } from "../calendar/AdminCalendar";
import { AdminTutors } from "../tutors/AdminTutors";

interface IProps {
    id: number;
}

export const AdminWidget: FC<IProps & PropsWithChildren> = ({id, children}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [admin, setAdmin] = useState<IAdminData>()

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const router = useNavigate()

    const getData = async () => {
        try{
            if(id){
                setIsLoading(true)
                const adminRes = await adminService.get(id)
                setAdmin(adminRes)
            }
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении данных о админе', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const onDelete = async () => {
        if(admin){
            await adminService.delete(admin.id)
            router(ADMINS_ROUTE.path)
        }
    }

    return (
        <section className={classes.container}>   
            {
                isLoading
                    ?
                <section></section>
                    :
                admin
                    &&
                <>
                    <section className={classes.delete}>
                        <DeleteAction
                            successText="Админ удален"        
                            errorText="Ошибка при удалении админа"
                            onDelete={onDelete}
                            questionText="Точно хотите удалить Админа ?"
                        />
                    </section>
                    <AdminCard
                        admin={admin}
                    >
                        <AdminCalendar id={admin.id} />
                    </AdminCard>
                    <AdminTutors>
                        {children}
                    </AdminTutors>
                </>
                    
            }
        </section>
    )
}
import { FC } from "react"
import { useAppSelector } from "../../../app/store/store"
import { myService, useMyActions } from "../../../entities/my"
import { MyButton } from "../../../shared/ui/button"
import classes from './logout.module.scss'
import { useGlobalMessageActions } from "../../../entities/globalMessage"
import { useGlobalLoadingActions } from "../../../entities/globalLoading"


export const Logout: FC = () => {

    const {isLoading} = useAppSelector(s => s.myReducer)
    const {setIsAuth} = useMyActions()
    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const logout = async () => {
        try{
            setIsLoading(true)
            await myService.logout()
            setIsAuth(false)
        }
        catch(e){
            console.log(e)
            setGlobalMessage({message: 'Ошибка при выходе', type: 'error'})
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.button}>
            <MyButton 
                onClick={logout}  
                isLoading={isLoading}  
            >
                Выйти
            </MyButton>
        </section>
    )
}
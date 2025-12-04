import { FC, useEffect, useState } from "react";
import classes from './studentFilters.module.scss'
import { useMyActions } from "../../../entities/my";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { studentService } from "../../../entities/student";
import { AuthError } from "../../../shared/err/AuthError";
import { DropDownListSelected } from "../../../shared/ui/dropDownSelected";
import { IItem } from "../../../shared/model/types";
import { ToggleSwitch } from "../../../shared/ui/toggleSwitch";

interface IProps {
    onSelectedFilters: (tgAdmins: string[], isLost: boolean) => void;
}

export const StudentFilters: FC<IProps> = ({onSelectedFilters}) => {

    const [tgAdminsItems, setTgAdminsItems] = useState<IItem[]>([])
    const [isLost, setIsLost] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [selectedTgAdmins, setSelectedTgAdmins] = useState<number[]>([])
    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const getData = async () => {
        try{
            setIsLoading(true)
            const adminsRes = await studentService.getTgAdmins()
            setTgAdminsItems(adminsRes.map((a, ind) => ({id: Date.now() + ind, name: a})))
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
    
    const onSelected = (item: IItem) => {
        return (selected: boolean) => {
            if(selected){
                setSelectedTgAdmins(a => [...a, item.id])
            }
            else{
                const ind = selectedTgAdmins.findIndex(a => a === item.id)
                if(ind >= 0){
                    const copy = [...selectedTgAdmins]
                    copy.splice(ind, 1)
                    setSelectedTgAdmins(copy)
                }
            }
        }
    }

    useEffect(() => {
        onSelectedFilters(tgAdminsItems.filter(a => selectedTgAdmins.includes(a.id)).map(a => a.name), isLost)
    }, [selectedTgAdmins, isLost])

    useEffect(() => {
        getData()
    }, [])

    return (
        <section className={classes.container}>
            <section className={classes.dropDown}>
                <DropDownListSelected 
                    selectedCount
                    isLoading={isLoading}
                    items={tgAdminsItems}
                    selectedIdItems={selectedTgAdmins}
                    onSelected={onSelected}
                />
            </section>
            <section className={classes.toggle}>
                Должники: 
                <ToggleSwitch 
                    checked={isLost} 
                    onSelected={setIsLost} 
                />
            </section>
        </section>
    )
}
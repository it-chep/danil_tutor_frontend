import { FC, useEffect, useState } from "react";
import classes from './studentFilters.module.scss'
import { useMyActions } from "../../../entities/my";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { IState, studentService } from "../../../entities/student";
import { AuthError } from "../../../shared/err/AuthError";
import { DropDownListSelected } from "../../../shared/ui/dropDownSelected";
import { IItem } from "../../../shared/model/types";
import { ToggleSwitch } from "../../../shared/ui/toggleSwitch";

interface IProps {
    onSelectedFilters: (tgAdmins: string[], states: number[], isLost: boolean) => void;
}

export const StudentFilters: FC<IProps> = ({onSelectedFilters}) => {

    const [tgAdminsItems, setTgAdminsItems] = useState<IItem[]>([])
    const [states, setStates] = useState<IState[]>([])
    const [isLost, setIsLost] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [selectedTgAdmins, setSelectedTgAdmins] = useState<number[]>([])
    const [selectedStates, setSelectedStates] = useState<number[]>([])
    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const getAdmins = async () => {
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

    const getStates = async () => {
        try{
            setIsLoading(true)
            const statesRes = await studentService.getStates()
            setStates(statesRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении списка статусов', type: 'error'})
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

    const onSelectedState = (item: IItem) => {
        return (selected: boolean) => {
            if(selected){
                setSelectedStates(a => [...a, item.id])
            }
            else{
                const ind = selectedStates.findIndex(s => s === item.id)
                if(ind >= 0){
                    const copy = [...selectedStates]
                    copy.splice(ind, 1)
                    setSelectedStates(copy)
                }
            }
        }
    }

    useEffect(() => {
        const selectedTgAdminsNames = tgAdminsItems.filter(a => selectedTgAdmins.includes(a.id)).map(a => a.name)
        const selectedStatesId = states.filter(s => selectedStates.includes(s.state)).map(s => s.state)
        onSelectedFilters(selectedTgAdminsNames, selectedStatesId, isLost)
    }, [selectedTgAdmins, isLost, selectedStates])

    useEffect(() => {
        getAdmins()
        getStates()
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
            <section className={classes.dropDown}>
                <DropDownListSelected 
                    selectedCount
                    isLoading={isLoading}
                    items={states.map(s => ({id: s.state, name: s.name}))}
                    selectedIdItems={selectedStates}
                    onSelected={onSelectedState}
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
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useMyActions } from "../../../entities/my";
import { AuthError } from "../../../shared/lib/helpers/AuthError";
import { DropDownListSelected } from "../../../shared/ui/dropDownSelected";
import { IItem } from "../../../shared/model/types";
import classes from './chooseItems.module.scss'
import { useSearchItems } from "../../../shared/lib/hooks/useSearchItems";
import { MyInput } from "../../../shared/ui/input";

interface IProps {
    title: string;
    selectedItems: number[];
    setItem: (id: number) => void;
    getData: () => Promise<IItem[]>;
    error?: string;
    setError?: (err: string) => void; 
    search?: boolean;
}

export const ChooseItems: FC<IProps & PropsWithChildren> = (
    {selectedItems, setItem, title, getData, error, setError, search}
) => {

    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()
    const [items, setItems] = useState<IItem[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [value, setValue] = useState<string>('')
    const searchItems = useSearchItems(items, value)

    const getDataWrap = async () => {
        try{
            setIsLoading(true)
            const itemsRes = await getData()
            setItems(itemsRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: `Ошибка при получении данных`, type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getDataWrap()
    }, [])

    const onSelected = (item: IItem) => {
        return (selected: boolean) => {
            setItem(selected ? item.id : -1) 
            setError && setError('')
        }
    }

    return (
        <section className={classes.container}>
            <section className={classes.title}>{title}</section>
            <DropDownListSelected 
                isLoading={isLoading}
                selectedIdItems={selectedItems}
                items={search ? searchItems : items}
                onSelected={onSelected}
            >
                {
                    search
                        &&
                    <MyInput placeholder="Поиск..." value={value} setValue={setValue} />
                }
            </DropDownListSelected>
            <section className={classes.errorText}>
                {error}
            </section>
        </section>
    )
}
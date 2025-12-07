import { FC, MouseEvent, PropsWithChildren, useState } from "react";
import classes from './dropDownList.module.scss'
import { LoaderSpinner } from "../../spinner";
import { List } from "../list/List";
import arrowDown from '../../../lib/assets/arrowDown.png'
import { IItem } from "../../../model/types";


interface IProps {
    items: IItem[];
    selectedIdItems: number[];
    onSelected: (item: IItem) => (selected: boolean) => void
    isLoading: boolean;
    selectedCount?: boolean;
    noDelete?: boolean;
}

export const DropDownListSelected: FC<IProps & PropsWithChildren> = (
    {selectedIdItems, items, isLoading, onSelected, selectedCount, noDelete, children}
) => {

    const [open, setOpen] = useState<boolean>(false)

    const onOpen = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if(!isLoading && !target.closest('.' + classes.item)){
            setOpen(!open)
        }
    }

    const getSelectedNames = () => {
        const names: IItem[] = [];
        for(let i = 0; i < selectedIdItems.length; i++){
            const target = items.find(item => item.id === selectedIdItems[i])
            if(target){
                names.push(target)
            }
        }
        return names
    }

    return (
        <section className={classes.wrapper}>
            <section 
                onClick={onOpen} 
                className={classes.selectedWrap}
                onMouseDown={e => e.preventDefault()}
            >
                {
                    isLoading
                        ?
                    <section className={classes.loader}><LoaderSpinner /></section>
                        :
                    <>
                        <section className={classes.selected}>
                            {
                                selectedCount
                                    ?
                                <>Выбрано: {selectedIdItems.length}</>
                                    :
                                getSelectedNames().map(item => 
                                    <section 
                                        className={classes.item} 
                                        key={item.id}
                                    >
                                        {item.name}
                                        {
                                            !noDelete
                                                &&
                                            <svg 
                                                className={classes.delete } 
                                                onClick={() => onSelected(item)(false)} 
                                                width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M25 7L7 25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M25 25L7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        }
                                    </section>
                                )
                            }
                        </section>
                        <img className={(open ? ` ${classes.open}` : '')} src={arrowDown} />
                    </>
                }
            </section>
            {
                open
                    &&
                <section className={classes.container}>
                    {children}
                    <section className={classes.list + (children ? ` ${classes.feature}` : '')}>
                        <List
                            onSelected={onSelected}
                            items={items} 
                            selectedIdItems={selectedIdItems} 
                        />
                    </section>
                </section>
            }
        </section>
    )
}
import { FC } from "react";
import classes from './list.module.scss'
import { IItem } from "../../../model/types";
import { MyCheckbox } from "../../myCheckbox";

interface IProps {
    selectedIdItems: number[];
    items: IItem[];
    onSelected: (item: IItem) => (selected: boolean) => void
}

export const List: FC<IProps> = ({items, selectedIdItems, onSelected}) => {

    return (
        <ul className={classes.list}>
            {items.map(item => 
                <li key={item.id}>
                    <MyCheckbox
                        onSelected={onSelected(item)} 
                        checked={Boolean(~selectedIdItems.findIndex(selectedId => selectedId === item.id))} 
                        label={item.name}
                    />
                </li>
            )}
        </ul>
    )
}
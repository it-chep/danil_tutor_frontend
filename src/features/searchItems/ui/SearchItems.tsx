import { useEffect, useRef, useState } from "react";
import { MyInput } from "../../../shared/ui/input";
import classes from './searchItems.module.scss'
import lupaImg from '../lib/assets/lupa.png'
import { useSearchItems } from "../../../shared/lib/hooks/useSearchItems";

interface IProps<T> {
    placeholder: string;
    items: T[]
    setItems: (items: any) => void;
    isLoading?: boolean;
}

export function SearchItems<T extends {name: string}>({placeholder, items, setItems, isLoading}: IProps<T>) {

    const [val, setVal] = useState<string>('')

    const searchItems = useSearchItems(items, val)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setItems(searchItems)
    }, [val])

    return (
        <section ref={containerRef}  className={classes.container}>
            <MyInput 
                value={val}
                setValue={setVal}
                placeholder={placeholder}
                iconSrc={lupaImg}
            />
        </section>
    )
}
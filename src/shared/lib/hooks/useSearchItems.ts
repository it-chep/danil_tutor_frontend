import { useMemo } from "react"

export function useSearchItems<T extends {name: string}> (items: T[], value: string) {
    return useMemo(() => {
        return items.filter(
            item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        )
    }, [value, items])
}
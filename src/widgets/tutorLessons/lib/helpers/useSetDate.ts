import { useCallback } from "react"
import { getDateUTC } from "../../../../shared/lib/helpers/getDateUTC"

    
export const useSetDate = (getLessons: (from: string, to: string) => void) => {
    return useCallback((startDate: Date | null, endDate: Date | null) => {
        if(startDate && endDate){
            getLessons(getDateUTC(startDate), getDateUTC(endDate))
        }
    }, [])
}
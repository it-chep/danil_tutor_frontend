import { useMemo } from "react"



export const getDateUTC = (date: Date) => {
    const [dateUTC, fullTimeUTC] = date.toISOString().split('T')
    const timeUTC = fullTimeUTC.split('.')[0]
    return dateUTC + ' ' + timeUTC
}
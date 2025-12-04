import { ILesson } from "../../../../entities/student"




export const getSetData = (setLessons: React.Dispatch<React.SetStateAction<ILesson[] | null>>) => {
    return (ind: number) => {
        return (date: string, duration_minutes: number) => {
            setLessons(prev => prev ? prev.map((l, index) => index === ind ? {...l, date, duration_minutes} : l): prev)
        }
    }
}
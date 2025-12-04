import { ILesson, studentService } from "../../../../entities/student"


export const getOnDelete = (setLessons: React.Dispatch<React.SetStateAction<ILesson[] | null>>) => { 
    return async (ind: number, lessonId: number) => {
        await studentService.deleteLesson(lessonId)
        setLessons(prev => prev ? prev.filter((l, i) => i !== ind) : prev)
    }
}
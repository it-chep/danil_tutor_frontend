import { ITutorCreate } from "../../model/types";



export const tutorChange = (tutor: ITutorCreate, setTutor: (tutor: ITutorCreate) => void) => {
    return {
        setFullName(full_name: string){
            setTutor({...tutor, full_name})
        },
        setCostPerHour(cost_per_hour: string){
            setTutor({...tutor, cost_per_hour})
        },
        setPhone(phone: string){
            setTutor({...tutor, phone})
        },
        setTg(tg: string){
            setTutor({...tutor, tg})
        },
        setSubjectId(subject_id: number){
            setTutor({...tutor, subject_id})
        },
        setEmail(email: string){
            setTutor({...tutor, email})
        },
        setAdminId(admin_id: number){
            setTutor({...tutor, admin_id})
        },
    }
}
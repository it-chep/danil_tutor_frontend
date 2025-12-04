import { Navigate } from "react-router-dom";
import { ADMIN_LESSONS_ROUTE, HOME_ROUTE } from "../../app/router/routes";
import { useAppSelector } from "../../app/store/store";
import { TRole } from "../../entities/my";
import { LayoutPages } from "../layoutPages";
import { AdminLessons } from "../../widgets/adminLessons";

const roles: TRole[] = ['admin'] 

export default function AdminLessonsPage() {

    const {my} = useAppSelector(s => s.myReducer)

    const isAccess = roles.includes(my.role)
    
    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    return (
        <LayoutPages title={ADMIN_LESSONS_ROUTE.name}>
            <AdminLessons />
        </LayoutPages>
    )
}
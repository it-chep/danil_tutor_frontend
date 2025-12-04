import { Navigate } from 'react-router-dom'
import { HOME_ROUTE, TUTORS_ROUTE } from '../../app/router/routes'
import { useAppSelector } from '../../app/store/store'
import { TRole } from '../../entities/my'
import { tutorService } from '../../entities/tutor'
import { TutorsWidget } from '../../widgets/tutors'
import { LayoutPages } from '../layoutPages'

const roles: TRole[] = ['super_admin', 'admin'] 

export default function TutorsPage() {

    const {my} = useAppSelector(s => s.myReducer)
    const isAccess = roles.includes(my.role)
    
    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    return (
        <LayoutPages title={TUTORS_ROUTE.name}>
            <TutorsWidget 
                add={true}
                request={tutorService.getAll}
            />
        </LayoutPages>
    )
}
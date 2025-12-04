import { ADMIN_ROUTE, HOME_ROUTE, STUDENT_ROUTE } from '../../app/router/routes'
import { useAppSelector } from '../../app/store/store'
import { TRole } from '../../entities/my'
import { tutorService } from '../../entities/tutor';
import { AdminWidget } from '../../widgets/admin';
import { TutorsWidget } from '../../widgets/tutors';
import { LayoutPages } from '../layoutPages'
import { Navigate, useParams } from 'react-router-dom';

const roles: TRole[] = ['super_admin'] 

export default function AdminPage() {

    const {id} = useParams<{id: string}>()
    
    const {my} = useAppSelector(s => s.myReducer)
    const isAccess = roles.includes(my.role)
    
    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    return (
        id  
            ?
        <LayoutPages title={ADMIN_ROUTE.name}>
            <AdminWidget id={+id}>
                <TutorsWidget 
                    add={false}
                    highlight={false}
                    request={() => tutorService.getAllByAdmin(+id)}
                />
            </AdminWidget>
        </LayoutPages>
            :
        <></>
    )
}
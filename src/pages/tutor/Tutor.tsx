import { Navigate, useParams } from 'react-router-dom'
import { HOME_ROUTE, TUTOR_ROUTE } from '../../app/router/routes'
import { studentService } from '../../entities/student'
import { StudentsWidget } from '../../widgets/students'
import { TutorWidget } from '../../widgets/tutor'
import { LayoutPages } from '../layoutPages'
import { useAppSelector } from '../../app/store/store'
import { TRole } from '../../entities/my'
import { TutorLessons } from '../../widgets/tutorLessons'

const roles: TRole[] = ['super_admin', 'admin'] 

export default function TutorPage() {

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
        <LayoutPages title={TUTOR_ROUTE.name}>
            <TutorWidget 
                id={+id}
                tutorLessons={
                    <TutorLessons 
                        isOpen
                        tutorId={+id}
                    />
                }
            >
                <StudentsWidget 
                    add={false}
                    request={() => studentService.getAllByTutor(+id)}
                />
            </TutorWidget>
        </LayoutPages>
            :
        <></>
    )
}
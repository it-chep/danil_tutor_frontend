import { Navigate, useLocation } from 'react-router-dom'
import { HOME_ROUTE, STUDENT_CREATE_ROUTE } from '../../app/router/routes'
import { StudentChange } from '../../features/studentChange'
import { LayoutPages } from '../layoutPages'
import { ChooseItems } from '../../features/chooseItems'
import { useAppSelector } from '../../app/store/store'
import { IStudentChange, useStudentActions } from '../../entities/student'
import { subjectService } from '../../entities/subject'
import { tutorService } from '../../entities/tutor'
import { TRole } from '../../entities/my'
import { useState } from 'react'
import { changeFormError } from '../../shared/lib/helpers/ChangeFormError'
import { IFormError } from '../../shared/model/types'

const roles: TRole[] = ['super_admin', 'admin'] 

export default function StudentChangePage() {

    const {pathname} = useLocation()

    const isCreate = pathname === STUDENT_CREATE_ROUTE.path;

    const {student} = useAppSelector(s => s.studentReducer)
    const {setSubjectId, setTutorId} = useStudentActions()

    const {my} = useAppSelector(s => s.myReducer)
    const isAccess = roles.includes(my.role)
    
    const [formError, setFormError] = useState<IFormError<IStudentChange>[]>([])
    const setErrorFieldDelete = changeFormError(formError, setFormError)
    
    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    return (
        <LayoutPages title={STUDENT_CREATE_ROUTE.name}>
            <StudentChange
                formError={formError}
                setFormError={setFormError}
                setErrorFieldDelete={setErrorFieldDelete} 
                isCreate={isCreate} 
                chooseSubject={
                    isCreate
                        &&
                    <ChooseItems 
                        error={formError.find(error => error.field === 'subject_id')?.text}
                        setError={setErrorFieldDelete('subject_id')}
                        title='Предмет'
                        selectedItems={[student.subject_id]}
                        setItem={setSubjectId}
                        getData={subjectService.getAll}
                    />
                }
                chooseTutor={
                    <ChooseItems 
                        error={formError.find(error => error.field === 'tutor_id')?.text}
                        setError={setErrorFieldDelete('tutor_id')}
                        title='Репетитор'
                        selectedItems={[student.tutor_id]}
                        setItem={setTutorId}
                        getData={async () => {
                                const data = await tutorService.getAll()
                                return data.tutors.map(d => ({id: d.id, name: d.full_name}))
                            }
                        }
                        search
                    />
                }
            />
        </LayoutPages>
    )
}
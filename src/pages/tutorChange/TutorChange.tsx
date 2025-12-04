import { useState } from 'react'
import { HOME_ROUTE, TUTOR_CREATE_ROUTE } from '../../app/router/routes'
import { TutorChange } from '../../features/tutorChange'
import { LayoutPages } from '../layoutPages'
import { ITutorCreate, tutorChange } from '../../entities/tutor'
import { ChooseItems } from '../../features/chooseItems'
import { subjectService } from '../../entities/subject'
import { TRole } from '../../entities/my'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../app/store/store'
import { adminService } from '../../entities/admin'
import { IFormError } from '../../shared/model/types'
import { changeFormError } from '../../shared/lib/helpers/ChangeFormError'

const roles: TRole[] = ['super_admin', 'admin'] 

export default function TutorChangePage() {

    const [tutor, setTutor] = useState<ITutorCreate>({
        full_name: '',
        cost_per_hour: '',
        phone: '',
        tg: '',
        subject_id: -1,
        email: '',
        admin_id: -1,
    })

    const {setSubjectId, setAdminId} = tutorChange(tutor, setTutor)

    const {my} = useAppSelector(s => s.myReducer)
    const isAccess = roles.includes(my.role)

    const [formError, setFormError] = useState<IFormError<ITutorCreate>[]>([])
    const setErrorFieldDelete = changeFormError(formError, setFormError)
    
    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    const getAdmins = async() => {
        const admins = await adminService.getAll()
        return admins.map(admin => ({name: admin.full_name, id: admin.id}))
    }

    return (
        <LayoutPages title={TUTOR_CREATE_ROUTE.name}>
            <TutorChange 
                formError={formError}
                setFormError={setFormError}
                setErrorFieldDelete={setErrorFieldDelete}
                tutor={tutor}
                setTutor={setTutor}
            >
                <>
                    <ChooseItems 
                        title='Предмет'
                        selectedItems={[tutor.subject_id]}
                        setItem={setSubjectId}
                        getData={subjectService.getAll}
                        error={formError.find(error => error.field === 'subject_id')?.text}
                        setError={setErrorFieldDelete('subject_id')}
                    />
                    {
                        my.role === 'super_admin'
                            &&
                        <ChooseItems 
                            title='Админ'
                            selectedItems={[tutor.admin_id]}
                            setItem={setAdminId}
                            getData={getAdmins}
                            error={formError.find(error => error.field === 'admin_id')?.text}
                            setError={setErrorFieldDelete('admin_id')}
                        />
                    }
                </>
            </TutorChange>
        </LayoutPages>
    )
}
import { STUDENTS_ROUTE } from '../../app/router/routes'
import { useAppSelector } from '../../app/store/store'
import { studentService } from '../../entities/student'
import { StudentsWidget } from '../../widgets/students'
import { LayoutPages } from '../layoutPages'


export default function StudentsPage() {

    const {my} = useAppSelector(s => s.myReducer)

    return (
        <LayoutPages title={STUDENTS_ROUTE.name}>
            <StudentsWidget 
                add={my.role !== 'tutor'} 
                request={my.role !== 'tutor' ? studentService.getAll : () => studentService.getAllByTutor(my.id)} 
                highlight={my.role !== 'tutor'}
            />
        </LayoutPages>
    )
}
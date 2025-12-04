import { Navigate, useParams } from 'react-router-dom'
import { HOME_ROUTE, STUDENT_ROUTE } from '../../app/router/routes'
import { StudentWidget } from '../../widgets/student'
import { LayoutPages } from '../layoutPages'
import { Lessons } from '../../widgets/lessons'
import { useAppSelector } from '../../app/store/store'
import { Transactions } from '../../widgets/transactions'
import { Notifications } from '../../widgets/notifications'

export default function StudentPage() {

    const {id} = useParams<{id: string}>()
    const {my} = useAppSelector(s => s.myReducer)

    if(!id){
        return <Navigate to={HOME_ROUTE.path} />
    }

    return (
        <LayoutPages title={STUDENT_ROUTE.name}>
            <StudentWidget id={+id}>
                <Lessons studentId={+id} />
            </StudentWidget>
            {
                my.role !== 'tutor'
                    &&
                <section>
                    <Transactions studentId={+id} />
                    <Notifications studentId={+id} />
                </section>
            }
        </LayoutPages>
    )
}
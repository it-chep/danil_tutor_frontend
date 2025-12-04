import { ADMIN_CREATE_ROUTE, HOME_ROUTE } from '../../app/router/routes'
import { LayoutPages } from '../layoutPages'
import { AdminChange } from '../../features/adminChange'
import { TRole } from '../../entities/my'
import { useAppSelector } from '../../app/store/store'
import { Navigate } from 'react-router-dom'

const roles: TRole[] = ['super_admin'] 

export default function AdminChangePage() {
    
    const {my} = useAppSelector(s => s.myReducer)
    const isAccess = roles.includes(my.role)
    
    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    return (
        <LayoutPages title={ADMIN_CREATE_ROUTE.name}>
            <AdminChange />
        </LayoutPages>
    )
}
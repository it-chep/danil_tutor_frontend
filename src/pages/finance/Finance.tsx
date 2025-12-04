import { FINANCE_ROUTE, HOME_ROUTE } from '../../app/router/routes'
import { useAppSelector } from '../../app/store/store'
import { FinanceWidget } from '../../widgets/finance'
import { LayoutPages } from '../layoutPages'
import { TRole } from '../../entities/my'
import { Navigate } from 'react-router-dom'

const roles: TRole[] = ['super_admin', 'admin'] 

export default function FinancePage() {

    const {my} = useAppSelector(s => s.myReducer)
    const isAccess = roles.includes(my.role)
    
    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    return (
        <LayoutPages title={FINANCE_ROUTE.name}>
            <FinanceWidget />
        </LayoutPages>
    )
}
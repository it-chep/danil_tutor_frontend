import { Navigate } from "react-router-dom";
import { ADMIN_TRANSACTIONS_ROUTE, HOME_ROUTE } from "../../app/router/routes";
import { useAppSelector } from "../../app/store/store";
import { TRole } from "../../entities/my";
import { LayoutPages } from "../layoutPages";
import { AdminTransactions } from "../../widgets/adminTransactions";

const roles: TRole[] = ['admin'] 

export default function AdminTransactionsPage() {

    const {my} = useAppSelector(s => s.myReducer)

    const isAccess = roles.includes(my.role)
    
    if(!isAccess){
        return (
            <Navigate to={HOME_ROUTE.path} replace />
        )
    }

    return (
        <LayoutPages title={ADMIN_TRANSACTIONS_ROUTE.name}>
            <AdminTransactions />
        </LayoutPages>
    )
}
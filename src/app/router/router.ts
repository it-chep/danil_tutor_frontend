import { RouteObject } from "react-router-dom";
import { ADMIN_CREATE_ROUTE, ADMIN_LESSONS_ROUTE, ADMIN_ROUTE, ADMIN_TRANSACTIONS_ROUTE, ADMINS_ROUTE, AUTH_ROUTE, FINANCE_ROUTE, 
    HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, STUDENT_CREATE_ROUTE, STUDENT_ROUTE, 
    STUDENT_UPDATE_ROUTE, 
    STUDENTS_ROUTE, TUTOR_CREATE_ROUTE, TUTOR_LESSONS_ROUTE, TUTOR_ROUTE, TUTORS_ROUTE } from "./routes";
import App from "../../App";
import HomePage from "../../pages/home/HomePage";
import AuthPage from "../../pages/auth/auth/AuthPage";
import StudentsPage from "../../pages/students/Students";
import StudentChangePage from "../../pages/studentChange/StudentChange";
import StudentPage from "../../pages/student/Student";
import TutorsPage from "../../pages/tutors/Tutors";
import TutorPage from "../../pages/tutor/Tutor";
import TutorChangePage from "../../pages/tutorChange/TutorChange";
import FinancePage from "../../pages/finance/Finance";
import AdminsPage from "../../pages/admins/Admins";
import AdminPage from "../../pages/admin/Admin";
import AdminChangePage from "../../pages/adminChange/AdminChange";
import AuthLayoutPage from "../../pages/auth/layout/AuthLayout";
import AuthVerifyPage from "../../pages/auth/verify/AuthVerifyPage";
import NotFoundPage from "../../pages/notFound/NotFound";
import TutorLessonsPage from "../../pages/tutorLessons/TutorLessons";
import AdminTransactionsPage from "../../pages/adminTransactions/AdminTransactions";
import AdminLessonsPage from "../../pages/adminLessons/AdminLessons";


export const Router: RouteObject[] = [
    {
        path: HOME_ROUTE.path,
        Component: App,
        ErrorBoundary: NotFoundPage,
        children: [
            {
                path: HOME_ROUTE.path,
                Component: HomePage
            },
            {
                path: AUTH_ROUTE.path,
                Component: AuthLayoutPage,
                children: [
                    {
                        path: AUTH_ROUTE.path, 
                        Component: AuthPage,
                    },
                    {
                        path: LOGIN_ROUTE.path,
                        Component: AuthVerifyPage
                    },
                    {
                        path: REGISTRATION_ROUTE.path,
                        Component: AuthVerifyPage
                    }
                ]
            },
            {
                path: STUDENTS_ROUTE.path,
                Component: StudentsPage
            },
            {
                path: STUDENT_CREATE_ROUTE.path,
                Component: StudentChangePage
            },
            {
                path: STUDENT_UPDATE_ROUTE.path,
                Component: StudentChangePage
            },
            {
                path: STUDENT_ROUTE.path,
                Component: StudentPage
            },
            {
                path: TUTORS_ROUTE.path,
                Component: TutorsPage
            },
            {
                path: TUTOR_ROUTE.path,
                Component: TutorPage
            },
            {
                path: TUTOR_CREATE_ROUTE.path,
                Component: TutorChangePage
            },
            {
                path: FINANCE_ROUTE.path,
                Component: FinancePage
            },
            {
                path: ADMINS_ROUTE.path,
                Component: AdminsPage
            },
            {
                path: ADMIN_ROUTE.path,
                Component: AdminPage
            },
            {
                path: ADMIN_CREATE_ROUTE.path,
                Component: AdminChangePage
            },
            {
                path: TUTOR_LESSONS_ROUTE.path,
                Component: TutorLessonsPage
            },
            {
                path: ADMIN_TRANSACTIONS_ROUTE.path,
                Component: AdminTransactionsPage
            },
            {
                path: ADMIN_LESSONS_ROUTE.path,
                Component: AdminLessonsPage
            }
        ]
    }
]
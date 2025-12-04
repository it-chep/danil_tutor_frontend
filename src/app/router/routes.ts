import { IRoute } from "./types";

export const HOME_ROUTE: IRoute = {
    name: 'Главная',
    path: '/',
}

export const AUTH_ROUTE: IRoute = {
    name: 'Вход',
    path: '/auth'
}

export const TUTOR_LESSONS_ROUTE: IRoute = {
    name: 'Занятия',
    path: '/tutor_lessons'
}

export const ADMIN_TRANSACTIONS_ROUTE: IRoute = {
    name: 'Транзакции',
    path: '/transactions'
}

export const ADMIN_LESSONS_ROUTE: IRoute = {
    name: 'Занятия',
    path: '/lessons'
}

export const LOGIN_ROUTE: IRoute = {
    name: 'Вход',
    path: '/auth/login'
}

export const REGISTRATION_ROUTE: IRoute = {
    name: 'Вход',
    path: '/auth/registration'
}


export const STUDENTS_ROUTE: IRoute = {
    name: 'Студенты',
    path: '/students'
}

export const STUDENT_CREATE_ROUTE: IRoute = {
    name: 'Студенты',
    path: '/student/create'
}

export const STUDENT_UPDATE_ROUTE: IRoute = {
    name: 'Студенты',
    path: '/student/update'
}

export const STUDENT_ROUTE: IRoute = {
    name: 'Студент',
    path: '/student/:id'
}


export const TUTORS_ROUTE: IRoute = {
    name: 'Репетиторы',
    path: '/tutors'
}


export const TUTOR_ROUTE: IRoute = {
    name: 'Репетитор',
    path: '/tutor/:id'
}


export const TUTOR_CREATE_ROUTE: IRoute = {
    name: 'Репетиторы',
    path: '/tutor/create'
}


export const FINANCE_ROUTE: IRoute = {
    name: 'Финансы',
    path: '/finance'
}


export const ADMINS_ROUTE: IRoute = {
    name: 'Админы',
    path: '/admins'
}

export const ADMIN_ROUTE: IRoute = {
    name: 'Админ',
    path: '/admin/:id'
}

export const ADMIN_CREATE_ROUTE: IRoute = {
    name: 'Админы',
    path: '/admin/create'
}


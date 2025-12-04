import React, { FC } from "react";
import classes from './studentChange.module.scss'
import { MyInput } from "../../../../shared/ui/input";
import { useAppSelector } from "../../../../app/store/store";
import { IStudentChange, useStudentActions } from "../../../../entities/student";
import { Send } from "../send/Send";
import { IFormError } from "../../../../shared/model/types";

interface IProps {
    isCreate: boolean;
    chooseSubject?: React.ReactNode;
    chooseTutor: React.ReactNode;
    formError: IFormError<IStudentChange>[];
    setFormError: (formError: IFormError<IStudentChange>[]) => void;
    setErrorFieldDelete: (field: keyof IStudentChange) => () => void;
}

export const StudentChange: FC<IProps> = ({isCreate, chooseSubject, chooseTutor, formError, setErrorFieldDelete, setFormError}) => {

    const {student} = useAppSelector(s => s.studentReducer)

    const {
        setFirstName, setCostPerHour, setLastName, setMiddleName, setParentFullName, 
        setParentPhone, setParentTg, setPhone, setTg, setTgAdminUsername
    } = useStudentActions()

    return (
        <section className={classes.container}>
            <h1 className={classes.title}>{isCreate ? 'Создание' : 'Обновление'} студента</h1>
            <MyInput 
                title="Фамилия студента"
                value={student.last_name}
                setValue={setLastName}
                error={formError.find(error => error.field === 'last_name')?.text}
                setError={setErrorFieldDelete('last_name')}
            />
            <MyInput 
                title="Имя студента"
                value={student.first_name}
                setValue={setFirstName}
                error={formError.find(error => error.field === 'first_name')?.text}
                setError={setErrorFieldDelete('first_name')}
            />
            <MyInput 
                title="Отчество студента"
                value={student.middle_name}
                setValue={setMiddleName}
                error={formError.find(error => error.field === 'middle_name')?.text}
                setError={setErrorFieldDelete('middle_name')}
            />
            <MyInput 
                title="Номер телефона студента"
                value={student.phone}
                setValue={setPhone}
                error={formError.find(error => error.field === 'phone')?.text}
                setError={setErrorFieldDelete('phone')}
            />
            <MyInput 
                title="Телеграм студента"
                value={student.tg}
                setValue={setTg}
                error={formError.find(error => error.field === 'tg')?.text}
                setError={setErrorFieldDelete('tg')}
            />
            <MyInput 
                title="Фио родителя"
                value={student.parent_full_name}
                setValue={setParentFullName}
                error={formError.find(error => error.field === 'parent_full_name')?.text}
                setError={setErrorFieldDelete('parent_full_name')}
            />
            <MyInput 
                title="Номер родителя"
                value={student.parent_phone}
                setValue={setParentPhone}
                error={formError.find(error => error.field === 'parent_phone')?.text}
                setError={setErrorFieldDelete('parent_phone')}
            />
            <MyInput 
                title="Телеграм родителя"
                value={student.parent_tg}
                setValue={setParentTg}
                error={formError.find(error => error.field === 'parent_tg')?.text}
                setError={setErrorFieldDelete('parent_tg')}
            />
            {chooseSubject}
            <MyInput 
                title="Стоимость часа"
                value={student.cost_per_hour}
                setValue={setCostPerHour}
                error={formError.find(error => error.field === 'cost_per_hour')?.text}
                setError={setErrorFieldDelete('cost_per_hour')}
            />
            {chooseTutor}
            <MyInput 
                title="Рабочий аккаунт тг"
                value={student.tg_admin_username}
                setValue={setTgAdminUsername}
                error={formError.find(error => error.field === 'tg_admin_username')?.text}
                setError={setErrorFieldDelete('tg_admin_username')}
            />
            <Send 
                formError={formError} 
                setFormError={setFormError}
                isCreate={isCreate} 
            />
        </section>
    )
}
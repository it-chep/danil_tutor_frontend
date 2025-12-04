import { FC, PropsWithChildren } from "react";
import classes from './lessonItem.module.scss'
import { IAdminLesson } from "../../model/types";
import { getLocaleDate } from "../../../../shared/lib/helpers/getLocalDate";
import { Link } from "react-router-dom";


interface IProps {
    lesson: IAdminLesson;
}

export const AdminLessonItem: FC<IProps & PropsWithChildren> = ({lesson, children}) => {

    return (
        <tr 
            className={classes.item}
        >
            <td>
                {getLocaleDate(new Date(lesson.created_at + 'Z'), true)}
            </td>  
            <td>
                <Link to={'/tutor/' + lesson.tutor_id}>{lesson.tutor_name}</Link>
            </td>
            <td>
                <Link to={'/student/' + lesson.student_id}>{lesson.student_name}</Link>
            </td>
            <td>
                {lesson.duration_in_minutes}
            </td>
            <td className={classes.features}>
                {children}
            </td>
        </tr>
    )
}
import { TUTOR_LESSONS_ROUTE } from "../../app/router/routes";
import { TutorLessons } from "../../widgets/tutorLessons";
import { LayoutPages } from "../layoutPages";

export default function TutorLessonsPage() {

    return (
        <LayoutPages title={TUTOR_LESSONS_ROUTE.name}>
            <TutorLessons />
        </LayoutPages>
    )
}
import { FC } from "react";
import classes from './navHome.module.scss'
import { Section } from "../section/Section";
import { useAppSelector } from "../../../../app/store/store";
import { getSections } from "../../lib/const/sections";

export const NavHome: FC = () => {

    const {my} = useAppSelector(s => s.myReducer)
    const sections = getSections(my)

    return (
        <nav className={classes.nav}>
            {sections.map(section => 
                <Section 
                    key={section.title}
                    title={section.title}
                    sections={section.sections}
                />
            )}
        </nav>
    )
}
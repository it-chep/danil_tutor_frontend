import { FC } from "react";
import { Hint } from "../../../../shared/ui/hint";



export const HintWrap: FC = () => {

    return (
        <Hint 
            hints={[
                {
                    color: '#FF0000',
                    text: 'Есть задолженности'
                },
                {
                    color: '#ECA500',
                    text: 'Проведено только пробное занятие'
                },
                {
                    color: '#FFF',
                    text: 'Новичок'
                },
                {
                    color: '#28AE31',
                    text: 'Проблем нет'
                }
            ]}
        />
    )
}
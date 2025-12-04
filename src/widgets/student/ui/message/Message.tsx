import { FC } from "react";
import classes from './message.module.scss'
import mark1 from '../../../../shared/lib/assets/exclamation_mark.png'
import mark2 from  '../../../../shared/lib/assets/exclamation_mark2.png'
import wallet from '../../../../shared/lib/assets/wallet.png'

interface IProps {
    type: 'balanceNegative' | 'onlyTrial' | 'newbie';
    sign: string;
}

export const Message: FC<IProps> = ({type, sign}) => {

    return (
        <section 
            className={
                classes.container + 
                (type === 'balanceNegative' ? ` ${classes.balanceNegative}` : type === 'newbie' ? ` ${classes.newbie}` : ` ${classes.onlyTrial}`)
            }
        >
            <img src={type === 'balanceNegative' ? mark1 : type === 'onlyTrial' ? mark2 : wallet} />
            {sign}
        </section>
    )
}
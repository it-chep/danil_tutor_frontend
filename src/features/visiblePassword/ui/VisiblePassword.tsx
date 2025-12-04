import { ComponentProps, FC, useState } from "react";
import classes from './visiblePassword.module.scss'
import { MyInput } from "../../../shared/ui/input";
import lockImg from '../lib/lock.png'
import unlockImg from '../lib/unlock.png'

interface IProps {
    value: string;
    setValue: (value: string) => void;
    isLoading?: boolean;
    error?: string;
    setError?: (err: string) => void;
}

export const VisiblePassword: FC<IProps & ComponentProps<"input">> = ({value, setValue, error, setError, isLoading, ...props}) => {

    const [isLock, setIsLock] = useState<boolean>(true)

    const onClick = () => {
        setIsLock(!isLock)
    }
 
    return (
        <MyInput 
            value={value} 
            setValue={setValue}
            type={isLock ? "password" : "text"}
            placeholder={props.placeholder || 'Пароль...'}
            isLoading={isLoading}
            error={error}
            setError={setError}
            {...props}
        >
            <img 
                className={classes.lock} 
                src={isLock ? lockImg : unlockImg} 
                onClick={onClick}    
            />
        </MyInput>
    )
}
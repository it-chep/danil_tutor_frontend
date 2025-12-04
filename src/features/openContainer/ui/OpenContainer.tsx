import { FC, PropsWithChildren, useRef, useState } from "react";
import classes from './openContainer.module.scss'


interface IProps {
    title: string;
}

export const OpenContainer: FC<IProps & PropsWithChildren> = ({title, children}) => {


    const contentRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState<boolean>(false)

    const onOpen = () => {
        if(contentRef.current){
            const newOpen = !open;
            
            if(newOpen){
                const contentHeight = contentRef.current.scrollHeight;
                contentRef.current.style.height = contentHeight + 'px';
            }
            else{
                contentRef.current.style.height = '0px'
            }
    
            setOpen(newOpen)
        }
    }

    return (
        <section className={classes.container}>
            <section 
                onClick={onOpen} 
                className={classes.title}
                onMouseDown={e => e.preventDefault()}
            >
                {title}
                 <svg className={open ? classes.open : ''} width="19" height="11" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.23181 8.68484C7.65607 9.10505 8.34392 9.10505 8.76818 8.68484L15.6818 1.83693C16.1061 1.4167 16.1061 0.735389 15.6818 0.315166C15.2575 -0.105055 14.5697 -0.105055 14.1455 0.315166L7.99999 6.4022L1.85456 0.315166C1.4303 -0.105055 0.742449 -0.105055 0.31819 0.315166C-0.106063 0.735388 -0.106063 1.4167 0.31819 1.83693L7.23181 8.68484ZM6.91362 6.84791V7.92395H9.08636V6.84791H6.91362Z" fill="black"/>
                </svg>
            </section>
            <section 
                ref={contentRef} 
                className={classes.content}
            >
                {children}
            </section>
        </section>
    )
}
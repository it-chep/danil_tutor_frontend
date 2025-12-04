import React, { JSX, useState } from 'react';
import classes from './calendar.module.scss';
import arrowLeft from '../../../shared/lib/assets/ArrowLeft.png'
import arrowRight from '../../../shared/lib/assets/ArrowRight.png'

interface CalendarProps {
    isLoading?: boolean;
    onDateRangeSelect?: (startDate: Date | null, endDate: Date | null) => void;
    oneDate?: boolean;
}

export const Calendar: React.FC<CalendarProps> = ({onDateRangeSelect, isLoading, oneDate}) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [hoverDate, setHoverDate] = useState<Date | null>(null);
    const [open, setOpen] = useState<boolean>(false)

    // Функции для навигации
    const prevMonth = (): void => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = (): void => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

  // Получение дат для трех месяцев
    const getThreeMonths = (): Date[] => {
        const months: Date[] = [];
        let interval = oneDate ? [0, 0] : [-1, 1] 
        for (let i = interval[0]; i <= interval[1]; i++) {
            const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
            months.push(monthDate);
        }
        return months;
    };

    // Проверка, находится ли дата в выбранном диапазоне
    const isInRange = (date: Date): boolean => {
        if (!startDate || !endDate) return false;
        return date > startDate && date < endDate;
    };

    // Проверка, является ли дата началом или концом диапазона
    const isRangeEdge = (date: Date): boolean => {
        if (!startDate || !endDate) return false;
        return date.getTime() === startDate.getTime() || date.getTime() === endDate.getTime();
    };

    const getLocalDate = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
    } 

    // Обработчик клика по дате
    const handleDateClick = (date: Date): void => {

        if(oneDate){
            const newStartDate: Date | null = date;
            setStartDate(newStartDate);
            setHoverDate(null);
            setOpen(false)
            if(onDateRangeSelect) {
                onDateRangeSelect(getLocalDate(newStartDate), null);
            }
            return
        }

        let newStartDate: Date | null = startDate;
        let newEndDate: Date | null = endDate;

        if (!startDate || (startDate && endDate)) {
            newStartDate = date;
            newEndDate = null;
        } else if (date > startDate) {
            newEndDate = date;
        } else {
            newStartDate = date;
            newEndDate = null;
        }

        setStartDate(newStartDate);
        setEndDate(newEndDate);
        setHoverDate(null);

        if(newStartDate && newEndDate){
            setOpen(false)
        }

        if (onDateRangeSelect && newStartDate && newEndDate) {
            onDateRangeSelect(getLocalDate(newStartDate), getLocalDate(newEndDate));
        }
    };

    // Обработчик наведения на дату
    const handleDateHover = (date: Date): void => {
        if (startDate && !endDate) {
            setHoverDate(date);
        }
    };

    // Генерация календаря для месяца
    const renderMonth = (monthDate: Date): JSX.Element[] => {
        const year = monthDate.getFullYear();
        const month = monthDate.getMonth();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        const startDay = firstDay.getDay();
        const days: JSX.Element[] = [];

        // Пустые ячейки перед первым днем месяца
        for (let i = 0; i < startDay; i++) {
            days.push(<section key={`empty-${i}`} className={classes.calendarDay + " " + classes.empty}></section>);
        }

        // Дни месяца
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isStart = startDate && date.getTime() === startDate.getTime();
            const isEnd = endDate && date.getTime() === endDate.getTime();
            const isHoverEnd = hoverDate && !endDate && startDate && date.getTime() === hoverDate.getTime();
            const inRange = isInRange(date);
            const isRangeEdgeDate = isRangeEdge(date);
            const isToday = date.toDateString() === new Date().toDateString();

            const dayClass = [
                classes.calendarDay,
                isStart && classes.startDate,
                isEnd && classes.endDate,
                inRange && classes.inRange,
                isRangeEdgeDate && classes.rangeEdge,
                isHoverEnd && classes.hoverEnd,
                isToday && classes.today
            ].filter(Boolean).join(' ');

            days.push(
                <section
                    key={date.toISOString()}
                    className={dayClass}
                    onClick={() => handleDateClick(date)}
                    onMouseEnter={() => handleDateHover(date)}
                >
                    {day}
                </section>
            );
        }

        return days;
    };

    const months = getThreeMonths();

    const onOpen = () => {
        if(!isLoading){
            setOpen(!open)
        }
    }

    return (
        <section className={classes.calendarContainer + (oneDate ? ` ${classes.oneDate}` : '')}>
            <section 
                onMouseDown={e => e.preventDefault()}
                onClick={onOpen} 
                className={classes.selectedRange + (isLoading ? ` ${classes.disabled}` : '')}
            >
                <p>
                    {
                        oneDate
                            ?
                        <>
                            Дата: {!startDate ? 'Выберите дату' : startDate?.toLocaleDateString()}
                        </>
                            :
                        <>
                            Период: {(!startDate && !endDate) ? 'Выберите даты' : 
                            (startDate && !endDate) ? 'Выберите вторую дату' :  
                            endDate && `${startDate?.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}
                        </>
                    }
                </p>
            </section>
            {
                open
                    &&
                <section className={classes.wrapper}>
                    <section className={classes.calendarHeader}>
                        <button onClick={prevMonth} className={classes.navButton}>
                            <img src={arrowLeft} />
                        </button>
                        <section className={classes.currentMonth}>
                            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </section>
                        <button onClick={nextMonth} className={classes.navButton}>
                            <img src={arrowRight} />
                        </button>
                    </section>

                    <section className={classes.calendarMonths}>
                        {months.map((monthDate, index) => (
                            <section key={index} className={classes.calendarMonth}>
                                <h3>
                                    {monthDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                </h3>
                                <section className={classes.calendarWeekdays}>
                                    {['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map(day => (
                                        <section key={day} className={classes.weekday}>{day}</section>
                                    ))}
                                </section>
                                <section className={classes.calendarDays}>
                                    {renderMonth(monthDate)}
                                </section>
                            </section>
                        ))}
                    </section>
                </section>
            }
        </section>
    );
};

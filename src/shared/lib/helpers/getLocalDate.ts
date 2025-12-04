


export const getLocaleDate = (date: Date, time?: boolean ) => {
    if(time){
        return date.toLocaleString()
    }
    return date.toLocaleString('ru', {day: '2-digit', month: '2-digit', year: 'numeric'})
}
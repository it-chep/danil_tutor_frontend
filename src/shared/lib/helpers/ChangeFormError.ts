import { IFormError } from "../../model/types"


export const changeFormError = <T>(formError: IFormError<T>[], setFormError: (formError: IFormError<T>[]) => void) =>  {

    return (field: keyof T) => {
        return () => {
            const targetInd = formError.findIndex(error => error.field === field)
            if(targetInd >= 0){
                const newFormError = [...formError]
                newFormError.splice(targetInd, 1)
                setFormError(newFormError)
            }   
        }
    }
}
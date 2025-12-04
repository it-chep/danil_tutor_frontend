import { fetchAuth } from "../../../shared/api/ApiService"
import { ISubject } from "../model/types"



class SubjectService {

    async getAll(){
        const res = await fetchAuth(process.env.REACT_APP_SERVER_URL_ADMIN + '/subjects')
        const {subjects}: {subjects: ISubject[]} = await res.json()
        return subjects        
    }

}

export const subjectService = new SubjectService()
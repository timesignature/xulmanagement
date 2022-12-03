import {useQuery} from "react-query";
import http from "../http";

export default function useEmployees(state){
    return useQuery([
        'employees',
        state?.name ?? '',
        state?.designation ?? '',
        state?.department ?? '',
        state?.religion ?? ''
    ],()=>http.get(`/employees?name=${state?.name ?? ''}&designation=${state?.designation ?? ''}&department=${state?.department ?? ''}&religion=${state?.religion ?? ''}`)
        .then(res=>res.data))
}

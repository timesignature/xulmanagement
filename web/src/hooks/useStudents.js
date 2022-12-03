import {useQuery} from "react-query";
import http from "../http";

export default function useStudents(state){
    return useQuery([
        'students',
        state?.name ?? '',
        state?.section ?? '',
        state?.gender ?? '',
        state?.religion ?? ''
    ],()=>http.get(`/students?name=${state?.name ?? ''}&section=${state?.section ?? ''}&gender=${state?.gender ?? ''}&religion=${state?.religion ?? ''}`)
        .then(res=>{
            return res.data;
        }))
}

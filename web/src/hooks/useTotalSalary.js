import {useQuery} from "react-query";
import http from "../http";

export default function useTotalSalary(){
    return useQuery(['totalSalary'],()=>http.get('/slips/total').then(res=>res.data))
}

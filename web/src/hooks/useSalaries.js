import {useQuery} from "react-query";
import http from "../http";

export default function useSalaries(){
    return useQuery(['salaries'],()=>http.get('/salaries').then(res=>res.data))
}

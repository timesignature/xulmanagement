import {useQuery} from "react-query";
import http from "../http";

export default function useSalaryProperties(state){
    return useQuery(['SalaryProperties',state?.type],()=>http.get(`/salary_properties?type=${state?.type}`).then(res=>res.data))
}

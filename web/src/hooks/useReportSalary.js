import {useQuery} from "react-query";
import http from "../http";

export default function useReportSalary(state){
    return useQuery(['reports','salaries',state?.from,state?.to],()=>http.get(`/reports/salary?from=${state?.from}&to=${state?.to}`).then(res=>res.data))
}

import {useQuery} from "react-query";
import http from "../http";

export default function useReportExpenses(state){
    return useQuery(['reports','expenses',state?.from,state?.to],()=>http.get(`/reports/expenses?from=${state?.from}&to=${state?.to}`).then(res=>res.data))
}

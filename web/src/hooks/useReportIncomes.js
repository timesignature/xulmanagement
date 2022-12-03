import {useQuery} from "react-query";
import http from "../http";

export default function useReportIncomes(state){
    return useQuery(['reports','incomes',state?.from,state?.to],()=>http.get(`/reports/incomes?from=${state?.from}&to=${state?.to}`).then(res=>res.data))
}

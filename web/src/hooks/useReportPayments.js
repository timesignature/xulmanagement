import {useQuery} from "react-query";
import http from "../http";

export default function useReportPayments(state){
    return useQuery(['reports','payments',state?.from,state?.to],()=>http.get(`/reports/payments?from=${state?.from}&to=${state?.to}`).then(res=>res.data))
}

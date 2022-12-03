import {useQuery} from "react-query";
import http from "../http";

export default function useTransactions(state){
    return useQuery(['transactions',state?.type],()=>http.get(`/transactions?type=${state?.type}`).then(res=>res.data))
}

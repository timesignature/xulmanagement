import {useQuery} from "react-query";
import http from "../http";

export default function useInvoices(state={}){
    return useQuery([
        'invoices',
        state?.student
    ],()=>http.get(`/invoices?student=${state?.student ?? ''}`)
        .then(res=>{
            return res.data;
        }))
}

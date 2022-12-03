import {useQuery} from "react-query";
import http from "../http";

export default function useInvoicePayments(id){
    return useQuery(['invoice-payments',id],()=>http.get(`/payments/invoice/${id}`).then(res=>res.data),{

    })
}

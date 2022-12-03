import {useQuery} from "react-query";
import http from "../http";

export default function useInvoiceService(id){
    return useQuery(['invoice-service',id],()=>http.get(`/invoice_services/${id}`).then(res=>res.data))
}

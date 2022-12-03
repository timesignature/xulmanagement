import {useQuery} from "react-query";
import http from "../http";

export default function useInvoice(id){
    return useQuery(['invoice',id],()=>http.get(`/invoice/${id}`).then(res=>res.data))
}

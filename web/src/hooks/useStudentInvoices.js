import {useQuery} from "react-query";
import http from "../http";

export default function useStudentInvoices(id){
    return useQuery(['student-invoice',id],()=>http.get(`invoices/students/${id}`).then(res=>res.data))
}

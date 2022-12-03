import {useQuery} from "react-query";
import http from "../http";

export default function useTransaction(id){
    return useQuery(['transaction',id],()=>http.get(`/transaction/${id}`).then(res=>res.data))
}

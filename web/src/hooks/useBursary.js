import {useQuery} from "react-query";
import http from "../http";

export default function useBursary(id){
    return useQuery(['bursary',id],()=>http.get(`/bursary/${id}`).then(res=>res.data))
}

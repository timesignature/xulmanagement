import {useQuery} from "react-query";
import http from "../http";

export default function useService(id){
    return useQuery(['service',id],()=>http.get(`/service/${id}`).then(res=>res.data))
}

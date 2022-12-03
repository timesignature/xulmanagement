import {useQuery} from "react-query";
import http from "../http";

export default function useSections(){
    return useQuery(['sections'],()=>http.get('/sections').then(res=>res.data))
}

import {useQuery} from "react-query";
import http from "../http";

export default function useCurrentTerm(){
    return useQuery(['current-term'],()=>http.get('/term-current').then(res=>res.data))
}

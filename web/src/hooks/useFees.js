import {useQuery} from "react-query";
import http from "../http";

export default function useFees(){
    return useQuery(['fees'],()=>http.get('/fees').then(res=>res.data))
}

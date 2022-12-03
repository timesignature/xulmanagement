import {useQuery} from "react-query";
import http from "../http";

export default function useDesignations(){
    return useQuery(['designations'],()=>http.get('/designations').then(res=>res.data))
}

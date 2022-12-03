import {useQuery} from "react-query";
import http from "../http";

export default function useGuardians(){
    return useQuery(['guardians'],()=>http.get('/guardians').then(res=>res.data))
}

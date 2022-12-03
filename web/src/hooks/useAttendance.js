import {useQuery} from "react-query";
import http from "../http";

export default function useAttendance(){
    return useQuery(['attendance'],()=>http.get('/attendance').then(res=>res.data))
}

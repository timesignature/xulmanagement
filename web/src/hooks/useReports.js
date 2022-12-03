import {useQuery} from "react-query";
import http from "../http";

export default function useReports(state){
    return useQuery(['reports',state?.term],()=>http.get(`/reports?term=${state?.term}`).then(res=>res.data))
}

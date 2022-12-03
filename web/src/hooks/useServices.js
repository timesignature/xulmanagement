import {useQuery} from "react-query";
import http from "../http";

export default function useServices(){
    return useQuery(['services'],()=>http.get('/services').then(res=>res.data))
}

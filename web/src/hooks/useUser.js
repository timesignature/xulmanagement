import {useQuery} from "react-query";
import http from "../http";

export default function useUser(id){
    return useQuery([
        'user',
        id,
    ],()=>http.get(`/user/${id}`)
        .then(res=>res.data))
}

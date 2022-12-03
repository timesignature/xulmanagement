import {useQuery} from "react-query";
import http from "../http";

export default function useUsers(state){
    return useQuery([
        'users',
        state?.name,
    ],()=>http.get(`/users?name=${state?.name ?? ''}`)
        .then(res=>res.data))
}

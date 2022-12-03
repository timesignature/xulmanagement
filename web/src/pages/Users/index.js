import Layout from "../Layout";
import {useState} from "react";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent";
import EmptyComponent from "../../components/EmptyComponent";
import useUsers from "../../hooks/useUsers";
import {Link} from "react-router-dom";
import {debounce} from "lodash";

export default function Users(){


    const [state,setState]=useState({
        name:'',
    })

    const {data:users,isLoading,isError}=useUsers(state)

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }


    const updateQuery=e=>handleChange(e)



    const debounceOnChange=debounce(updateQuery,1000)


    const Rendered=()=>{
        if(isLoading){
            return (
                <LoadingComponent/>
            )
        }

        if(isError){
            return (
                <ErrorComponent/>
            )
        }

        return users && (
            <div>
                {
                    users.length > 0 ? (
                        <table className="w-full">
                            <thead>
                            <tr className='bg-zinc-50'>
                                <td className='w-52 text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Details</td>
                                <td className='text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Email Address</td>
                                <td className='w-20 text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Active</td>
                                <td className='w-20 text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Admin</td>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                users.map(s=>(
                                    <tr key={s.id} className='hover:shadow'>
                                        <td className='text-xs px-2 py-5 border-b border-zinc-200'>
                                            <Link to={`/users/edit/${s.id}`} className={'text-teal-600'}>
                                                {s.name}
                                            </Link>

                                            <span className="block text-[10px] mt-1 text-zinc-400">
                                                {s?.is_admin ? 'Admin' : 'Moderator'}
                                            </span>
                                        </td>
                                        <td className='text-xs px-2 py-5 border-b border-zinc-200'>{s.email}</td>
                                        <td className='text-xs px-2 py-5 border-b border-zinc-200'>
                                            <span className={`px-2 py-[2px] rounded-full ${s?.is_active ? 'text-white bg-green-600' : 'text-zinc-900 bg-zinc-200'}`}>
                                                {s?.is_active ? 'True' : 'False'}
                                            </span>
                                        </td>
                                        <td className='text-xs px-2 py-5 border-b border-zinc-200'>
                                            <span className={`px-2 py-[2px] rounded-full ${s?.is_admin ? 'text-white bg-green-600' : 'text-zinc-900 bg-zinc-200'}`}>
                                              {s?.is_admin  ? 'True' : 'False'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    ) : (
                        <EmptyComponent/>
                    )
                }
            </div>
        )
    }





    return (
        <Layout>
            <div className="p-20">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="block text-4xl">System Users</span>
                        <span className="block text-xs mt-5">
                            List of system users
                        </span>
                    </div>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-4">

                    <div>
                        <label>
                            <span className="block text-xs mb-3">
                                User Name
                            </span>
                            <input
                                type="text"
                                className="input"
                                name={'name'}
                                onChange={debounceOnChange}
                            />
                        </label>
                    </div>

                </div>

                <div className="mt-10">
                    <Rendered/>
                </div>
            </div>
        </Layout>
    )
}

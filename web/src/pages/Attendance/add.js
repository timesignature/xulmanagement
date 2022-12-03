import Layout from "../Layout";
import React, {useState} from "react";
import {useMutation} from "react-query";
import http from "../../http";
import {success, warning} from "../../components/ToastComponent";
import {useHistory} from "react-router-dom";
import useEmployees from "../../hooks/useEmployees";
import InputComponent from "../../components/InputComponent";

export default function AddAttendance(){


    const {data:employees}=useEmployees({})

    const [state, setState] = useState({
        employee:'',
        in:'',
        out:'',
    });






    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }



    const h=useHistory()

    const mutation=useMutation(values=>http.post('/attendance/manual',values).then(res=>res.data),{
        onSuccess:async()=>{
            success('new entry has been successfully added')
            h.push('/attendance')

        },
        onError:(e)=>{
            warning('something went wrong')
            setErrors(e.response.data.errors || {})
        }
    })


    const submit=()=>{
        mutation.mutate(state)
    }

    return (
        <Layout>
            <div className="p-20">
                <span className="block text-4xl">Attendance</span>
                <span className="block text-xs mt-5">New Entry</span>


                <div className="mt-10 w-1/2">

                    <div className="">
                        <label>
                            <span className="block text-xs mb-3">
                                Employees
                            </span>
                            <select
                                value={state.employee}
                                onChange={handleChange}
                                name={'employee'}
                                className={`input ${errors.employee ? 'border-red-600' : 'border-zinc-200'}`}
                            >
                                <option value="">Select</option>
                                {
                                    employees && employees.map(e=>(
                                        <option key={e.id} value={e.id}>{e.fullname}</option>
                                    ))
                                }
                            </select>
                            {
                                errors.employee && (
                                    <span className="block text-xs mt-3 text-red-600">{errors.employee[0]}</span>
                                )
                            }
                        </label>
                    </div>

                    <div className="mt-10 grid grid-cols-2 gap-8">

                        <div>
                            <InputComponent

                                onChange={handleChange}
                                name={'in'}
                                value={state.in}
                                error={errors.in}
                                title={'Clock In'}
                                type={'datetime-local'}
                            />
                        </div>

                        <div>
                            <InputComponent

                                onChange={handleChange}
                                name={'out'}
                                value={state.out}
                                error={errors.out}
                                title={'Clock Out'}
                                type={'datetime-local'}
                            />
                        </div>



                    </div>


                    <div className="mt-10">
                        <button onClick={()=>submit()} className="btn btn-primary">
                            {
                                mutation.isLoading ? '...Saving New Entry' : 'Save New Entry'
                            }
                        </button>
                    </div>
                </div>


                <div className="py-20"></div>


            </div>
        </Layout>
    )
}

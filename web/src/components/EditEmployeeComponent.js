import useDepartments from "../hooks/useDepartments";
import useDesignations from "../hooks/useDesignations";
import {useEffect, useRef, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {useMutation} from "react-query";
import http from "../http";
import {success} from "./ToastComponent";
import useEmployee from "../hooks/useEmployee";
import InputComponent from "./InputComponent";
import SelectComponent from "./SelectComponent";
import DesignationComponent from "./DesignationComponent";
import DepartmentComponent from "./DepartmentComponent";
import EditAvatarComponent from "./EditAvatarComponent";
import {QRCodeSVG} from 'qrcode.react';
import ReactToPrint from 'react-to-print';

export default function EditEmployeeComponent(){




    const componentRef = useRef();


    const {id}=useParams()

    const {data:employee}=useEmployee(id)

    const {data:departments}=useDepartments()
    const {data:designations}=useDesignations()

    const [state,setState]=useState({
        name:'',
        surname:'',
        avatar:null,
        dob:'',
        joining:'',
        religion:'',
        nationality:'',
        national_id:'',
        phone:'',
        email:'',
        address:'',
        city:'',
        country:'',
        department_id:'',
        designation_id:'',
    })

    useEffect(()=>{
        if(employee){
            setState(employee)
        }
    },[employee])

    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }



    const h=useHistory()

    const mutation=useMutation(values=>http.put(`/employees/${id}`,values).then(res=>res.data),{
        onSuccess:async()=>{
            setErrors({})
            success('employee has been successfully created')
            h.push('/employees')
        },
        onError:(e)=>{
            setErrors(e.response.data.errors || {})
        }
    })


    const submit=()=>{
        mutation.mutate(state)
    }




    return (
        <div>


            {
                employee && (
                    <div className="mt-10 flex gap-10">

                        <div className="flex-1">
                            <div className="grid grid-cols-2 gap-10">
                                <div className="col-span-2">
                                    <span className="block text-3xl text-p-100">Employee Details</span>
                                </div>
                                <div>
                                    <EditAvatarComponent
                                        image={employee.avatar}
                                        link={`/employees/avatar/${id}`}
                                        invalidate={['employee',id]}
                                    />
                                </div>
                                <div>
                                </div>
                                <div>
                                    <InputComponent
                                        title={'First Name'}
                                        value={state.name}
                                        error={errors.name}
                                        onChange={handleChange}
                                        name={'name'}
                                    />
                                </div>

                                <div>
                                    <InputComponent
                                        title={'Last Name'}
                                        value={state.surname}
                                        error={errors.surname}
                                        onChange={handleChange}
                                        name={'surname'}
                                    />
                                </div>

                                <div className={'col-span-2'}>
                                    <InputComponent
                                        type={'date'}
                                        title={'DOB'}
                                        value={state.dob}
                                        error={errors.dob}
                                        onChange={handleChange}
                                        name={'dob'}
                                    />
                                </div>

                                {/*<div>*/}
                                {/*    <SelectComponent*/}
                                {/*        name={'gender'}*/}
                                {/*        onChange={handleChange}*/}
                                {/*        value={state.gender}*/}
                                {/*        error={errors.gender}*/}
                                {/*        title={'Gender'}*/}
                                {/*        data={['Male','Female']}*/}
                                {/*    />*/}
                                {/*</div>*/}

                                <div>
                                    <InputComponent
                                        title={'Nationality'}
                                        value={state.nationality}
                                        error={errors.nationality}
                                        onChange={handleChange}
                                        name={'nationality'}
                                    />
                                </div>


                                <div>
                                    <InputComponent
                                        title={'National ID'}
                                        value={state.national_id}
                                        error={errors.national_id}
                                        onChange={handleChange}
                                        name={'national_id'}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <SelectComponent
                                        name={'religion'}
                                        title={'Religion'}
                                        onChange={handleChange}
                                        value={state.religion}
                                        error={errors.religion}
                                        data={['Christianity','Muslim']}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <span className="block text-3xl text-p-100">Employment Details</span>
                                </div>

                                <div>
                                    <label>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="block text-xs">Department</span>
                                        </div>
                                        <select
                                            name={'department_id'}
                                            value={state.department_id}
                                            onChange={handleChange}
                                            className={`input ${errors.department_id ? 'border-red-600' : 'border-zinc-200'}`}
                                        >
                                            <option value="">Select</option>
                                            {
                                                departments && departments.map(s=>(
                                                    <option key={s.id} value={s.id}>{s.title}</option>
                                                ))
                                            }
                                        </select>
                                        {
                                            errors.department_id && (
                                                <span className="block text-xs text-red-600 mt-3">
                                                {errors.department_id[0]}
                                            </span>
                                            )
                                        }
                                    </label>
                                </div>

                                <div>
                                    <label>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="block text-xs">Designation</span>
                                        </div>
                                        <select
                                            value={state.designation_id}
                                            name={'designation_id'}
                                            onChange={handleChange}
                                            className={`input ${errors.designation_id ? 'border-red-600' : 'border-zinc-200'}`}
                                        >
                                            <option value="">Select</option>
                                            {
                                                designations && designations.map(s=>(
                                                    <option key={s.id} value={s.id}>{s.title}</option>
                                                ))
                                            }
                                        </select>
                                        {
                                            errors.designation_id && (
                                                <span className="block text-xs text-red-600 mt-3">
                                                {errors.designation_id[0]}
                                            </span>
                                            )
                                        }
                                    </label>
                                </div>

                                <div>
                                    <InputComponent
                                        type={'date'}
                                        title={'Joining Date'}
                                        value={state.joining}
                                        name={'joining'}
                                        error={errors.joining}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <span className="block text-3xl text-p-100">Contact Information</span>
                                </div>

                                <div>
                                    <InputComponent
                                        title={'Phone No.'}
                                        value={state.phone}
                                        name={'phone'}
                                        error={errors.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <InputComponent

                                        title={'Email Address'}
                                        value={state.email}
                                        name={'email'}
                                        error={errors.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='col-span-2'>
                                    <InputComponent
                                        type={'textarea'}
                                        title={'Home Address'}
                                        value={state.address}
                                        name={'address'}
                                        error={errors.address}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <InputComponent
                                        title={'City'}
                                        value={state.city}
                                        name={'city'}
                                        error={errors.city}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <InputComponent
                                        title={'Country'}
                                        value={state.country}
                                        name={'country'}
                                        error={errors.country}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <button onClick={()=>mutation.isLoading ? null : submit()} className='btn bg-p-100 text-white'>
                                        {
                                            mutation.isLoading ? '... Updating entry' : 'Update entry'
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/3">
                            <DesignationComponent/>
                            <div className="mt-20">
                                <DepartmentComponent/>
                            </div>

                            <div className="mt-20">
                                <div className='flex flex-col items-start'>
                                   <div className="p-5 border border-zinc-300 print:border print:flex print:flex-col print:items-center print:justify-center" ref={componentRef}>
                                       <QRCodeSVG value={`${employee.id}`} />
                                       <div className='mt-5'>
                                           <span className="block text-base text-center">MNB College</span>
                                           <span className="block text-xs text-center">{employee.fullname}</span>
                                       </div>
                                   </div>

                                    <div className="mt-10">
                                        <ReactToPrint
                                            trigger={() => (
                                                <button className="w-10 h-10 focus:outline-none bg-zinc-50 text-p-100 rounded-lg flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                                    </svg>
                                                </button>
                                            )}
                                            content={() => componentRef.current}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                )
            }

        </div>
    )
}

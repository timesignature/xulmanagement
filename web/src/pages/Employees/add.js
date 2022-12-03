import Layout from "../Layout";
import {useState} from "react";
import {useMutation} from "react-query";
import http from "../../http";
import InputComponent from "../../components/InputComponent";
import SelectComponent from "../../components/SelectComponent";
import UploadComponent from "../../components/UploadComponent";
import {useHistory} from "react-router-dom";
import {success} from "../../components/ToastComponent";
import useDepartments from "../../hooks/useDepartments";
import useDesignations from "../../hooks/useDesignations";
import DesignationComponent from "../../components/DesignationComponent";
import DepartmentComponent from "../../components/DepartmentComponent";

export default function AddEmployees(){



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
        department:'',
        designation:'',
    })

    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }



    const h=useHistory()

    const mutation=useMutation(values=>http.post('/employees',values).then(res=>res.data),{
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
        const fd=new FormData()
        fd.append('image',state.image)
        fd.append('name',state.name)
        fd.append('surname',state.surname)
        fd.append('dob',state.dob)
        fd.append('nationality',state.nationality)
        fd.append('religion',state.religion)
        fd.append('joining',state.joining)
        fd.append('national_id',state.national_id)
        fd.append('department',state.department)
        fd.append('designation',state.designation)
        fd.append('phone',state.phone)
        fd.append('email',state.email)
        fd.append('address',state.address)
        fd.append('city',state.city)
        fd.append('country',state.country)
        mutation.mutate(fd)
    }

    return (
        <Layout>
            <div className="p-20">
                <span className="block text-4xl font-medium">Employees</span>
                <span className="block text-xs mt-5 font-light">Create new entry</span>

                <div className="mt-10 flex gap-10">

                    <div className="flex-1">
                        <div className="grid grid-cols-2 gap-10">
                            <div className="col-span-2">
                                <span className="block text-3xl text-p-100">Employee Details</span>
                            </div>
                            <div>
                                <UploadComponent errors={errors.image} title={'Photo'} image={state.image} setState={setState}/>
                            </div>
                            <div></div>
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
                                        name={'department'}
                                        value={state.department}
                                        onChange={handleChange}
                                        className={`input ${errors.department ? 'border-red-600' : 'border-zinc-200'}`}
                                    >
                                        <option value="">Select</option>
                                        {
                                            departments && departments.map(s=>(
                                                <option key={s.id} value={s.id}>{s.title}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors.department && (
                                            <span className="block text-xs text-red-600 mt-3">
                                                {errors.department[0]}
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
                                        value={state.designation}
                                        name={'designation'}
                                        onChange={handleChange}
                                        className={`input ${errors.designation ? 'border-red-600' : 'border-zinc-200'}`}
                                    >
                                        <option value="">Select</option>
                                        {
                                            designations && designations.map(s=>(
                                                <option key={s.id} value={s.id}>{s.title}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors.designation && (
                                            <span className="block text-xs text-red-600 mt-3">
                                                {errors.designation[0]}
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
                                        mutation.isLoading ? '... Saving new entry' : 'Save new entry'
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
                    </div>

                </div>
            </div>

        </Layout>
    )
}

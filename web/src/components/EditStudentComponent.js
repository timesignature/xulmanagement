
import {useEffect, useState} from "react";
import {useMutation} from "react-query";
import useSections from "../hooks/useSections";
import {useHistory} from "react-router-dom";
import {success, warning} from "./ToastComponent";
import InputComponent from "./InputComponent";
import SelectComponent from "./SelectComponent";
import SectionComponent from "./SectionComponent";
import {useParams} from "react-router-dom/cjs/react-router-dom";
import useStudent from "../hooks/useStudent";
import http from "../http";
import LoadingComponent from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";
import EditAvatarComponent from "./EditAvatarComponent";
import EditGuardianComponent from "./EditGuardianComponent";
import SwitchButton from "./SwitchButton";



export default function EditStudentComponent(){

    const {id}=useParams()

    const {data:student,isLoading,isError}=useStudent(id)
    const {data:sections}=useSections()

    const [state,setState]=useState({
        name:'',
        surname:'',
        gender:'',
        dob:'',
        nationality:'',
        national_id:'',
        religion:'',
        joining_date:'',
        section_id:'',
        is_active:true,
        reason:'',
    })

    useEffect(()=>{
        if(student){
            setState(student)
        }
    },[student])

    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    const h=useHistory()

    const mutation=useMutation(values=>http.put(`/students/${id}`,values).then(res=>res.data),{
        onSuccess:async()=>{
            setErrors({})
            success('a new student entry has been successfully added to the list of other students')
            h.push('/students')
        },
        onError:(e)=>{
            warning()
            setErrors(e.response.data.errors || {})
        }
    })


    const submit=()=>{
        mutation.mutate(state)
    }



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

    return student && (
        <div>
            <div className="mt-10 flex gap-10">
                <div className="flex-1">
                    <div className="grid grid-cols-2 gap-10">
                        <div className="col-span-2">
                            <span className="block text-3xl text-p-100">Student Details</span>
                        </div>
                        <div>
                            <EditAvatarComponent
                                image={student.avatar}
                                link={`/students/avatar/${id}`}
                                invalidate={['student',id]}
                            />
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

                        <div>
                            <SelectComponent
                                name={'gender'}
                                onChange={handleChange}
                                value={state.gender}
                                error={errors.gender}
                                title={'Gender'}
                                data={['Male','Female']}
                            />
                        </div>

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
                                onChange={handleChange}
                                value={state.religion}
                                error={errors.religion}
                                data={['Christianity','Muslim']}
                            />
                        </div>

                        <div className="col-span-2">
                            <span className="block text-3xl text-p-100">School Details</span>
                        </div>

                        <div className={'col-span-2'}>
                            <label>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="block text-sm">Sections</span>
                                    <SectionComponent/>
                                </div>
                                <select
                                    name={'section_id'}
                                    value={state.section_id}
                                    onChange={handleChange}
                                    className={`input ${errors.section_id ? 'border-red-600' : 'border-zinc-200'}`}
                                >
                                    <option value="">Select</option>
                                    {
                                        sections && sections.map(s=>(
                                            <option key={s.id} value={s.id}>{s.title}</option>
                                        ))
                                    }
                                </select>
                                {
                                    errors.section_id && (
                                        <span className="block text-xs text-red-600 mt-3">
                                                {errors.section_id[0]}
                                            </span>
                                    )
                                }
                            </label>
                        </div>

                        <div>
                            <InputComponent
                                type={'date'}
                                title={'Joining Date'}
                                value={state.joining_date}
                                name={'joining_date'}
                                error={errors.joining_date}
                                onChange={handleChange}
                            />
                        </div>


                        <div className="col-span-2">
                            <span className="block text-3xl text-p-100">Student Status</span>
                        </div>

                        <div>
                            <SwitchButton title={'Activate/Deactivate Student'} enabled={state.is_active} setEnabled={(val)=>setState(prev=>({...prev,is_active: val}))}/>
                        </div>
                        {
                            state.is_active ? (<div/>) : (
                                <div className={'col-span-2'}>
                                    <InputComponent
                                        type={'textarea'}
                                        title={'Reason For Deactivating Student'}
                                        value={state.reason}
                                        name={'reason'}
                                        error={errors.reason}
                                        onChange={handleChange}
                                    />

                                </div>
                            )
                        }

                        <div className="col-span-2">
                            <span className="block text-3xl text-p-100">Parent Details</span>
                        </div>
                        <div>
                            <InputComponent
                                title={'Parent Name'}
                                value={student.guardian?.name}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputComponent
                                title={'Parent National ID'}
                                value={student.guardian?.national_id}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputComponent
                                title={'Phone Number'}
                                value={student.guardian?.phone}
                                readOnly={true}
                            />
                        </div>

                        <div className={'col-span-2'}>
                            <InputComponent
                                type={'textarea'}
                                title={'Home Address'}
                                value={student.guardian?.address}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputComponent
                                title={'City'}
                                value={student.guardian?.city}
                                readOnly={true}
                            />
                        </div>

                        <div>
                            <InputComponent
                                title={'Country'}
                                value={student.guardian?.country}
                                readOnly={true}
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
                    <EditGuardianComponent/>
                </div>

            </div>
        </div>
    )
}

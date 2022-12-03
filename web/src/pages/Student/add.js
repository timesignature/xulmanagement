import Layout from "../Layout";
import {useState} from "react";
import {useMutation} from "react-query";
import http from "../../http";
import InputComponent from "../../components/InputComponent";
import SelectComponent from "../../components/SelectComponent";
import UploadComponent from "../../components/UploadComponent";
import SectionComponent from "../../components/SectionComponent";
import useSections from "../../hooks/useSections";
import {useHistory} from "react-router-dom";
import {success} from "../../components/ToastComponent";
import useGuardians from "../../hooks/useGuardians";
import ParentComponent from "../../components/ParentComponent";

export default function AddStudent(){

    const {data:sections}=useSections()
    const {data:guardians}=useGuardians()
    const [parent,setParent]=useState({})

    const [state,setState]=useState({
        name:'',
        surname:'',
        gender:'',
        dob:'',
        nationality:'',
        national_id:'',
        religion:'',
        joining_date:'',
        section:'',
        image:null,
        parent:null,
    })

    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    const handleParent=(e)=>{
        if(e.target.value.length>0){
            setParent(guardians[e.target.value])
        }
    }

    const h=useHistory()

    const mutation=useMutation(values=>http.post('/students',values).then(res=>res.data),{
        onSuccess:async()=>{
            setErrors({})
            success('a new student entry has been successfully added to the list of other students')
            h.push('/students')
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
        fd.append('gender',state.gender)
        fd.append('nationality',state.nationality)
        fd.append('religion',state.religion)
        fd.append('joining_date',state.joining_date)
        fd.append('section',state.section)
        fd.append('national_id',state.national_id)
        fd.append('guardian',parent?.id ?? '')
        mutation.mutate(fd)
    }

    return (
        <Layout>
            <div className="p-20">
                <span className="block text-4xl font-medium">Students</span>
                <span className="block text-xs mt-5 font-light">Create new entry</span>

                <div className="mt-10 flex gap-10">

                    <div className="flex-1">
                        <div className="grid grid-cols-2 gap-10">
                            <div className="col-span-2">
                                <span className="block text-3xl text-p-100">Student Details</span>
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
                                    title={'Religion'}
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
                                        name={'section'}
                                        onChange={handleChange}
                                        className={`input ${errors.section ? 'border-red-600' : 'border-zinc-200'}`}
                                    >
                                        <option value="">Select</option>
                                        {
                                            sections && sections.map(s=>(
                                                <option key={s.id} value={s.id}>{s.title}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors.section && (
                                            <span className="block text-xs text-red-600 mt-3">
                                                {errors.section[0]}
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
                                <span className="block text-3xl text-p-100">Parent Details</span>
                            </div>
                            <div className="col-span-2">
                                <label>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="block text-sm">Select Parent</span>
                                        <ParentComponent/>
                                    </div>
                                    <select
                                        onChange={handleParent}
                                        className={`input ${errors.guardian ? 'border-red-600' : 'border-zinc-200'}`}>
                                        <option value="">Select</option>
                                        {
                                            guardians && guardians.map((g,i)=>(
                                                <option key={i} value={i}>{g.name} {g.national_id}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors.guardian && (
                                            <span className="block text-xs mt-3 text-red-600">{errors.guardian[0]}</span>
                                        )
                                    }
                                </label>
                            </div>
                            <div>
                                <InputComponent
                                    title={'Parent Name'}
                                    value={parent.name}
                                    readOnly={true}
                                />
                            </div>

                            <div>
                                <InputComponent
                                    title={'Parent National ID'}
                                    value={parent.national_id}
                                    readOnly={true}
                                />
                            </div>

                            <div className="col-span-2">
                                <button onClick={submit} className='btn bg-p-100 text-white'>
                                    {
                                        mutation.isLoading ? '... Saving new entry' : 'Save new entry'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3">
                    </div>

                </div>
            </div>

        </Layout>
    )
}

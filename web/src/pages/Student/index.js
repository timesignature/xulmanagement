import Layout from "../Layout";
import {Link} from "react-router-dom";
import {useState} from "react";
import useSections from "../../hooks/useSections";
import useStudents from "../../hooks/useStudents";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent";
import ImgComponent from "../../components/ImgComponent";
import EmptyComponent from "../../components/EmptyComponent";
import SelectComponent from "../../components/SelectComponent";
import GoToAddButtonComponent from "../../components/GoToAddButtonComponent";
import {debounce} from "lodash"
export default function Student(){





    const {data:sections}=useSections()

    const [state,setState]=useState({
        name:'',
        section:'',
        gender:'',
        religion:'',
    })

    const {data:students,isLoading,isError}=useStudents(state)

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

        return students && (
            <div>
                {
                    students.length > 0 ? (
                        <table className="w-full">
                            <thead>
                            <tr className='bg-zinc-50'>
                                <td width={'40%'} className='text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Student Details</td>
                                <td width={'15%'} className='text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Gender</td>
                                <td width={'15%'} className='text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Class</td>
                                <td width={'15%'} className='text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Registered</td>
                                <td width={'15%'} className='text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Outstanding</td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                students.map(s=>(
                                    <tr key={s.id} className={`hover:shadow ${s.is_active ? '' : 'line-through bg-zinc-50'}`}>
                                        <td className='text-xs p-2 border-b border-zinc-200'>
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-zinc-100 rounded overflow-hidden">
                                                    <ImgComponent img={s.avatar}/>
                                                </div>
                                                <Link to={`/students/${s.id}/edit`} className="block text-teal-800 uppercase">{s.fullname}</Link>
                                            </div>
                                        </td>
                                        <td className='text-xs p-2 border-b border-zinc-200'>{s.gender}</td>
                                        <td className='text-xs p-2 border-b border-zinc-200'>{s.section?.title}</td>
                                        <td className='text-xs p-2 border-b border-zinc-200'>
                                            {
                                                s.is_active && (
                                                    <span className={` ${s.is_registered ? 'text-green-600' : 'text-zinc-800'}`}>
                                                        {
                                                            s.is_registered ? 'True' : 'False'
                                                        }
                                                   </span>
                                                )
                                            }
                                        </td>
                                        <td className='text-xs p-2 border-b border-zinc-200'>

                                            {
                                                s.is_active && (
                                                    <div>
                                                        <span className="block mb-1">
                                                            ${(+s.amount_due).toFixed(2)}
                                                        </span>
                                                        <span className={`${(+s.amount_due) >0 ? 'text-red-600' : 'text-green-600'}`}>{(+s.amount_due) > 0 ? 'Out Standing' : 'Paid'}</span>
                                                    </div>
                                                )
                                            }

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
                        <span className="block text-4xl">Students</span>
                        <span className="block text-xs mt-5">
                            List of all students grouped by classes or sections
                        </span>
                    </div>
                    <GoToAddButtonComponent url={'/students/add'}/>

                </div>

                <div className="mt-10 grid grid-cols-3 gap-4">

                    <div>
                        {/*<InputComponent*/}
                        {/*    title={'Student Name'}*/}
                        {/*    name={'name'}*/}
                        {/*    // onChange={debounceOnChange}*/}
                        {/*/>*/}

                        <label>
                            <span className="block text-xs mb-3">
                                Student Name
                            </span>
                            <input
                                type="text"
                                className="input"
                                name={'name'}
                                onChange={debounceOnChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            <span className="block text-xs mb-3">Class</span>
                            <select
                                name="section"
                                onChange={handleChange}
                                className="input"
                            >
                                <option value="">Select</option>
                                {
                                    sections && sections.map(s=>(
                                        <option key={s.id} value={s.id}>{s.title}</option>
                                    ))
                                }
                            </select>
                        </label>
                    </div>


                    <div>
                        <SelectComponent
                            title={'Gender'}
                            name={'gender'}
                            value={state.gender}
                            onChange={handleChange}
                            data={['Male','Female']}
                        />
                    </div>

                    <div>
                        <SelectComponent
                            title={'Religion'}
                            name={'religion'}
                            value={state.religion}
                            onChange={handleChange}
                            data={['Christianity','Muslim']}
                        />
                    </div>

                </div>

                <div className="mt-10">
                    <Rendered/>
                </div>
            </div>
        </Layout>
    )
}

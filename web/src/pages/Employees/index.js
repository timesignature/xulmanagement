import Layout from "../Layout";
import {Link} from "react-router-dom";
import {useState} from "react";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent";
import ImgComponent from "../../components/ImgComponent";
import EmptyComponent from "../../components/EmptyComponent";
import SelectComponent from "../../components/SelectComponent";
import GoToAddButtonComponent from "../../components/GoToAddButtonComponent";
import useDepartments from "../../hooks/useDepartments";
import useDesignations from "../../hooks/useDesignations";
import useEmployees from "../../hooks/useEmployees";
import {debounce} from "lodash";

export default function Employees(){





    const {data:departments}=useDepartments()
    const {data:designations}=useDesignations()

    const [state,setState]=useState({
        name:'',
        department:'',
        designation:'',
        religion:'',
    })

    const {data:employees,isLoading,isError}=useEmployees(state)

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

        return employees && (
            <div>
                {
                    employees.length > 0 ? (
                        <table className="w-full">
                            <thead>
                            <tr className='bg-zinc-50'>
                                <td className='text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Employee Details/Position</td>
                                <td className='w-32 text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Salary (Monthly)</td>
                                <td className='w-32 text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Department</td>
                                <td className='w-32 text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Date Joined</td>
                                <td className='w-16 text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Active</td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                employees.map(s=>(
                                    <tr key={s.id} className={`hover:bg-zinc-50 ${s.is_active ? '' : 'bg-zinc-50 line-through'}`}>
                                        <td className='text-xs p-2 border-b border-zinc-200 text-capitalize'>
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-zinc-100 rounded overflow-hidden">
                                                    <ImgComponent img={s.avatar}/>
                                                </div>
                                                <Link to={`/employees/${s.id}/edit`} className="block">
                                                    <span className="block text-teal-800 uppercase">{s.fullname}</span>
                                                    <span className="block text-[10px] mt-1">({s.designation?.title})</span>
                                                </Link>
                                            </div>
                                        </td>
                                        <td className='text-xs p-2 border-b border-zinc-200'>${(+s.salary).toFixed(2)}</td>
                                        <td className='text-xs p-2 border-b border-zinc-200'>{s.department?.title}</td>
                                        <td className='text-xs p-2 border-b border-zinc-200'>{s.joining}</td>
                                        <td className='text-xs p-2 border-b border-zinc-200'>{s.is_active ? 'True' : 'False'}</td>

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
                        <span className="block text-4xl">Employees</span>
                        <span className="block text-xs mt-5">
                            List of all students grouped by departments and designations
                        </span>
                    </div>
                    <GoToAddButtonComponent url={'/employees/add'}/>

                </div>

                <div className="mt-10 grid grid-cols-3 gap-10">

                    <div>
                        <label>
                            <span className="block text-xs mb-3">
                                Employee Name
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
                            <span className="block text-xs mb-3">Designation</span>
                            <select
                                value={state.designation}
                                name="designation"
                                onChange={handleChange}
                                className="input"
                            >
                                <option value="">Select</option>
                                {
                                    designations && designations.map(s=>(
                                        <option key={s.id} value={s.id}>{s.title}</option>
                                    ))
                                }
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            <span className="block text-xs mb-3">Departments</span>
                            <select
                                value={state.department}
                                name="department"
                                onChange={handleChange}
                                className="input"
                            >
                                <option value="">Select</option>
                                {
                                    departments && departments.map(s=>(
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

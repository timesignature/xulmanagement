import Layout from "../Layout";
import useSalaryProperties from "../../hooks/useSalaryProperties";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent";
import EmptyComponent from "../../components/EmptyComponent";
import PropertiesComponent from "../../components/PropertiesComponent";
import {useState} from "react";
import SelectComponent from "../../components/SelectComponent";
import {SalaryPropertiesData} from "../../utils";

export default function SalaryProperties(){

    const [state,setState]=useState({
        type:''
    })

    const {data:properties,isLoading,isError}=useSalaryProperties(state)

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }


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

        return properties && (
            <div>
                {
                    properties.length > 0 ? (
                        <table className="w-full">
                            <thead>
                            <tr className='bg-zinc-50'>
                                <td width={'80%'} className='text-xs font-medium text-teal-800 text-left py-5 px-2 border-b border-zinc-200'>Description</td>
                                <td width={'20%'} className='text-xs font-medium text-teal-800 text-left py-5 px-2 border-b border-zinc-200'>Type</td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                properties.map(s=>(
                                    <tr key={s.id} className={`hover:shadow`}>
                                        <td className='text-xs px-2 py-5 border-b border-zinc-200'>{s.description}</td>
                                        <td className='text-xs px-2 py-5 border-b border-zinc-200'>
                                            <span>{s.type}</span>
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
                        <span className="block text-4xl">Pay Slip Properties</span>
                        <span className="block text-xs mt-5">
                            Properties of employee salary slip
                        </span>
                    </div>

                    <PropertiesComponent/>
                </div>


                <div className="mt-10 grid grid-cols-3 gap-10">

                    <div>
                        <SelectComponent
                            title={'Type'}
                            name={'type'}
                            value={state.type}
                            onChange={handleChange}
                            data={SalaryPropertiesData}
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

import Layout from "../Layout";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent";
import EmptyComponent from "../../components/EmptyComponent";
import useServices from "../../hooks/useServices";
import ServiceComponent from "../../components/ServiceComponent";
import moment from "moment";
import {useHistory} from "react-router-dom";

export default function Services(){



    const h=useHistory()
    const {data:services,isLoading,isError}=useServices()

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

        return services && (
            <div>
                {
                    services.length>0 ? (
                        <table className="w-full">
                            <thead>
                            <tr className='bg-zinc-50'>
                                <th className='text-xs text-teal-700 font-medium border-b border-zinc-200 text-left px-2 py-5'>Description</th>
                                <th className='w-32 text-xs text-teal-700 font-medium border-b border-zinc-200 text-left px-2 py-5'>Amount</th>
                                <th className='w-32 text-xs text-teal-700 font-medium border-b border-zinc-200 text-left px-2 py-5'>Created At</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                services.map(t=>(
                                    <tr key={t.id} className={`hover:bg-zinc-50`}>
                                        <td className='text-xs border-b border-zinc-200 px-2 py-5'>
                                            <span className='text-teal-700 cursor-pointer underline' onClick={()=>h.push(`/services/${t.id}/edit`)}>{t.description}</span>
                                            <span className="block text-[9px] mt-2">{t.isActive===1 ? 'Default' : ''}</span>
                                        </td>
                                        <td className='text-xs border-b border-zinc-200 px-2 py-5'>{t.amount}</td>
                                        <td className='text-xs border-b border-zinc-200 px-2 py-5'>{moment(t.created_at).format('DD MMM YYYY')}</td>
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
                        <span className="block text-4xl">Services</span>
                        <span className="block mt-5 text-xs">list of services</span>
                    </div>
                    <div>
                        <ServiceComponent/>
                    </div>
                </div>


                <div className="mt-10">

                    <Rendered/>

                </div>
            </div>
        </Layout>
    )
}

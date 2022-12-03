import Layout from "../Layout";
import TermComponent from "../../components/TermComponent";
import useTerms from "../../hooks/useTerms";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent";
import EmptyComponent from "../../components/EmptyComponent";

export default function Term(){



    const {data:terms,isLoading,isError}=useTerms()

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

        return terms && (
            <div>
                {
                    terms.length>0 ? (
                        <table className="w-full">
                            <thead>
                                <tr className='bg-zinc-50'>
                                    <th className='text-xs text-teal-700 font-medium border-b border-zinc-200 text-left px-2 py-5'>Description</th>
                                    <th className='w-32 text-xs text-teal-700 font-medium border-b border-zinc-200 text-left px-2 py-5'>Start</th>
                                    <th className='w-32 text-xs text-teal-700 font-medium border-b border-zinc-200 text-left px-2 py-5'>End</th>
                                     </tr>
                            </thead>
                            <tbody>

                            {
                                terms.map(t=>(
                                    <tr key={t.id} className={`hover:bg-zinc-50`}>
                                        <td className='text-xs border-b border-zinc-200 px-2 py-5'>{t.description}</td>
                                        <td className='text-xs border-b border-zinc-200 px-2 py-5'>{t.start}</td>
                                        <td className='text-xs border-b border-zinc-200 px-2 py-5'>{t.end}</td>
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
                        <span className="block text-4xl">Term</span>
                        <span className="block mt-5 text-xs">list of both active and in active terms</span>
                    </div>
                    <div>
                        <TermComponent/>
                    </div>
                </div>


                <div className="mt-10">

                    <Rendered/>

                </div>
            </div>
        </Layout>
    )
}

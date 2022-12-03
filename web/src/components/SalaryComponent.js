import LoadingComponent from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";
import EmptyComponent from "./EmptyComponent";
import useSalaries from "../hooks/useSalaries";
import DeleteSalary from "./DeleteSalary";

export default function SalaryComponent(){




    const {data:salaries,isLoading,isError,refetch}=useSalaries()




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

        return salaries && (
            <div>
                {
                    salaries.length> 0 ? (
                        <div>
                            <table className="w-full">
                                <thead>
                                <tr className='bg-zinc-50'>
                                    <td className='text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Month</td>
                                    <td className='w-20 text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Amount</td>
                                    <td className='w-20 text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'></td>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    salaries.map(s=>(
                                        <tr key={s.id} className='hover:shadow'>
                                            <td className='text-xs px-2 py-5 border-b border-zinc-200'>
                                                {s.month}
                                            </td>
                                            <td className='text-xs px-2 py-5 border-b border-zinc-200'>${s.amount}</td>
                                            <td className='text-xs px-2 py-5 border-b border-zinc-200'>
                                                <DeleteSalary id={s.id} refetch={refetch} />
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <EmptyComponent/>
                    )
                }
            </div>
        )
    }






    return (
        <div className='mt-10'>
            <span className="block text-3xl text-p-100">Salaries</span>
            <div className="mt-10">
                <Rendered/>
            </div>
        </div>
    )
}

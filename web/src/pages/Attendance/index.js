import Layout from "../Layout";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent";
import EmptyComponent from "../../components/EmptyComponent";
import useAttendance from "../../hooks/useAttendance";
import GoToAddButtonComponent from "../../components/GoToAddButtonComponent";
import moment from "moment";

export default function Attendance(){



    const getHours=(start,end)=>{
        const s=moment(start)
        const e=moment(end)
        return e.diff(s,'hours')
    }




    const {data:attendances,isLoading,isError}=useAttendance()

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

        return attendances && (
            <div>
                {
                    attendances.length>0 ? (
                        <table className="w-full">
                            <thead>
                            <tr className='bg-zinc-50'>
                                <th className='text-xs text-teal-700 font-medium border-b border-zinc-200 text-left px-2 py-5'>Employee</th>
                                <th className='w-40 text-xs text-teal-700 font-medium border-b border-zinc-200 text-left px-2 py-5'>Clock In</th>
                                <th className='w-40 text-xs text-teal-700 font-medium border-b border-zinc-200 text-left px-2 py-5'>Clock Out</th>
                                <th className='w-20 text-xs text-teal-700 font-medium border-b border-zinc-200 text-left px-2 py-5'>Hours</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                attendances.map(t=>(
                                    <tr key={t.id} className={`hover:bg-zinc-50`}>
                                        <td className='text-xs border-b border-zinc-200 px-2 py-5'>
                                            <span>{t?.employee?.fullname}</span>
                                        </td>
                                        <td className='text-xs border-b border-zinc-200 px-2 py-5'>{t.clock_in}</td>
                                        <td className='text-xs border-b border-zinc-200 px-2 py-5'>{t.clock_out}</td>
                                        <td className='text-xs border-b border-zinc-200 px-2 py-5'>{t.active===1 ? 0 : getHours(t?.clock_in,t?.clock_out)}</td>
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
                        <span className="block text-4xl">Attendance</span>
                        <span className="block mt-5 text-xs">employee attendance list</span>
                    </div>
                    <div>

                        <GoToAddButtonComponent url={'/attendance/add'}/>

                    </div>
                </div>


                <div className="mt-10">

                    <Rendered/>

                </div>
            </div>
        </Layout>
    )
}

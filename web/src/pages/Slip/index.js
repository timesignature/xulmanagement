import Layout from "../Layout";
import {useParams} from "react-router-dom";
import useEmployee from "../../hooks/useEmployee";
import SlipComponent from "../../components/SlipComponent";
import ReactToPrint from 'react-to-print';
import {useRef} from "react";
import InvoiceHeadingComponent from "../../components/InvoiceHeadingComponent";

export default function Slip(){


    const componentRef = useRef();



    const {id}=useParams()

    const {data:employee}=useEmployee(id)





    return (
        <Layout>
            <div className="p-20">


                <div className="flex items-center justify-between">
                    <span className="block text-4xl">Payslip</span>
                    <div>


                        <ReactToPrint
                            trigger={() => (
                                <button className="w-10 h-10 focus:outline-none bg-zinc-50 text-p-100 rounded-lg flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                    </svg>
                                </button>
                            )}
                            content={() => componentRef.current}
                        />

                    </div>
                </div>


                <div ref={componentRef} className="mt-10 print:p-10">

                    <InvoiceHeadingComponent/>

                    <div className="mt-10 py-5 border-b border-p-100">
                        <span className="block text-teal-700 text-xl uppercase">Employee Pay Summary</span>

                        {employee && (
                            <div className="mt-10 w-1/2">
                                <table className="w-full">
                                    <thead>
                                    <tr>
                                        <td className='w-1/3'></td>
                                        <td></td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className='py-3 px-2 text-xs'>Employee Name</td>
                                        <td className='py-3 px-2 text-xs'>: {employee.fullname}</td>
                                    </tr>

                                    <tr>
                                        <td className='py-3 px-2 text-xs'>Designation</td>
                                        <td className='py-3 px-2 text-xs'>: {employee.designation?.title}</td>
                                    </tr>

                                    <tr>
                                        <td className='py-3 px-2 text-xs'>Department</td>
                                        <td className='py-3 px-2 text-xs'>: {employee.department?.title}</td>
                                    </tr>

                                    <tr>
                                        <td className='py-3 px-2 text-xs'>Joining Date</td>
                                        <td className='py-3 px-2 text-xs'>: {employee.joining}</td>
                                    </tr>

                                    <tr>
                                        <td className='py-3 px-2 text-xs'>Pay Date</td>
                                        <td className='py-3 px-2 text-xs'>: ## ## ##</td>
                                    </tr>
                                    </tbody>
                                </table>


                            </div>
                        )}
                    </div>

                    <div className="">
                        <SlipComponent/>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

import Layout from "../Layout";
import {useParams} from "react-router-dom";
import useInvoice from "../../hooks/useInvoice";
import InputComponent from "../../components/InputComponent";
import InvoiceProductsComponent from "../../components/InvoiceProductsComponent";
import PaymentListComponent from "../../components/PaymentListComponent";
import InvoiceHeadingComponent from "../../components/InvoiceHeadingComponent";
import ReactToPrint from "react-to-print";
import {useRef} from "react";

export default function EditInvoice(){


    const {id}=useParams()
    const {data:invoice}=useInvoice(id)

    const componentRef = useRef();









    return (
        <Layout>
            <div className="p-20">


                <div className="flex items-center justify-between">
                    <div>
                        <span className="block text-4xl">New Invoice</span>
                    </div>

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


                <div ref={componentRef} className='print:p-10'>

                    <div className="mt-10">
                        <InvoiceHeadingComponent/>
                    </div>



                    {
                        invoice ? (
                            <div>
                                <div className="mt-20 grid grid-cols-3 gap-10">


                                    <div>
                                        <div>
                                            <span className="block text-xs mb-3">Billed To</span>
                                            <div className="flex cursor-pointer flex-col space-y-3 border border-zinc-100 p-5 print:px-0 print:border-0">
                                                <span className="block text-xs font-bold capitalize">{invoice.student?.fullname}</span>
                                                <span className="block text-xs">{invoice.student?.gender}</span>
                                                <span className="block text-xs">{invoice.student?.guardian?.address}</span>
                                                <span className="block text-xs">{invoice.student?.guardian?.city} {invoice.student?.guardian?.country}</span>
                                                <span className="block text-xs">{invoice.student?.guardian?.phone}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col space-y-10'>

                                        <InputComponent
                                            title={'Invoice No.'}
                                            name={'invoice'}
                                            value={`INV-${invoice.id}`}
                                            readOnly={true}
                                        />

                                        <InputComponent
                                            title={'Term'}
                                            value={invoice.term?.description}
                                            readOnly={true}

                                        />

                                    </div>

                                    <div className='flex flex-col space-y-10'>
                                        <InputComponent
                                            title={'Invoice Date.'}
                                            value={invoice.current_date}
                                            type={'date'}
                                            readOnly={true}
                                        />


                                        <InputComponent
                                            title={'Payment Due'}
                                            value={invoice.due_date}
                                            type={'date'}
                                            readOnly={true}
                                        />
                                    </div>
                                </div>



                                <InvoiceProductsComponent student={invoice.student_id}/>



                                <div className="mt-10 print:hidden">
                                    <div className="flex items-center justify-between">
                                        <span className="block text-3xl text-p-100">Payments</span>
                                        <div>
                                        </div>
                                    </div>


                                    <div className="mt-10">
                                        <PaymentListComponent/>
                                    </div>
                                </div>


                            </div>
                        ) : (
                            <div></div>
                        )
                    }

                </div>



            </div>
        </Layout>
    )
}

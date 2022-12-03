import Layout from "../Layout";
import {useState} from "react";
import ReportItemComponent from "../../components/ReportItemComponent";
import SarogateReportItemComponent from "../../components/SarogateReportItemComponent";
import ReportStudComponent from "../../components/ReportStudComponent";
import useReports from "../../hooks/useReports";
import useStudents from "../../hooks/useStudents";
import useEmployees from "../../hooks/useEmployees";
import {debounce} from "lodash";
import useTerms from "../../hooks/useTerms";

export default function Reports(){


    const [state,setState]=useState({
        term:''
    })


    const {data:terms}=useTerms()

    const {data:reports}=useReports(state)

    const {data:students}=useStudents()

    const {data:employees}=useEmployees()

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }




    const updateQuery=e=>handleChange(e)
    const debounceOnChange=debounce(updateQuery,1000)


    return (
        <Layout>
            <div className="p-20">
                <div>
                    <span className="block text-4xl">Reports</span>
                    <span className="block text-xs mt-5">Detailed information on all transactions</span>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-8">

                    <div>
                        <label>
                            <span className="block text-xs mb-3">
                                Filter By Term
                            </span>
                            <select
                                className="input"
                                name={'term'}
                                onChange={debounceOnChange}
                            >
                                <option value="">Select</option>
                                {
                                    terms && terms.map(t=>(
                                        <option key={t.id} value={t.id}>{t.description}</option>
                                    ))
                                }
                            </select>
                        </label>


                    </div>

                </div>


                <div className="mt-20 grid grid-cols-3 gap-x-10 gap-y-20">
                    <div>
                        {
                            reports!==null ? (
                                <ReportItemComponent
                                    description={'Salary (Expenses)'}
                                    amount={reports?.salary}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                    </svg>
                                </ReportItemComponent>
                            ) : (
                                <SarogateReportItemComponent/>
                            )
                        }
                    </div>

                    <div className="col-span-2"></div>

                    <div>
                        {
                            reports!==null  ? (
                                <ReportItemComponent
                                    description={'Operating expenses'}
                                    amount={reports?.expenses}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
                                    </svg>
                                </ReportItemComponent>
                            ) : (
                                <SarogateReportItemComponent/>
                            )
                        }
                    </div>

                    <div className="col-span-2"></div>

                    <div>
                        {
                            reports!==null ? (
                                <ReportItemComponent
                                    description={'Fees (Incomes)'}
                                    amount={reports?.payments}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                    </svg>
                                </ReportItemComponent>
                            ) : (
                                <SarogateReportItemComponent/>
                            )
                        }
                    </div>

                    <div>
                        {
                            reports!==null  ? (
                                <ReportItemComponent
                                    description={'Total Fees Charged'}
                                    amount={reports?.services}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
                                    </svg>
                                </ReportItemComponent>
                            ) : (
                                <SarogateReportItemComponent/>
                            )
                        }
                    </div>


                    <div>
                        {
                            reports!==null  ? (
                                <ReportItemComponent
                                    description={'Fees amount not yet paid'}
                                    amount={reports?.fees_not_paid}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
                                    </svg>
                                </ReportItemComponent>
                            ) : (
                                <SarogateReportItemComponent/>
                            )
                        }
                    </div>


                    <div>
                        {
                            reports!==null  ? (
                                <ReportItemComponent
                                    description={'Net Profit'}
                                    amount={reports?.profit}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
                                    </svg>
                                </ReportItemComponent>
                            ) : (
                                <SarogateReportItemComponent/>
                            )
                        }
                    </div>

                      <div className="col-span-2"></div>

                    <div>
                        {
                            reports!==null ? (
                                <ReportItemComponent
                                    description={'Others (Incomes)'}
                                    amount={reports?.incomes}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </ReportItemComponent>
                            ) : (
                                <SarogateReportItemComponent/>
                            )
                        }
                    </div>


                    <SarogateReportItemComponent/>

                    <div></div>


                    <div>
                        {
                            students!==null ? (
                                <ReportStudComponent
                                    description={'Students'}
                                    val={students?.length ?? 0}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </ReportStudComponent>
                            ) : (
                                <SarogateReportItemComponent/>
                            )
                        }
                    </div>


                    <div>
                        {
                            employees!==null ? (
                                <ReportStudComponent
                                    description={'Employees'}
                                    val={employees?.length ?? 0}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                    </svg>
                                </ReportStudComponent>
                            ) : (
                                <SarogateReportItemComponent/>
                            )
                        }
                    </div>

                    <div></div>

                    <div>
                        <ReportItemComponent
                            description={'Assets value'}
                            amount={0}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                            </svg>
                        </ReportItemComponent>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

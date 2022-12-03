import {useParams} from "react-router-dom";
import useSlip from "../hooks/useSlip";
import LoadingComponent from "./LoadingComponent";
import ErrorComponent from "./ErrorComponent";
import EmptyComponent from "./EmptyComponent";
import AddSlipComponent from "./AddSlipComponent";

export default function SlipComponent(){


    const {id}=useParams()

    const {data:slips,isLoading,isError}=useSlip(id)


    const totalSalary=(val)=>{
        let total=0
        val.forEach(v=>{
            if(v.type==='deduction'){
                total-=(+v.amount)
            }else{
                total+=(+v.amount)
            }
        })
        return total
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

        return slips && (
            <div>
                {
                    slips.length> 0 ? (
                      <div>
                          <table className="w-full">
                              <thead>
                              <tr className='bg-zinc-50'>
                                  <td className='text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Description</td>
                                  <td className='w-20 text-xs font-medium text-teal-800 text-left py-4 px-2 border-b border-zinc-200'>Amount</td>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                  <td colSpan={3}>
                                      <span className="block text-xl text-teal-700 uppercase py-10 border-b border-zinc-200">Allowance</span>
                                  </td>
                              </tr>
                              </tbody>
                              <tbody>
                              {
                                  slips.filter(m=>m.type==='allowance').map(s=>(
                                      <tr key={s.id} className='hover:shadow'>
                                          <td className='text-xs px-2 py-5 border-b border-zinc-200'>
                                              <AddSlipComponent title={s.description} salary_property={s.id}/>
                                          </td>
                                          <td className='text-xs px-2 py-5 border-b border-zinc-200'>${s.amount}</td>
                                      </tr>
                                  ))
                              }
                              </tbody>


                              <tbody>
                              <tr>
                                  <td colSpan={3}>
                                      <span className="block text-xl text-teal-700 uppercase py-10 border-b border-zinc-200">Reimbursements</span>
                                  </td>
                              </tr>
                              </tbody>
                              <tbody>
                              {
                                  slips.filter(m=>m.type==='reimbursement').map(s=>(
                                      <tr key={s.id} className='hover:shadow'>
                                          <td className='text-xs px-2 py-5 border-b border-zinc-200'>
                                              <AddSlipComponent title={s.description} salary_property={s.id}/>
                                          </td>
                                          <td className='text-xs px-2 py-5 border-b border-zinc-200'>${s.amount}</td>
                                      </tr>
                                  ))
                              }
                              </tbody>



                              <tbody>
                              <tr>
                                  <td colSpan={3}>
                                      <span className="block text-xl text-teal-700 uppercase py-10 border-b border-zinc-200">Deductions</span>
                                  </td>
                              </tr>
                              </tbody>
                              <tbody>
                              {
                                  slips.filter(m=>m.type==='deduction').map(s=>(
                                      <tr key={s.id} className='hover:shadow'>
                                          <td className='text-xs px-2 py-5 border-b border-zinc-200'>
                                              <AddSlipComponent title={s.description} salary_property={s.id}/>
                                          </td>
                                          <td className='text-xs px-2 py-5 border-b border-zinc-200'>${s.amount}</td>
                                      </tr>
                                  ))
                              }
                              </tbody>
                          </table>

                          <div className="mt-10">
                              <span className="block text-xl">Total Monthly Salary : ${totalSalary(slips).toFixed(2)}</span>
                          </div>
                      </div>
                    ) : (
                        <EmptyComponent/>
                    )
                }
            </div>
        )
    }






    return (
        <div>
            <Rendered/>
        </div>
    )
}

import Layout from "../Layout";
import EmployeeTabComponent from "../../components/EmployeeTabComponent";
import {Link, useParams} from "react-router-dom";

export default function EditEmployees(){

    const {id}=useParams()

    return (
        <Layout>
            <div className="p-20">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="block text-4xl">Employee</span>
                        <span className="block text-xs mt-5">employee profile,contacts,qualifications</span>
                    </div>

                    <Link to={`/slip/${id}`} className={'btn'}>Print PaySlip</Link>
                </div>
                <div className="mt-10">
                    <EmployeeTabComponent/>
                </div>
            </div>
        </Layout>
    )
}

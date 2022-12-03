import Layout from "../Layout";
import StudentTabComponent from "../../components/StudentTabComponent";

export default function EditStudent(){
    return (
        <Layout>
            <div className="p-20">
                <span className="block text-4xl">Student Details</span>
                <span className="block text-xs mt-5">student profile,modification and bursary and parent details</span>
                <div className="mt-10">
                    <StudentTabComponent/>
                </div>
            </div>
        </Layout>
    )
}

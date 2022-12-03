import Layout from "../Layout";

export default function Dashboard(){
    return (
        <Layout>
            <div className="p-20">
                <div>
                    <span className="block text-4xl">Dashboard</span>
                    <span className="block text-xs mt-5">Summary layout of all operations</span>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-10">

                    <div className="bg-red-100">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        A assumenda beatae, deserunt dignissimos et, expedita explicabo, facilis in iste iusto laboriosam
                        necessitatibus nihil placeat possimus quaerat quidem sequi suscipit vero!
                    </div>

                </div>
            </div>
        </Layout>
    )
}

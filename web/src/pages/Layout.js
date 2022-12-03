import {Link, NavLink, useHistory} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import {TOKEN_LABEL} from "../config";

export default function Layout({children}){


    const h=useHistory()


    const logout=()=>{
        localStorage.removeItem(TOKEN_LABEL)
        h.push('/login')
    }



    return (
        <div className='h-screen bg-white flex font-mont overflow-y-hidden'>
            <div className="p-14 bg-zinc-100 flex flex-col space-y-10 overflow-y-auto skroll">
                <Link to={'/'} className="w-20 h-20 flex-shrink-0 bg-white text-p-100 flex items-center justify-center">
                <div>
                    <img className="w-full h-full object-cover" src={require('../assets/logo.png')}/>
                </div>
                </Link>

                <div className='flex flex-col space-y-5'>
                    <span className="block text-xs font-medium">Students Management</span>
                    <div>
                        <NavLink to={'/students'} activeClassName={'bg-white text-p-100'} className="text-xs">Students (Active & Inactive)</NavLink>

                    </div>
                    <div>
                        <NavLink to={'/invoices'} activeClassName={'bg-white text-p-100'} className="text-xs">Invoices</NavLink>
                    </div>

                    <div>
                        <NavLink to={'/services'} activeClassName={'bg-white text-p-100'} className="text-xs">Services</NavLink>
                    </div>

                    <div>
                        <NavLink to={'/terms'} activeClassName={'bg-white text-p-100'} className="text-xs">Terms</NavLink>
                    </div>
                    {/*<span className="block text-xs">Attendances</span>*/}
                </div>

                <div className='flex flex-col space-y-5'>
                    <span className="block text-xs font-medium">Employees Management</span>
                    <div>
                        <NavLink to={'/employees'} activeClassName={'bg-white text-p-100'} className="text-xs">Employees</NavLink>
                    </div>

                    <div>
                        <NavLink to={'/payroll'} activeClassName={'bg-white text-p-100'} className="text-xs">Payroll</NavLink>
                    </div>
                    <div>
                        <NavLink to={'/salary_properties'} activeClassName={'bg-white text-p-100'} className="text-xs">Salary Properties</NavLink>
                    </div>

                    <div>
                        <NavLink to={'/attendance'} activeClassName={'bg-white text-p-100'} className="text-xs">Attendance</NavLink>
                    </div>
                </div>

                <div className='flex flex-col space-y-5'>
                    <span className="block text-xs font-medium">Book Keeping</span>
                    <div>
                        <NavLink to={'/transactions'} activeClassName={'bg-white text-p-100'} className="text-xs">Transactions</NavLink>
                    </div>

                    <div>
                        <NavLink to={'/reports'} activeClassName={'bg-white text-p-100'} className="text-xs">Reports</NavLink>
                    </div>

                </div>

                <div className='flex flex-col space-y-5'>
                    <span className="block text-xs font-medium">Settings and Permissions</span>
                    <div>
                        <NavLink to={'/users'} activeClassName={'bg-white text-p-100'} className="text-xs">Systems Users</NavLink>
                    </div>
                    <span onClick={logout} className="cursor-pointer block text-xs">Logout</span>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
            <Toaster/>
        </div>
    )
}

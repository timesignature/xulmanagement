import {BrowserRouter, Route, Switch} from "react-router-dom";
import {QueryClient,QueryClientProvider} from "react-query";
import Student from "./pages/Student";
import AddStudent from "./pages/Student/add";
import EditStudent from "./pages/Student/edit";
import Term from "./pages/Term";
import Employees from "./pages/Employees";
import AddEmployees from "./pages/Employees/add";
import EditEmployees from "./pages/Employees/edit";
import SalaryProperties from "./pages/SalaryProperties";
import Payroll from "./pages/Payroll";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Transaction from "./pages/Transaction";
import AddTransaction from "./pages/Transaction/add";
import EditTransaction from "./pages/Transaction/edit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Slip from "./pages/Slip";
import GuardedRoute from "./components/GuardedRoute";
import Assets from "./pages/Assets";
import QRCode from "./pages/QRCode";
import Invoice from "./pages/Invoice";
import AddInvoice from "./pages/Invoice/add";
import Services from "./pages/Services";
import EditServices from "./pages/Services/edit";
import EditInvoice from "./pages/Invoice/edit";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import Attendance from "./pages/Attendance";
import AddAttendance from "./pages/Attendance/add";
import EditUser from "./pages/Users/edit";

function App() {

  const queryClient = new QueryClient()

  return (
   <QueryClientProvider client={queryClient}>
     <BrowserRouter>
       <Switch>
         <GuardedRoute path={'/'} exact component={Reports}/>
         <GuardedRoute path={'/students'} exact component={Student}/>
         <GuardedRoute path={'/students/add'} exact component={AddStudent}/>
         <GuardedRoute path={'/students/:id/edit'} exact component={EditStudent}/>
         <GuardedRoute path={'/terms'} exact component={Term}/>
         <GuardedRoute path={'/employees'} exact component={Employees}/>
         <GuardedRoute path={'/employees/add'} exact component={AddEmployees}/>
         <GuardedRoute path={'/employees/:id/edit'} exact component={EditEmployees}/>
         <GuardedRoute path={'/salary_properties'} exact component={SalaryProperties}/>
         <GuardedRoute path={'/payroll'} exact component={Payroll}/>
         <GuardedRoute path={'/transactions'} exact component={Transaction}/>
         <GuardedRoute path={'/transactions/add'} exact component={AddTransaction}/>
         <GuardedRoute path={'/transactions/:id/edit'} exact component={EditTransaction}/>
         <GuardedRoute path={'/reports'} exact component={Reports}/>
         <GuardedRoute path={'/slip/:id'} exact component={Slip}/>
         <GuardedRoute path={'/users'} exact component={Users}/>
         <GuardedRoute path={'/users/edit/:id'} exact component={EditUser}/>
         <GuardedRoute path={'/assets'} exact component={Assets}/>
         <GuardedRoute path={'/invoices'} exact component={Invoice}/>
         <GuardedRoute path={'/invoices/add'} exact component={AddInvoice}/>
         <GuardedRoute path={'/invoices/:id/payments/:student'} exact component={EditInvoice}/>
         <GuardedRoute path={'/services'} exact component={Services}/>
         <GuardedRoute path={'/services/:id/edit'} exact component={EditServices}/>
         <GuardedRoute path={'/attendance'} exact component={Attendance}/>
         <GuardedRoute path={'/attendance/add'} exact component={AddAttendance}/>
         <Route path={'/login'} exact component={Login}/>
         <Route path={'/sign-in'} exact component={Register}/>
         <Route path={'/forgot'} exact component={Forgot}/>
         <Route path={'/reset_password/:link'} exact component={Reset}/>
         <GuardedRoute path={'/qr'} exact component={QRCode}/>
       </Switch>
     </BrowserRouter>
   </QueryClientProvider>
  );
}

export default App;

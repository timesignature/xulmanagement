import Layout from "../Layout";
import {useParams} from "react-router-dom";
import moment from "moment";
import InvoiceHeadingComponent from "../../components/InvoiceHeadingComponent";
import useFee from "../../hooks/useFee";
import PaymentComponent from "../../components/PaymentComponent";
import useFeePayments from "../../hooks/useInvoicePayments";
import LoadingComponent from "../../components/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent";
import EmptyComponent from "../../components/EmptyComponent";
import ReactToPrint from 'react-to-print';
import {useRef} from "react";

export default function Payment(){

    const componentRef = useRef();



    const {id}=useParams()

    const {data:fee}=useFee(id)



    const totalPayment=(val)=>{
        let total=0
        val.forEach(t=>{
            total+=+(t.amount)
        })

        return total.toFixed(2);
    }

    const totalDue=(fees,payments)=>{
        let total=0
        let f=+fees
        let p=+payments
        total=f-p
        return total.toFixed(2)

    }










    return (
        <Layout>
            <div className="p-20"></div>
        </Layout>
    )
}

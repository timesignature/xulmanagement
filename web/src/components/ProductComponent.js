import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {success, warning} from "./ToastComponent";
import {useParams} from "react-router-dom";
import useServices from "../hooks/useServices";

export default function ProductComponent() {
    let [isOpen, setIsOpen] = useState(false)

    const {id}=useParams()
    const {data:services}=useServices()

    function closeModal() {
        setErrors({})
        setState({
            service:'',
            invoice:id,
        })
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const [state,setState]=useState({
        service:'',
        invoice:id,
    })

    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    const queryClient=useQueryClient()
    const mutation=useMutation(values=>http.post('/invoice_services',values).then(res=>res.data),{
        onSuccess:async()=>{
            await queryClient.invalidateQueries(['invoice-service',id])
            success('new entry has been successfully added')
            closeModal()
        },
        onError:(e)=>{
            warning('something went wrong')
            setErrors(e.response.data.errors || {})
        }
    })

    const submit=()=>{
        mutation.mutate(state)
    }



    return (
        <>

            <button
                type="button"
                onClick={openModal}
                className='focus:outline-nine bg-zinc-50 px-5 py-3 flex items-center rounded-t-lg space-x-3 text-xs font-bold text-teal-800'>

                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>
                    Add
                </span>
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
              &#8203;
            </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block font-mont w-1/2 p-10 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-3xl font-medium leading-6 text-gray-900"
                                >
                                    Select Service
                                </Dialog.Title>
                                <div className="mt-10">

                                    <label>
                                        <span className="block text-xs mb-3">
                                            Select Service
                                        </span>

                                        <select
                                            name="service"
                                            onChange={handleChange}
                                            className={`input ${errors.service ? 'border-red-600' : 'border-zinc-200'}`}>
                                            <option value="">Select</option>
                                            {
                                                services && services.map(s=>(
                                                    <option key={s.id} value={s.id}>{s.description}</option>
                                                ))
                                            }
                                        </select>
                                        {
                                            errors.service && (
                                                <span className="block text-xs mt-3 text-red-600">
                                                    {errors.service[0]}
                                                </span>
                                            )
                                        }
                                    </label>

                                </div>
                                <div className="mt-10">
                                    <button onClick={()=>mutation.isLoading ? null : submit()} className="btn bg-p-100 text-white">
                                        {
                                            mutation.isLoading ? '... Adding To Invoice' : 'Add To Invoice'
                                        }
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

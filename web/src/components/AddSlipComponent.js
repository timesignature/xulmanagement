import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import InputComponent from "./InputComponent";
import {success, warning} from "./ToastComponent";
import {useParams} from "react-router-dom";

export default function AddSlipComponent({salary_property,title}) {
    let [isOpen, setIsOpen] = useState(false)

    const {id}=useParams()

    const [state,setState]=useState({
        amount:'',
        salary_property:salary_property,
        employee:id

    })

    function closeModal() {
        setErrors({})
        setState({
            amount:''
        })
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }



    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    const queryClient=useQueryClient()
    const mutation=useMutation(values=>http.post('/slips',values).then(res=>res.data),{
        onSuccess:async()=>{
            await queryClient.invalidateQueries(['slip',id])
            success('slip amount has been adjusted successfully')
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
                    className="focus:outline-none"
                >
                    {title}
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
                                    Adjust Slip Details
                                </Dialog.Title>
                                <div className="mt-10">
                                    <InputComponent
                                        onChange={handleChange}
                                        title={'Amount'}
                                        name={'amount'}
                                        error={errors.amount}
                                        value={state.amount}
                                    />
                                </div>

                                <div className="mt-10">
                                    <button onClick={()=>mutation.isLoading ? null : submit()} className="btn bg-p-100 text-white">
                                        {
                                            mutation.isLoading ? '... Saving new entry' : 'Save new entry'
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

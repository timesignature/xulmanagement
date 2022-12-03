import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {useMutation} from "react-query";
import http from "../http";
import {success, warning} from "./ToastComponent";
import {useHistory, useParams} from "react-router-dom";

export default function TransactionDeleteComponent() {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }



    const h=useHistory()

    const {id}=useParams()

    const mutation=useMutation(values=>http.delete(`/transactions/${id}`).then(res=>res.data),{
        onSuccess:async()=>{
            success('new entry has been successfully added')
            h.push('/transactions')
            closeModal()

        },
        onError:(e)=>{
            warning('something went wrong')
        }
    })

    const submit=()=>{
        mutation.mutate({})
    }



    return (
        <>

            <button onClick={openModal} className="btn bg-red-600 text-white">
                Delete Entry
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
                            <div className="inline-block font-mont w-1/3 p-10 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-3xl leading-6 text-gray-900"
                                >
                                    Are you sure you want to delete transaction
                                </Dialog.Title>


                                <div className="mt-10 space-x-5">
                                    <button onClick={submit} className="btn bg-p-100 text-white">
                                        {
                                            mutation.isLoading ? '... Deleting' : 'Yes'
                                        }
                                    </button>

                                    <button onClick={closeModal} className="btn border border-zinc-100">
                                       No
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

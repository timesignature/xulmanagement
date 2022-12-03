import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {useMutation} from "react-query";
import http from "../http";
import {success, warning} from "./ToastComponent";

export default function DeleteSalary({id,refetch}) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


    const mutation=useMutation(values=>http.delete(`/salaries/${values}`).then(res=>res.data),{
        onSuccess:async()=>{
            refetch()
            success('salary has been successfully remove')
            closeModal()

        },
        onError:(e)=>{
            warning('something went wrong')
        }
    })

    const _delete=()=>{
        mutation.mutate(id)
    }






    return (
        <>

            <button
                type="button"
                onClick={openModal}
                className='print:hidden focus:outline-none w-10 h-10 bg-zinc-50 text-teal-700 flex items-center justify-center rounded'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
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
                                    className="text-3xl leading-loose text-gray-900"
                                >
                                    Are you sure you want to do this?
                                </Dialog.Title>

                                <div className="mt-10 flex items-center space-x-3">
                                    <button onClick={()=>mutation.isLoading ? null : _delete()} className="btn bg-p-100 text-white">
                                        {
                                            mutation.isLoading ? '...Deleting...' : 'Delete'
                                        }
                                    </button>

                                    <button onClick={()=>closeModal()} className="btn border border-zinc-200">Cancel</button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

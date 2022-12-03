import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {success, warning} from "./ToastComponent";
import {QrReader} from "react-qr-reader";

export default function AttendanceComponent() {
    let [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState('No result');
    const [type, setType] = useState('');
    const [errors,setErrors]=useState({})

    function closeModal() {
        setErrors({})
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }



    const queryClient=useQueryClient()
    const mutation=useMutation(values=>http.post('/attendance/clock_in',values).then(res=>res.data),{
        onSuccess:async()=>{
            await queryClient.invalidateQueries(['attendance'])
            success('new entry has been successfully added')
            closeModal()
        },
        onError:(e)=>{
            warning('something went wrong')
            setErrors(e.response.data.errors || {})
        }
    })


    const submit=(val)=>{
        console.log(val,type)
    }




    return (
        <>

                <button
                    type="button"
                    onClick={openModal}
                    className="w-10 h-10 focus:outline-none text-p-100 bg-zinc-50 flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
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
                            <div className="inline-block font-mont w-1/2 p-10 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-3xl font-medium leading-6 text-gray-900"
                                >
                                    Attendance Form
                                </Dialog.Title>


                                <div className="">
                                    <div className="w-1/2">
                                        <QrReader
                                            onResult={(result, error) => {
                                                if (!!result) {
                                                    setData(result?.text);



                                                    submit(result?.text)

                                                }

                                                if (!!error) {
                                                    console.info(error);
                                                }
                                            }}
                                            style={{ width: '100%' }}
                                        />
                                        <p>{data}</p>
                                        {
                                            mutation.isLoading && (
                                                <span className="text-xs">...Processing</span>
                                            )
                                        }


                                    </div>
                                </div>


                                <div className="mt-10">
                                    <label>
                                        <span className="block text-xs mb-3">
                                            Type
                                        </span>
                                        <select
                                            value={type}
                                            onChange={val=>setType(val?.target?.value)}
                                            className={`input ${errors.type ? 'border-red-600' : 'border-zinc-200'}`}
                                        >
                                            <option value="">Select</option>
                                            <option value="clock_in">Clock In</option>
                                            <option value="clock_out">Clock Out</option>
                                        </select>
                                        {
                                            errors.type && (
                                                <span className="block text-xs mt-3 text-red-600">{errors.type[0]}</span>
                                            )
                                        }
                                    </label>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

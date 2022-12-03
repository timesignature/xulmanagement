import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {success, warning} from "./ToastComponent";

export default function UserComponent({title,isActive,isAdmin,id}) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setErrors({})
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const [state,setState]=useState({
        is_active:isActive,
        is_admin:isAdmin
    })

    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    const queryClient=useQueryClient()
    const mutation=useMutation(values=>http.put(`users/${id}`,values).then(res=>res.data),{
        onSuccess:async()=>{
            await queryClient.invalidateQueries(['users'])
            success('permissions has been successfully been entered')
            closeModal()
        },
        onError:(e)=>{
            warning('something went wrong')
            setErrors(e.response.data.errors || {})
        }
    })

    const submit=()=>{
        mutation.mutate({
            is_active:state.is_active ? 1 : 0,
            is_admin:state.is_admin ? 1 : 0,
        })
    }



    return (
        <>

                <button
                    type="button"
                    onClick={openModal}
                    className="focus:outline-none text-teal-700"
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
                                    User Permissions
                                </Dialog.Title>
                                <div className="mt-10">
                                    <label>
                                        <span className="block text-xs mb-3">Activate User</span>
                                        <select
                                            name={'is_active'}
                                            onChange={handleChange}
                                            value={state.is_active}
                                            className={`input ${errors.is_active ? 'border-red-600' : 'border-zinc-200'}`}
                                        >
                                            <option value="">Select</option>
                                            <option value={true}>True</option>
                                            <option value={false}>False</option>
                                        </select>
                                        {
                                            errors.is_active && (
                                                <span className="block text-xs text-red-600 mt-3">{errors.is_active[0]}</span>
                                            )
                                        }
                                    </label>
                                </div>

                                <div className="mt-10">
                                    <label>
                                        <span className="block text-xs mb-3">Admin Permission</span>
                                        <select
                                            name={'is_admin'}
                                            onChange={handleChange}
                                            value={state.is_admin}
                                            className={`input ${errors.is_admin ? 'border-red-600' : 'border-zinc-200'}`}
                                        >
                                            <option value="">Select</option>
                                            <option value={true}>True</option>
                                            <option value={false}>False</option>
                                        </select>
                                        {
                                            errors.is_admin && (
                                                <span className="block text-xs text-red-600 mt-3">{errors.is_admin[0]}</span>
                                            )
                                        }
                                    </label>
                                </div>

                                <div className="mt-10">
                                    <button onClick={submit} className="btn bg-p-100 text-white">
                                        {
                                            mutation.isLoading ? '... Modifying entry' : 'Modify entry'
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

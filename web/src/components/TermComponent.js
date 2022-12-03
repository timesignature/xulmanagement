import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import InputComponent from "./InputComponent";
import {success, warning} from "./ToastComponent";

export default function TermComponent() {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setErrors({})
        setState({
            description:'',
            start:'',
            end:'',
            is_active:'',
        })
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const [state,setState]=useState({
        description:'',
        start:'',
        end:'',
        amount:'',
        is_active:'',
    })

    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    const queryClient=useQueryClient()
    const mutation=useMutation(values=>http.post('/terms',values).then(res=>res.data),{
        onSuccess:async()=>{
            await queryClient.invalidateQueries(['terms'])
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
                                    Create New Term
                                </Dialog.Title>
                                <div className="mt-10 grid grid-cols-2 gap-8">
                                    <div className="col-span-2">
                                        <InputComponent
                                            onChange={handleChange}
                                            title={'Description'}
                                            name={'description'}
                                            error={errors.description}
                                            value={state.description}
                                        />
                                    </div>

                                    <div>
                                        <InputComponent
                                            type={'date'}
                                            onChange={handleChange}
                                            title={'Start of Term'}
                                            name={'start'}
                                            error={errors.start}
                                            value={state.start}
                                        />
                                    </div>

                                    <div>
                                        <InputComponent
                                            type={'date'}
                                            onChange={handleChange}
                                            title={'End of Term'}
                                            name={'end'}
                                            error={errors.end}
                                            value={state.end}
                                        />
                                    </div>
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

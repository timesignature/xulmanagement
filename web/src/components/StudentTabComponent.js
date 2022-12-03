import { Tab } from '@headlessui/react'
import EditStudentComponent from "./EditStudentComponent";
import StudentFeeComponent from "./StudentFeeComponent";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function StudentTabComponent() {



    return (
        <div className="w-full">
            <Tab.Group>
                <Tab.List className="flex space-x-5 overflow-x-auto border-b border-zinc-100 py-5">
                    <Tab
                        key={'profile'}
                        className={({ selected }) =>
                            classNames(
                                'text-xs px-2',
                                '',
                                selected
                                    ? 'text-p-100'
                                    : 'text-gray-600'
                            )
                        }
                    >
                        Profile
                    </Tab>

                    <Tab
                        key={'fees'}
                        className={({ selected }) =>
                            classNames(
                                'text-xs px-2',
                                '',
                                selected
                                    ? 'text-p-100'
                                    : 'text-gray-600'
                            )
                        }
                    >
                        Fees
                    </Tab>
                </Tab.List>
                <Tab.Panels className="mt-2">
                    <Tab.Panel
                        key={'profile'}
                        className={classNames(
                            'focus:outline-none',
                            ''
                        )}
                    >
                       <EditStudentComponent/>
                    </Tab.Panel>

                    <Tab.Panel
                        key={'fees'}
                        className={classNames(
                            'focus:outline-none',
                            ''
                        )}
                    >
                        <StudentFeeComponent/>
                    </Tab.Panel>


                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

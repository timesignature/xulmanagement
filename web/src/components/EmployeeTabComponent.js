import { Tab } from '@headlessui/react'
import EditEmployeeComponent from "./EditEmployeeComponent";
import SlipComponent from "./SlipComponent";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function EmployeeTabComponent() {



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
                        key={'salaries'}
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
                        Salaries
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
                       <EditEmployeeComponent/>
                    </Tab.Panel>

                    <Tab.Panel
                        key={'salaries'}
                        className={classNames(
                            'focus:outline-none',
                            ''
                        )}
                    >
                        <div className='mt-10'>
                            <span className="block text-3xl text-p-100">Salary Setup</span>
                            <div className="mt-10">
                                <SlipComponent/>
                            </div>
                        </div>
                    </Tab.Panel>

                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

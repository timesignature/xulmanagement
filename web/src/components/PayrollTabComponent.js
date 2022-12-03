import { Tab } from '@headlessui/react'
import SlipComponent from "./SlipComponent";
import SalaryComponent from "./SalaryComponent";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function PayrollTabComponent() {


    return (
        <div className="w-full">
            <Tab.Group>
                <Tab.List className="flex space-x-5 overflow-x-auto border-b border-zinc-100 py-5">
                    <Tab
                        key={'salary'}
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

                    <Tab
                        key={'allocation'}
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
                        Allocations
                    </Tab>

                </Tab.List>
                <Tab.Panels className="mt-2">
                    <Tab.Panel
                        key={'salary'}
                        className={classNames(
                            'focus:outline-none',
                            ''
                        )}
                    >
                        <SalaryComponent/>
                    </Tab.Panel>

                    <Tab.Panel
                        key={'allocation'}
                        className={classNames(
                            'focus:outline-none',
                            ''
                        )}
                    >
                        <span>Allocations</span>
                    </Tab.Panel>


                    <Tab.Panel
                        key={'salaries'}
                        className={classNames(
                            'focus:outline-none',
                            ''
                        )}
                    >
                        <SlipComponent/>
                    </Tab.Panel>

                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

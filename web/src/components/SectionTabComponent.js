import { useState } from 'react'
import { Tab } from '@headlessui/react'
import useSections from "../hooks/useSections";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SectionTabComponent() {
    let [categories] = useState({
        Recent: [
            {
                id: 1,
                title: 'Does drinking coffee make you smarter?',
                date: '5h ago',
                commentCount: 5,
                shareCount: 2,
            },
            {
                id: 2,
                title: "So you've bought coffee... now what?",
                date: '2h ago',
                commentCount: 3,
                shareCount: 2,
            },
        ],
        Popular: [
            {
                id: 1,
                title: 'Is tech making coffee better or worse?',
                date: 'Jan 7',
                commentCount: 29,
                shareCount: 16,
            },
            {
                id: 2,
                title: 'The most innovative things happening in coffee',
                date: 'Mar 19',
                commentCount: 24,
                shareCount: 12,
            },
        ],
        Trending: [
            {
                id: 1,
                title: 'Ask Me Anything: 10 answers to your questions about coffee',
                date: '2d ago',
                commentCount: 9,
                shareCount: 5,
            },
            {
                id: 2,
                title: "The worst advice we've ever heard about coffee",
                date: '4d ago',
                commentCount: 1,
                shareCount: 2,
            },
        ],
    })


    const {data:sections}=useSections()


    return (
        <div className="w-full">
            <Tab.Group>
                <Tab.List className="flex space-x-5 overflow-x-auto border-b border-zinc-200 py-3">
                    {sections && sections.map((s) => (
                        <Tab
                            key={s.id}
                            className={({ selected }) =>
                                classNames(
                                    'text-sm',
                                    '',
                                    selected
                                        ? 'text-gray-700'
                                        : 'text-gray-400'
                                )
                            }
                        >
                            {s.title}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    {sections && sections.map((s) => (
                        <Tab.Panel
                            key={s.id}
                            className={classNames(
                                '',
                                ''
                            )}
                        >
                            {
                                s?.students.map(st=>(
                                    <span className="block text-xs mb-5">{st.name} {st.surname}</span>
                                ))
                            }
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

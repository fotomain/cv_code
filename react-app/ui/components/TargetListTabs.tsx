

// npm install @headlessui/react@insiders

import { useState } from 'react'

// https://headlessui.com/react/tabs
import { Tab } from '@headlessui/react'

function classNames(...items:any) {
    return items.filter(Boolean).join(' ')
}

const TargetListTabs = (props:any) => {

    let categories = [

            {
                id: 'hit',
                title: 'Hit',
                subtitle: '',
                date: '5h ago',
                commentCount: 5,
                shareCount: 2,
            }
        ,

            {
                id: 'detox',
                title: 'Detox',
                subtitle: '',
                date: 'Jan 7',
                commentCount: 29,
                shareCount: 16,
            },



            {
                id: '750',
                title: 'Decrease',
                subtitle: '750 kcal',
                date: '2d ago',
                commentCount: 9,
                shareCount: 5,
            },



            {
                id: '1000',
                title: 'Decrease',
                subtitle: '1000 kcal',
                date: '2d ago',
                commentCount: 9,
                shareCount: 5,
            },



            {
                id: '1500',
                title: 'Decrease',
                subtitle: '1500 kcal',
                date: '2d ago',
                commentCount: 9,
                shareCount: 5,
            },


            {
                id: '2000',
                title: 'Balance',
                subtitle: '2000 kcal',
                date: '2d ago',
                commentCount: 9,
                shareCount: 5,
            },


            {
                id: '2500',
                title: 'Set',
                subtitle: '2500 kcal',
                date: '2d ago',
                commentCount: 9,
                shareCount: 5,
            }
            ,
            {
                id: '3500',
                title: 'Set',
                subtitle: '3500 kcal',
                date: '2d ago',
                commentCount: 9,
                shareCount: 5,
            }

        ]

  // useEffect(() => {
  //
  //   if(props.on_use_effect){
  //     console.log('=== data_xy on_use_effect')
  //     props.on_use_effect()
  //   }
  //
  //   return () => {
  //
  //   };
  // }, []);

  return (

        // id='use_desktop_mode'
            <div
                id={props.id}
                className="w-full max-w-md px-2 py-16 sm:px-0"
            >
                <Tab.Group
                    defaultIndex={2}
                    onChange={(index) => {
                        console.log('=== Changed selected tab to:', index)
                    }}
                >
                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                        {categories.map((category:any) => (
                            <Tab
                                key={category.id}
                                className={({ selected }) =>
                                    classNames(
                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                        selected
                                            ? 'bg-white shadow'
                                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                    )
                                }
                            >
                                {category.title}
                                <br/>
                                {category.subtitle}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        {Object.values(categories).map((tab_el, idx) => (
                            <Tab.Panel
                                key={idx}
                                className={classNames(
                                    'rounded-xl bg-white p-3',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                )}
                            >
                                <ul>

                                        <li
                                            key={tab_el.id}
                                            className="relative rounded-md p-3 hover:bg-gray-100"
                                        >
                                            <h3 className="text-sm font-medium leading-5">
                                                {tab_el.title}
                                            </h3>

                                            <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                                                <li>{tab_el.date}</li>
                                                <li>&middot;</li>
                                                <li>{tab_el.commentCount} comments</li>
                                                <li>&middot;</li>
                                                <li>{tab_el.shareCount} shares</li>
                                            </ul>

                                            <a
                                                href="#"
                                                className={classNames(
                                                    'absolute inset-0 rounded-md',
                                                    'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                                                )}
                                            />
                                        </li>

                                </ul>
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>

  );
};

export default TargetListTabs;

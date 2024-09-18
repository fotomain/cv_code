
// === from tailwind.config.js
let tw_screens: {[key: string]:any} = {}
tw_screens = {
    'xs': '360px',

        'sm': '640px',

        'md': '768px',
        // => @media (min-width: 640px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
}

const tw_col='w-full flex flex-col justify-start'

const tw_col_center_basic='flex flex-col justify-start items-center'
const tw_col_center='w-full flex flex-col justify-start items-center'
const tw_col_left='w-full flex flex-col justify-start items-start'

const tw_col_left_basic=' flex flex-col justify-start items-start'

const tw_row_center_basic='flex flex-row justify-center items-center'
const tw_row_center='w-full flex flex-row justify-center items-center'
const tw_row_left       ='w-full flex flex-row justify-start items-center'
const tw_row_left_basic       ='flex flex-row justify-start items-center'
const tw_row_right      ='w-full flex flex-row justify-end      items-center'
const tw_row_between    ='w-full flex flex-row justify-between  items-center'

const tw_opacity_lignt    =' font-inter_light opacity-[.7] '

const tw_no_wrap    =' flex-nowrap '

function tw_get_current_breakpoints() {

    const res = Object.keys(tw_screens).filter((key) => {
        var t1:any = tw_screens[key]
        if( undefined!==t1 ) {
            t1 = t1.replace('px','')
            const num1 = Number(t1)
            // console.log('=== theme num1 ', num1)
            return window.innerWidth > num1
        }
    })

    console.log('=== theme res ',res[res.length-1])
    return res[res.length-1]
}

export {
      tw_col,
      tw_col_center, tw_row_center, tw_row_between, tw_row_left, tw_row_right
    , tw_no_wrap
    , tw_col_left
    , tw_get_current_breakpoints
    , tw_opacity_lignt
    , tw_col_center_basic
    , tw_row_center_basic
    , tw_row_left_basic
    , tw_col_left_basic

}


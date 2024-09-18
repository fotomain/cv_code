

const meal_sets_per_day=5
const meal_per_day_price_full=[
    {
        days_count:2,
        title:'2 days',
        price_per_meal:10,
        discount_percent:0,
    },
    {
        days_count:4,
        title:'4 days',
        price_per_meal:9,
        discount_percent:5,
    },
    {
        days_count:6,
        title:'6 days',
        price_per_meal:8,
        discount_percent:10,
    },
    {
        days_count:12,
        title:'12 days',
        price_per_meal:8,
        discount_percent:15,
    },
    {
        days_count:24,
        title:'24 days',
        price_per_meal:8,
        discount_percent:19,
    },
    {
        days_count:30,
        title:'30 days',
        price_per_meal:8,
        discount_percent:20,
    },

]
const meal_per_day_price_working=[
    {
        days_count:5,
        title:'5 days',
        price_per_meal:20,
        // discount_percent:0,
    },
    {
        days_count:20,
        title:'20 days',
        price_per_meal:17,
        discount_percent:15,
    },

]

let target_programs_list = [

    {
        id: 'hit',
        title: 'Hit',

    }
    ,

    {
        id: 'detox',
        title: 'Detox',

    },


    {
        id: 'decrease',
        title: 'Decrease',

    },

    {
        id: 'balance',
        title: 'Balance',

    },

    {
        id: 'increase',
        title: 'Increase',
    }

]


const target_calories_list:any={
    'hit':[        {
        id: '1500',
        title: '1500 cal',
    }
    ],
    'detox':[
        {
            id: '750',
            title: '750 cal',

        }
        ,
        {
            id: '1500',
            title: '1500 cal',

        }
    ],

    'decrease':[
        {
            id: '750',
            title: '750 cal',

        }
        ,
        {
            id: '1000',
            title: '1000 cal',

        }
        ,
        {
            id: '1500',
            title: '1500 cal',

        }
    ],

    'balance':[
        {
            id: '1500',
            title: '1500 cal',
        }
    ],

    'increase':[

        {
            id: '2500',
            title: '2500 cal',

        }
        ,
        {
            id: '3500',
            title: '3500 cal',
        }
    ],

}

const kit_calculation = (p:any) => {

    // target_programs_list     target_program
    // target_calories_list     target_calories
    // p.state.exclude_fish
    // p.state.days_mode
    // p.state.days_count

    const program_ = target_programs_list[p.state.target_program]
    console.log('=== c1 program_ ', program_.title)
    const calories_list = target_calories_list[program_.id]
    const calories_ = calories_list[p.state.target_calories]

    console.log('=== c1 p.state ', p.state)
    console.log('=== c1 calories_ ', calories_)
    console.log('=== c1 calories_ ', calories_?.title)

    const price_array = ('days_working' === p.state.days_mode) ? meal_per_day_price_working : meal_per_day_price_full
    const price_el = price_array.filter(el => el.days_count === p.state.days_count)
    const price_data = price_el[0]

    let res_total_invoice: number = 0
    let res_total_before_discount: number = 0
    let res_total: number = 0
    let res_specification: string = ''
    res_specification = res_specification.concat(
        program_.title, ', ',
        calories_.title, ', ',
        (p.state.exclude_fish) ? 'exclude fish,' : '', ' ',
        price_data.days_count + ' days ', ' ',
    )

    res_total_before_discount = price_data.days_count * price_data.price_per_meal * meal_sets_per_day;

    console.log('=== price_data ',price_data)

    const percent_ = (price_data.discount_percent) ? price_data.discount_percent : 0
    const res_discount = Math.round((res_total_before_discount * percent_ / 100 ) * 100) / 100



    res_total_invoice = res_total_before_discount - res_discount

    const res_all = {
        specification: res_specification,
        total_before_discount: res_total_before_discount,
        discount: res_discount,
        total_invoice: res_total_invoice,
    }

    console.log('=== res_all res_discount ',res_discount)
    console.log('=== res_all ',res_all)

    return res_all
}

export {kit_calculation, meal_per_day_price_full, meal_per_day_price_working, target_programs_list,target_calories_list}

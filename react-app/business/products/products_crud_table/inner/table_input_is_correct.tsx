import {YESNO_WINDOW_ACTION} from "../../../../system_state/products_state/actions";

const input_is_correct = (p:any) =>{
    if('sale_price'===p.columnId){
        const c1 = (parseFloat(p.value))>(parseFloat(p.rowData.original.regular_price))
        console.log('=== c1 ',c1,typeof p.value,typeof p.rowData.original.regular_price)
        if(c1) {
            // alert('not correct price for sale1!')
            // input_error
            p.dispatch(YESNO_WINDOW_ACTION({
                new_value: {
                    window_title: 'Input data is not correct!',
                    window_text: 'Input correct data for sale price. Now: sale price ' + p.value + ' > regular price ' + p.rowData.original.regular_price,
                    window_name: 'input_error',
                    window_open: true,
                }
            }))
            return false
        }}

    if('regular_price'===p.columnId){

        const c1 = (parseFloat(p.value))<(parseFloat(p.rowData.original.sale_price))
        console.log('=== c1 ',c1,typeof p.value,typeof p.rowData.original.sale_price)
        if(c1) {

            p.dispatch(YESNO_WINDOW_ACTION({
                new_value: {
                    window_title: 'Input data is not correct!',
                    window_text: 'Input correct data for regular price. Now: regular price ' + p.value + ' < sale price ' + p.rowData.original.sale_price,
                    window_name: 'input_error',
                    window_open: true,
                }
            }))

            return false
        }

        // if(p.value<p.rowData.original.sale_price)
        //     alert('not correct price for sale2!')
        // return false
    }

    return true

}

export default input_is_correct

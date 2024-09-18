


import {tw_col_center} from "../../../../system_code/tw/tw_tools";
import {Button, Checkbox, FormControlLabel, Grid, Typography} from "@mui/material";
import React, { useEffect, useRef, useState} from "react";
import Papa from "papaparse";

import {DividerH} from "../MUITools";
import woo_create_product_empty from "../woo_create_product_empty";
import woo_update_product_line from "../woo_update_product_line";


import InputFileFilled from "../../../../system_code/input_material5/InputFileFilled";
import CWooEntity from "../woo_api/CWooEntity";

const delay_async = (ms:any) => new Promise(res => setTimeout(res, ms))
const getSubData=(lineSubData:any,whereSearch:any)=>{
    let resArray:any=[]
    for (let j = 0; j < lineSubData.length; j++) {
        const el_data = lineSubData[j]

        for (let k = 0; k < whereSearch.length; k++) {
            const one_el=whereSearch[k]
            if(one_el.slug.toLowerCase() === el_data.toLowerCase())
                resArray.push(one_el.id)
        }
    }
    return resArray
}

const  prepare_work_array = ( work_array:any ) =>{

    // for (let nn = 0; nn < 1 ; nn++) {
    //     for (let i = 0; i < 1 ; i++) {


            let xArray = []
    for (let nn = 0; nn < 6 ; nn++) {
        for (let i = 0; i < work_array.length ; i++) {
            let el:any= {...work_array[i]}
            let coef = (nn+1)
            if(nn>0) {
                el.name = 'x' + coef.toString() +' '+ el.name
                el.entity_guid = el.entity_guid+'x' + coef.toString()
                el.sku = el.sku+'x' + coef.toString()
                // YES *nn Persons
                el.regular_price = Math.round( nn*el.regular_price ).toString()

                //=== calc!!!
                el.sale_price = Number(el.regular_price)
                // - discount
                el.sale_price = el.sale_price - (5*coef / 100 * el.sale_price)
                // NO *nn Persons
                el.sale_price = Math.round( el.sale_price ).toString()

                el.price = el.sale_price

                // el.sale_price = (Math.round((100-coef*8/100)*el.regular_price/100*100)/100).toString()
                el.on_sale = true

                console.log('=== prepare YES sale_price',el.sale_price,el)

            }else{
                el.price = el.regular_price
                el.sale_price = ''
                el.on_sale = false
                console.log('=== prepare NO sale_price',el.sale_price,el)
            }
            xArray.push(el)
        }
    }

    console.log('===xArray',xArray)

    return xArray

}
class Metadata  {

    // woo_users = new CWooEntity('users')
    // woo_attributes = new CWooEntity('products/attributes')
    // woo_attributes_terms = new CWooEntity('products/attributes/11/terms')

    woo_products =  new CWooEntity('products')
    woo_categories =  new  CWooEntity('products/categories')
    woo_tags        =  new  CWooEntity('products/tags')
}

const md = new Metadata()

const WooProductsCRUDFromFile = (props:any) => {


    const [state, set_state] = useState({
        upload_guid:'upload_guid111',
        products_good_data:[],
        products_file_parsed:[],
        auto_udate_if_product_exist:true,
        errors:'',
    });


    let ref_local = useRef<HTMLInputElement>(null)

    useEffect(() => {
        console.log('=== ref_local',ref_local)
        console.log('=== state.products_good_data',state.products_good_data)
        return () => {

        };
    }, [ref_local,state.products_good_data]);


    // const [tab_value, set_tab_value] = React.useState(0);
    // const onChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    //     set_tab_value(newValue);
    // };

    const CheckboxMaterial = (p:any) => {
        let ref_checkbox_local = useRef<HTMLButtonElement>(null)
        let ref_label_local = useRef<HTMLSpanElement>(null)
        return (

            <FormControlLabel
                ref={ref_checkbox_local}
                control={
                    <Checkbox

                        size="small"
                        checked={p?.checked}
                        onChange={(event, checked)=>
                            p?.onChange(event, checked)
                        }
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                }
                label={<Typography
                    ref={ref_label_local}
                    sx={{
                        fontFamily: 'roboto-regular',
                        fontSize: '12px',
                    }}
                >
                    {p.label}
                </Typography>
                }
            />

        );
    };


    // sss
    return(

        <div className={tw_col_center} id={'div_WooCreateFromFile'} >

            {/*<ProductsGRIDBasic />*/}

            <Grid container id={'div_product_page'}
                direction="row"
                justifyContent="center"
                alignItems="start"
            >
                <Grid item>
                    {/*<PT_CategoriesTreeBasic />*/}
                </Grid>
                <Grid item>
                    {/*<ProductsGRIDBasic />*/}
                </Grid>
            </Grid>


            <div id={'div_wrapper_InputFileMaterial'}
                 // style={{maxWidth:'500px'}}
                 className={'' +
                    '  pt-[10px]' +
                    '  w-[600px]' +
                    '  xs:max-w-[340px]' +
                    '  sm:max-w-[340px]' +
                    '  md:max-w-[500px]' +
                 ''}
            >
            <InputFileFilled
                do_after={(p:any)=>{

                    // alert('=== p.file_input + '+JSON.stringify(p.file_input))
                    console.log('=== p.file_input  ',p.file_input)
                    console.log('=== p.file_input.type  ',p.file_input.type)
                    const do_parse_csv = (
                        'application/vnd.ms-excel'===p.file_input.type
                        ||
                        'text/csv'===p.file_input.type
                    )
                    if(!do_parse_csv) {alert('error - file is not CSV format'); return}

                    Papa.parse(p.file_input, {
                        header: true,
                        skipEmptyLines: true,
                        complete: function (results) {

                            console.log('=== results ',results)
                            console.log('=== results S',results.data)

                            const work_array = results.data
                            const goog_data:any = []
                            for (let i = 0; i < work_array.length  ; i++) {
                                const el:any=work_array[i]
                                const line_is_good_product = (el.name && el.type && el.regular_price && el.description)
                                const line_is_good_video = (el.you_url && el.entity_guid )
                                if(
                                    (line_is_good_product || line_is_good_video)
                                ) {
                                    goog_data.push(el)
                                }
                                else {
                                    console.error('=== read file incorect data line # ',i, el)
                                }
                            }

                            console.log('=== goog_data ',goog_data)

                            set_state( (prev_state:any)=> {
                                return {
                                    ...prev_state,
                                    products_good_data:goog_data,
                                    products_file_parsed:results.data,
                                }
                            })



                        },
                    });


                }}
            />
            </div>

            <CheckboxMaterial
                checked={state.auto_udate_if_product_exist}
                label={'  Auto udate if Product exist'}
                onChange={(e:any,checked:boolean)=>
                {
                    set_state( (prev_state:any)=> {
                        return {
                            ...prev_state,
                            auto_udate_if_product_exist:checked,
                        }
                    })

                    console.log('=== onChange auto_udate_if_product_exist',checked)
                }
                }
            />


            <DividerH/>

            <Button
                variant="contained"

                onClick={()=> {
                        // alert("This option is blocked! Use update options")
                        // return
                        const do_ = async () => {
                            // woo_crud_create_main_video
                            let work_array:any = state.products_good_data
                            work_array = prepare_work_array(work_array)

                            if (!work_array || (0 === work_array.length)) {
                                alert('=== no data in file work_array ')
                                return
                            }

                            console.log('▄▄▄▄▄▄▄▄▄▄▄▄▄ work_array products ',work_array)


                                // for (let i = 0; i < 50; i++) {
                                // for (let i = 51; i < 100; i++) {
                                // for (let i = 101; i < 200; i++) {
                                // for (let i = 201; i < work_array.length; i++) {
                                for (let i = 0; i < work_array.length; i++) {

                                    if((i>0) && (i%50)===0) {
                                        await delay_async(10000)
                                        console.log('=== delay_async ',i)
                                    }

                                    const line_: any = work_array[i]
                                    console.log('=== line_',i, line_)

                                    let upload_guid_obj = [{
                                        "key": "upload_guid",
                                        "value": 'upload_guid001',
                                    }]

                                    woo_create_product_empty({
                                        upload_guid_obj
                                    }).then((res:any)=>{
                                        console.log('=== woo_create_product_empty ▄▄▄▄▄▄▄▄▄▄▄▄▄ create OK')
                                        // res.data
                                        woo_update_product_line({
                                            old_data:res.data,
                                            new_data: {
                                                ...line_,
                                                main_image_url:line_.image_path+line_.main_image_file_name,
                                            },
                                        }).then((res:any) => {
                                            console.log('=== ▄▄▄▄▄▄▄▄▄▄▄▄▄▄  woo_update_product_line updated OK ',res)
                                            if( i===(work_array.length-1) ) {
                                                props?.set_state_upper((prev_state: any) => {
                                                    return {
                                                        ...prev_state,
                                                        state_refresh: Date.now(),
                                                    }
                                                })
                                            }
                                        }).catch((err: any) => {
                                            console.log('=== ▄▄▄▄▄▄▄▄▄▄▄▄▄▄  woo_update_product_line updated ERR ',err)
                                                woo_update_product_line({
                                                    old_data:res.data,
                                                    new_data: {
                                                        ...line_,
                                                        main_image_url:line_.image_path+line_.main_image_file_name,
                                                    },
                                                })
                                        });
                                    }).catch((err: any) => {
                                        console.log('=== ▄▄▄▄▄▄▄▄▄▄▄▄▄▄  woo_create_product_empty ERR ',err)
                                    });

                                }//for products

                        }

                    do_()

                }}

                disabled={(state.products_good_data.length===0)}

                //local style={{color:'white', backgroundColor:'green', padding:'10px'}}

            >
                CREATE Products FROM FILE
            </Button>


            {/*================== woo_tags*/}
            {/*================== woo_tags*/}
            {/*================== woo_tags*/}
            <Button
                variant="outlined"
                onClick={()=> {

                    if(0==state.products_good_data.length) {
                        alert('No data in file selected!')
                        return
                    }

                    md.woo_tags.read({})
                        .then((res) => {
                            console.log('=== ▄▄▄▄▄▄▄▄▄▄▄▄▄ woo_tags ',res.data)

                            const woo_tags=res.data

                            let work_array:any = state.products_good_data
                            work_array = prepare_work_array(work_array)

                            if (!work_array || (0 === work_array.length)) {
                                alert('=== no data in file work_array ')
                                return
                            }


                            for (let i = 0; i < work_array.length; i++) {

                                const line_: any = work_array[i]
                                const line_tags = line_.tags.split(',')

                                if(line_tags.length===0) {
                                    console.warn('=== no tags ',i, line_)
                                    continue
                                }

                                let resArray = getSubData(line_tags, woo_tags)
                                resArray = resArray.map((el:any)=> ({id:el}))

                                console.log('=== line_tags', i, line_tags, resArray, woo_tags)

                                let tags_obj = (line_tags.length !== 0) ? {tags: resArray} : {}
                                console.log('=== tags_obj', tags_obj)

                                md.woo_products.read({

                                    'entity_guid':line_['entity_guid'],

                                }).then((res:any) => {
                                        const update_id = res.data[0].id
                                        console.log('=== product ▄▄▄▄▄▄▄▄▄▄▄▄▄ woo_products.read ', update_id, res.data)
                                        md.woo_products.update({
                                            ...tags_obj,
                                        },{id:update_id})
                                            .then((res:any)=>{
                                                console.log('=== product ▄▄▄▄▄▄▄▄▄▄▄▄▄ update tags OK ', res.data)
                                            })//then
                                            .catch((err:any)=>{
                                                console.log('=== err ',err)
                                            })

                                })//then

                            }//for work_array
                        })
                }}
            >
                UPDATE All Tags
            </Button>

            {/*================ categories*/}
            {/*================ categories*/}
            {/*================ categories*/}
            <Button
                variant="outlined"
                onClick={()=> {

                    if(0==state.products_good_data.length) {
                        alert('No data in file selected!')
                        return
                    }

                    md.woo_categories.read({
                        // 'search':'Men',
                        // 'slug':'men',
                        // 'search':'Women',
                        'per_page':100,
                        'page':1,
                    })
                        .then( (res) => {

                            const do_here = async () => {
                                console.log('=== do_here ▄▄▄▄▄▄▄▄▄▄▄▄▄ woo_categories ',res.data)
                                const woo_categories=res.data

                                let work_array:any = state.products_good_data
                                work_array = prepare_work_array(work_array)

                                if (!work_array || (0 === work_array.length)) {
                                    alert('=== no data in file work_array ')
                                    return
                                }


                                for (let i = 0; i < work_array.length; i++) {

                                    if((i>0) && (i%50)===0) {
                                        await delay_async(10000)
                                        console.log('=== delay_async do_here',i)
                                    }


                                    const line_: any = work_array[i]

                                    console.warn('=== line_ work ',i, line_)
                                    // continue

                                    const line_categories = line_.categories.split(',')
                                    if(line_categories.length===0) {
                                        console.warn('=== no categories ',i, line_)
                                        continue
                                    }

                                    let resArray = getSubData(line_categories,woo_categories)
                                    resArray = resArray.map((el:any)=> ({id:el}))
                                    //TODO x2 persons if(line_.name.indexOf('x2')!==-1) resArray.push({id:})

                                    let categories_obj = (line_categories.length !== 0) ? {categories: resArray} : {}
                                    console.log('=== categories_obj', categories_obj)

                                    console.log('=== line_categories',i,line_categories,resArray,woo_categories )


                                    md.woo_products.read({

                                        'entity_guid':line_['entity_guid'],

                                    }).then((res:any) => {
                                        console.log('=== t11 product ▄▄▄▄▄▄▄▄▄▄▄▄▄ res ', res)
                                        const update_id = res.data[0].id
                                        console.log('=== t11 product ▄▄▄▄▄▄▄▄▄▄▄▄▄ update_id ', update_id,'=== entity_guid ',line_['entity_guid'])
                                        console.log('=== t11 product ▄▄▄▄▄▄▄▄▄▄▄▄▄ update_id woo_products.read ', update_id, res.data )

                                        md.woo_products.update({
                                            ...categories_obj,
                                        },{id:update_id})
                                            .then((res:any)=>{
                                                console.log('=== product ▄▄▄▄▄▄▄▄▄▄▄▄▄ update categories OK ', res.data)
                                            })//then
                                            .catch((err:any)=>{
                                                console.log('=== err ',err)
                                            })

                                    })//then

                            }

                            } //do_here
                            do_here().then((res:any)=>{
                                console.log('do_here2 finished ', res)
                            })
                        })//.then
                }}
            >
                UPDATE All Categories
            </Button>

            {/*================ images*/}
            {/*================ images*/}
            {/*================ images*/}
            <Button
                variant="outlined"
                onClick={()=> {

                    if(0==state.products_good_data.length) {
                        alert('No data in file selected!')
                        return
                    }

                            let work_array:any = state.products_good_data
                            work_array = prepare_work_array(work_array)

                            if (!work_array || (0 === work_array.length)) {
                                alert('=== no data in file work_array ')
                                return
                            }

                                console.log('=== ▄▄▄▄▄▄▄▄▄▄▄▄▄ work_array ',work_array)

                            for (let i = 0; i < work_array.length; i++) {

                                const line_: any = work_array[i]

                                let update_name = 'main_image_url'
                                let update_data = line_.image_path+line_.main_image_file_name

                                md.woo_products.read({

                                    'entity_guid':line_['entity_guid'],

                                }).then((res:any) => {
                                    const update_id = res.data[0].id
                                    console.log('=== product ▄▄▄▄▄▄▄▄▄▄▄▄▄ woo_products.update ', update_id, res.data)
                                    md.woo_products.update({
                                        "meta_data": [
                                            {
                                                "key": update_name,
                                                "value":update_data
                                            },
                                        ]

                                    },{id:update_id})
                                        .then((res:any)=>{
                                            console.log('=== product ▄▄▄▄▄▄▄▄▄▄▄▄▄ update OK ', res.data)
                                        })//then
                                        .catch((err:any)=>{
                                            console.log('=== err ',err)
                                        })

                                })//then

                            }
                }}
            >
                UPDATE All Image URL
            </Button>


            {/*================ Prices*/}
            {/*================ Prices*/}
            {/*================ Prices*/}

            <Button
                variant="outlined"
                onClick={()=> {

                    if(0==state.products_good_data.length) {
                        alert('No data in file selected!')
                        return
                    }
                            let work_array:any = state.products_good_data
                            work_array = prepare_work_array(work_array)
                            if (!work_array || (0 === work_array.length)) {
                                alert('=== no data in file work_array ')
                                return
                            }

                                console.log('=== ▄▄▄▄▄▄▄▄▄▄▄▄▄ work_array ',work_array)

                            for (let i = 0; i < work_array.length; i++) {
                                const line_: any = work_array[i]

                                md.woo_products.read({

                                    'entity_guid':line_['entity_guid'],

                                }).then((res:any) => {
                                    if((!res.data) || (!res.data[0])) {

                                        console.error("=== error - not critical data for line_['entity_guid'] not found 27.06.2024 12:16 ▄▄▄▄▄▄▄▄▄▄▄▄▄",line_['entity_guid'],res)

                                    } else {
                                        const update_id = res.data[0].id
                                        console.log('=== product ▄▄▄▄▄▄▄▄▄▄▄▄▄ woo_products.update ', update_id, res.data)
                                        md.woo_products.update({
                                            regular_price:line_.regular_price,
                                            sale_price:line_.sale_price,
                                            price:line_.price,
                                            on_sale:line_.on_sale,
                                        },{id:update_id})
                                            .then((res:any)=>{
                                                console.log('=== product ▄▄▄▄▄▄▄▄▄▄▄▄▄ update OK ', res.data)
                                            })//then
                                            .catch((err:any)=>{
                                                console.log('=== err ',line_['entity_guid'])
                                                console.log('=== err ',err)
                                            })
                                    }
                                })//then

                            }
                }}
            >
                UPDATE All Prices
            </Button>


            {/*================ Prices*/}
            {/*================ Prices*/}
            {/*================ Prices*/}

            <Button
                variant="outlined"
                onClick={()=> {

                    if(0==state.products_good_data.length) {
                        alert('No data in file selected!')
                        return
                    }
                            let work_array:any = state.products_good_data
                            work_array = prepare_work_array(work_array)
                            if (!work_array || (0 === work_array.length)) {
                                alert('=== no data in file work_array ')
                                return
                            }

                                console.log('=== ▄▄▄▄▄▄▄▄▄▄▄▄▄ work_array ',work_array)

                            for (let i = 0; i < work_array.length; i++) {
                                const line_: any = work_array[i]

                                md.woo_products.read({

                                    'entity_guid':line_['entity_guid'],

                                }).then((res:any) => {
                                    const update_id = res.data[0].id
                                    console.log('=== product ▄▄▄▄▄▄▄▄▄▄▄▄▄ woo_products.update ', update_id, res.data)
                                    md.woo_products.update({
                                        name:line_.name,
                                    },{id:update_id})
                                        .then((res:any)=>{
                                            console.log('=== product ▄▄▄▄▄▄▄▄▄▄▄▄▄ update OK ', res.data)
                                        })//then
                                        .catch((err:any)=>{
                                            console.log('=== err ',err)
                                        })

                                })//then

                            }
                }}
            >
                UPDATE All Titles
            </Button>


        </div>

    )

}

            // <img src={`data:image/jpeg;base64,${data}`} />

            // OK

            // https://site33.antinedoebit.com/wp-content/uploads/prod_all/woocommerce-placeholder-100x100.png

            // https://antinedoebit.com/wp-content/uploads/woocommerce-placeholder-100x100.png
            // https://antinedoebit.com/wp-content/uploads/prod_all/woocommerce-placeholder-100x100.png
            // https://antinedoebit.com/wp-content/uploads/ttt.jpg


            // https://antinedoebit.com/wp-content/uploads/woocommerce_uploads/woocommerce-placeholder-100x100.png

            // https://antinedoebit.com/wp-content/uploads/woocommerce_uploads/prod701__i1__beef-balls.webp

                {/*<div>state.products_good_data.length {state.products_good_data.length}</div>*/}


export default WooProductsCRUDFromFile

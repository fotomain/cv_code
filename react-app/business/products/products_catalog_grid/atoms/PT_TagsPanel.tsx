
import React, {useContext, useEffect, useState} from "react";
import {Chip, Grid} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";



import {CatalogContext, m1_portrait} from "../Catalog.1.Shop";
import CWooEntity from "../../WooProductsAdminPage/woo_api/CWooEntity";

class Metadata  {
    woo_tags = new CWooEntity('products/tags')
}
const md = new Metadata()

const PT_TagsPanel = (props:any) => {

    const {drawer_state,  drawer_set_state} = useContext(CatalogContext)

    const SEL_TAGS_READ=(p:any)=>{

        md.woo_tags.read({
            'per_page':100,
            'page':1,
        })
            .then((res:any) => {

                console.log('=== ▄▄▄▄▄▄▄▄▄▄▄▄▄ tags_data ',res.data)

                // console.log('=== ▄▄▄▄▄▄▄▄▄▄▄▄▄ work_array tags_data',work_array)

                p.drawer_set_state( (prev_state:any)=> {
                    return {
                        ...prev_state,
                        tags_data:res.data,
                    }
                })
            })

    }

    useEffect(() => {
        SEL_TAGS_READ({drawer_set_state})
        return () => {
        };
    }, []);

    const handleDelete = (ti:any) => {

        console.log('=== ti',ti)
        let wArr:any[] = [...props?.selectedTags]
        wArr[ti] = null

        drawer_set_state((prev_state: any) => {return {...prev_state,
            selectedTags: wArr
        }})

    }
    const handleClick = (ti:any) => {
        console.log('=== ti',ti)
        let wArr:any[] = [...props?.selectedTags]
        if(wArr[ti]){
            wArr[ti] = null
        }else {
            wArr[ti] = ti
        }
        drawer_set_state((prev_state: any) => {return {...prev_state,
            selectedTags: wArr
        }
        })

    }

    const m1_mode = m1_portrait===drawer_state.display_mode

    // sss1
    return(<>
        <Grid id='div_PT_TagsPanel'
            container direction='row'
            // www
            justifyContent={{xs:'center',lg:"start"}}
            alignItems={'center'}
            gap={'2px'}
            flexWrap={(props?.noWrapMode)?'nowrap':'wrap'}
            // www
            sx={{paddingLeft:'0px',
                maxWidth:(props?.noWrapMode) ?'max-content':'200px',
                paddingBottom:(props?.noWrapMode) ?'0px':'0px',
            }}
        >
            {drawer_state.tags_data.map((el:any,ti:any)=>{
                return <Chip key={el.id}
                    size={(m1_mode)?'small':'medium'}
                    label={el.name}
                    onClick={()=> {
                        handleClick(el.id)
                    }}
                    onDelete={()=> {
                        handleDelete(el.id)
                    }}
                    deleteIcon={(props?.selectedTags[el.id])?<DoneIcon />:<></>}
                    variant="outlined"
                    color={(props?.selectedTags[el.id]) ? "primary" : 'default'}
                />
            })}

        </Grid>
    </>)

}

export default PT_TagsPanel


import {Divider} from "@mui/material";

const TWDivider = (props0:any) => {

    const {style, ...props} = props0

    return(
        <>
            {/*<hr id={'divider1'} className={' h-[10px] py-0 border-0 bg-[#6cd04c]  '} />*/}
            {/*<hr id={'divider1'} className={' h-[10px] my-8 bg-gray-200 border-0 dark:bg-gray-700 '} />*/}
            {/*(props.horizontal && props.width && (props.width!==0) )?{}:<></>*/}

            <Divider  {...props} style={{...style, ...{opacity:'0.6', width:'100%', backgroundColor:'#6cd04c', height:'1px',}}} />

        </>
    )
}

const tw_divider_vertical  = () => {
    return (<div className=' h-[5px] '></div>)
}

export {
     tw_divider_vertical,
     TWDivider,
}

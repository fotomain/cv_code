
import {useEffect, useState} from "react";
import {get_media_number} from "../TargetFilterLevel3";

const ImageObjectURL = (props:any) => {

    const [img, setImg] = useState({
        url:'',hash:0,
    });

    const fetchImage = async (p:any) => {
        // if (debug_local)
        // console.log('=== data_image fetchImage ',p.main_image_url)
        const res = await fetch(p.main_image_url+'?'+Date.now());
        const imageBlob = await res.blob();
        const imageObjectURL:any = URL.createObjectURL(imageBlob);

        // set_state((prev_state:any)=>{return({...prev_state,
        //     data_cache:{...prev_state.data_cache,[p.main_image_url]:imageObjectURL}
        // })})


        setImg({
            url: imageObjectURL,
            hash:Date.now(),
        });
    };

    useEffect(() => {
        fetchImage(props);
        return () => {

        };
    }, [props.entity_guid]); //!!! refresh needed

    let style_img={}
    //hardcode
    const is_detox=(props.name.indexOf('Detox')!==-1)
    if(is_detox){
        style_img={...style_img,...{
                //hardcode
                height:['90px','90px','100px','120px','120px'][get_media_number()],
                width:'auto',
                // paddingTop:'12px',
            }}
    }


    // sss2
    return(<>
        {(''===img.url)?null:<>
            <img id={'card_meal_image'}
                //=== c+slides
                 style={{width:'calc(45vw)',height:'auto',...props.style_image, ... style_img}} //works
                 // style={{width:'auto',height:(props.swiper_height-50)+'px'}} //works
                 src={`${img.url}`}
                 alt="Loading..."
            />
            {
                props.image_title()
            }
        </>
        }
    </>)

}

export default ImageObjectURL

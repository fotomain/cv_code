
/** @jsxImportSource @emotion/react */

import {css} from "@emotion/react";
import {useEffect, useRef, useState} from "react";

const shiftDown=100
const duration_init=2

const AppearIt = (props:any) => {

    let modes0_fade:{[index:string]:any} = {}
    let modes1_zoom:{[index:string]:any} = {}
    let modes0_slide:{[index:string]:any} = {}

    modes0_fade={

        'fade-up':      css` opacity:0; transform: translate3d(0, ${ shiftDown}px, 0); `,
        'fade-down':    css` opacity:0; transform: translate3d(0, ${-shiftDown}px, 0); `,

        'fade-right':   css` opacity:0; transform: translate3d(${-shiftDown}px, 0, 0); `,
        'fade-left':    css` opacity:0; transform: translate3d(${ shiftDown}px, 0, 0); `,

        'fade-up-right':   css` opacity:0; transform: translate3d(${-shiftDown}px, ${shiftDown}px, 0); `,
        'fade-up-left':    css` opacity:0; transform: translate3d(${ shiftDown}px, ${shiftDown}px, 0); `,

        'fade-down-right':   css` opacity:0; transform: translate3d(${-shiftDown}px, ${-shiftDown}px, 0); `,
        'fade-down-left':    css` opacity:0; transform: translate3d(${ shiftDown}px, ${-shiftDown}px, 0); `,
    }

    Object.entries(modes0_fade).map((el: any, ii: number) => {
        const   k=el[0]
        let     v=el[1]
        console.log('=== key_ ',k)
        console.log('=== val_ ',v)
        v = css`  ${v}; 
              ${' transition-duration: ${(props.duration)?props.duration:duration_init}s; '};            
            `//================
        modes0_fade[k]=v
    })

    console.log('=== modes0_fade ',modes0_fade)


    let css0_work
    let css1_work
    let css1_fade_visible=css` opacity:1; transition-duration: ${(props.duration)?props.duration:duration_init}s; transform: translate3d(0, 0, 0); `


    let css0_zoom_in_start=
        css` opacity:0; scale(0)   `

    let css0_zoom_out_start=
        css` opacity:0; scale(100)            `


    const css00_slide=css`
      visibility: hidden;
      //display: none;
    `
    // ============ tests
    // const css11=css`
    //   //display: block;
    //   animation-timing-function: ease-in;
    //   animation: .5s anime1;
    //   @keyframes anime1 {
    //     0%      {margin-top: 100%; visibility: visible}
    //     50%     {margin-top: 50%}
    //     100%    {margin-top: 0}
    //   }
    // `

    modes0_slide={
        'slide-up':     css`
          
          //display: block;
          animation-timing-function: ease-in;
          animation: .5s anime1;
          @keyframes anime1 {
            0%      {margin-top: 100%; visibility: visible}
            50%     {margin-top: 50%}
            100%    {margin-top: 0}
          }

        `,

        'slide-down':   css`

          //display: block;
          animation-timing-function: ease-in;
          animation: .5s anime1;
          @keyframes anime1 {
            0%      {margin-top: -100%; visibility: visible}
            50%     {margin-top: -50%}
            100%    {margin-top: 0}
          }
            
        `,
        'slide-left':   css` transform: translate3d( 100%, 0, 0);  visibility: hidden; transition-duration: ${(props.duration)?props.duration:duration_init}s; `,
        'slide-right':  css` transform: translate3d(-100%, 0, 0);  visibility: hidden; transition-duration: ${(props.duration)?props.duration:duration_init}s; `,


    }

    modes1_zoom={

        'zoom-out': css`
          animation: zoomIN  ease ;
            // animation-delay: ${(props.delay)?props.delay+'s':'0s'};
          animation-duration: ${(props.duration)?props.duration:duration_init}s;

          @keyframes zoomIN {
            0% {
              transform: scale(1.6, 1.6);
            }
            50% {
              transform: scale( .5,  .5);
            }
            100% {
              transform: scale(  1,   1);
            }
          }
        `,

        'zoom-in': css` opacity:1;

          animation: zoomOUT  ease ;
            // animation-delay: ${(props.delay)?props.delay+'s':'0s'};
          animation-duration: ${(props.duration)?props.duration:duration_init}s;

          @keyframes zoomOUT {
            0% {
              transform: scale(.6, .6);
            }
            50% {
              transform: scale(1.5, 1.5);
            }
            100% {
              transform: scale(1, 1);
            }
          }

        `,

    }



    const is_fade = (-1!==props.mode.indexOf('fade'))
    const is_zoom = (-1!==props.mode.indexOf('zoom'))
    const is_slide = (-1!==props.mode.indexOf('slide'))

    if(props.mode && (''!==props.mode)){
        switch (true) {
            case (is_slide): {
                css1_work = modes0_slide[props.mode]
                css0_work = css00_slide
                break;
            }
            case (is_fade): {
                css0_work = modes0_fade[props.mode]
                css1_work = css1_fade_visible
                break;
            }
            case (is_zoom): {
                if('zoom-in'===props.mode) {
                    css1_work = modes1_zoom[props.mode]
                    css0_work = css0_zoom_in_start
                }
                if('zoom-out'===props.mode) {
                    css1_work = modes1_zoom[props.mode]
                    css0_work = css0_zoom_out_start
                }
                break;
            }
            default:{
                console.error('=== no props.mode in the AppearIt')
                css0_work = modes0_fade['fade-up']
                css1_work=css1_fade_visible
            }
        }
    }
    else{
        css0_work = modes0_fade['fade-up']
        css1_work=css1_fade_visible
    }

    console.log('=== css0_work ',css0_work)
    console.log('=== css1_work ',css1_work)


    const domRef:any = useRef();

    const [state, set_state] = useState({
        do_visible: false,
        xy_data_div1:{height:0},
    });

    useEffect(() => {

        const observer = new IntersectionObserver(entries => {

            // In your case there's only one element to observe:
            if (entries[0].isIntersecting) {

                console.log('=== do_visible = true ')
                // Not possible to set it back to false like this:
                    setTimeout(()=>{
                        set_state((prev_state: any) => {return {...prev_state,
                            do_visible: true,
                        }})
                    },(props.delay)?props.delay:0)

                // No need to keep observing:
                if(undefined!==domRef.current) {
                    if(props.once) {
                        observer.unobserve(domRef.current);
                    }
                }
            } else {
                if(!props.once) {
                    set_state((prev_state: any) => {
                        return {
                            ...prev_state,
                            do_visible: false,

                        }
                    })
                }            }
        });

        if(undefined!==domRef.current)
            observer.observe(domRef.current);


        return () => observer.disconnect();
    }, []);


    useEffect(() => {

        let tdata:any = {}
        const current1 = domRef?.current
        console.log('=== current domRef1',current1)
        if(current1) {
            tdata = {...tdata, ...{...JSON.parse(JSON.stringify(current1?.getBoundingClientRect()))}}
            tdata.y1=tdata.y
            tdata.x1=tdata.x
            console.log('=== tdata 111',tdata)
            set_state((prev_state: any) => {return {...prev_state,
                xy_data_div1:tdata,
            }})

        }

        return () => {};
    }, [JSON.stringify(domRef?.current?.getBoundingClientRect())]);


    return(<>
        {(is_slide) ?
            //.box
            <div id='xy_data_div1' css={css` 
                  overflow: hidden;
                  ${(0!==state.xy_data_div1.height)?' height:'+state.xy_data_div1.height+'px ':''}
                `}
                 ref={domRef}
            >
                <div
                    css={css` width: max-content; height: max-content; ${(state.do_visible) ? css1_work : css0_work} `}
                >
                    {props?.children}
                </div>
            </div> : null}

        {(is_fade) ?
            <div ref={domRef}
                 css={css` width: 100%; height: max-content; ${(state.do_visible) ? css1_work : css0_work} `}
            >
                {props?.children}
            </div>
            : (is_zoom) ?
                <div ref={domRef}
                     css={css` width: max-content; height: max-content; ${(state.do_visible) ? css1_work : css0_work} `}
                >
                    {props?.children}
                </div> : null
        }

    </>)
}
export default AppearIt

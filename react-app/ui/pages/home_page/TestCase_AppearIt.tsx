
/** @jsxImportSource @emotion/react */

import AppearIt from "./inner/AppearIt";
import {css} from "@emotion/react";
import React from "react";


const TestCase_AppearIt = () => {
  return(<>

        <AppearIt mode='slide-down' duration={1} >
            {/*box_height={50}*/}
            <div css={css` width:200px; height: 55px; background-color: sandybrown `}>
                AppearIt slide-down
            </div>
        </AppearIt>
        <br/><br/>

        {/*<AppearIt mode='slide-up' duration={1} > // box_height={50}*/}
        {/*    <div css={css` width:200px; height: 55px; background-color: sandybrown `}>*/}
        {/*        AppearIt slide-up*/}
        {/*    </div>*/}
        {/*</AppearIt>*/}
        {/*<br/><br/>*/}

        {/*<AppearIt mode='fade-up' duration={1}*/}
        {/*>*/}
        {/*    <div css={css` width:200px; height: 50px; background-color: sandybrown `}>*/}
        {/*        AppearIt slide-up*/}
        {/*    </div>*/}
        {/*</AppearIt>*/}
        {/*<br/>*/}
        {/*<br/>*/}

        {/*<AppearIt mode='fade-up' duration={1} >*/}
        {/*    <div css={css` width:200px; height: 50px; background-color: cyan `}>*/}
        {/*        AppearIt fade-up*/}
        {/*    </div>*/}
        {/*</AppearIt>*/}
        {/*<br/>*/}
        {/*<br/>*/}

        {/*<AppearIt mode='fade-down' duration={1} >*/}
        {/*    <div css={css` width:200px; height: 50px; background-color: red `}>*/}
        {/*        AppearIt fade-down*/}
        {/*    </div>*/}
        {/*</AppearIt>*/}


        {/*<br/>*/}
        {/*<br/>*/}

        {/*<AppearIt mode='zoom-out' duration={2} delay={0}  >*/}
        {/*    /!*<div css={css` width:200px; height: 50px; background-color: black `}>*!/*/}
        {/*    <div css={css` font-size: 50px `}>*/}
        {/*        ZOOM111 out*/}
        {/*    </div>*/}
        {/*</AppearIt>*/}

        {/*<AppearIt mode='zoom-in' duration={2} delay={0}  >*/}
        {/*    <div css={css` font-size: 50px `}>*/}
        {/*        ZOOM222 in*/}
        {/*    </div>*/}
        {/*</AppearIt>*/}

        <br/>
        <div css={css` font-size: 50px `}>
            ==========
        </div>


    </>
  )
}

export default TestCase_AppearIt

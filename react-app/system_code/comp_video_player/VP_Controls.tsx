

import React, {useEffect, useState} from "react";

import {Box, IconButton, Slider, Stack, styled, Typography} from "@mui/material";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";

import {
    VolumeOff,

    FullscreenRounded,
    VolumeDownRounded,
    VolumeUpRounded,
    VolumeUp
} from '@mui/icons-material';
import {toHHMMSS} from "../code_global/GlobalFunctions";
import {
    tw_col_center,
    tw_no_wrap,
    tw_row_between,
    tw_row_center,
    tw_row_center_basic,
    tw_row_left, tw_row_left_basic
} from "../tw/tw_tools";
import FullScreenToggler from "./atoms/FullScreenToggler";
import ButtonPlayVideo from "./atoms/ButtonPlayVideo";
import ButtonFullScreen from "./atoms/ButtonFullScreen";
import ButtonVolumeOnOff from "./atoms/ButtonVolumeOnOff";
import SliderVolumeVideo from "./atoms/SliderVolumeVideo";
import SliderProgress from "./atoms/SliderProgress";
import TextTimeVideo from "./atoms/TextTimeVideo";
import ButtonSettingsVideo from "./atoms/ButtonSettingsVideo";

const VP_Controls = (props:any) => {

  return(
      <div
          ref={props.ref_controls}
      >

          <SliderProgress {...props} />

          <Stack direction="row" justifyContent="space-between" alignItems="center"
                 // sx={{width:'100%'}}
          >

              <Stack id={'colleft'}  direction="row" justifyContent="start" alignItems="center">

                <ButtonPlayVideo {...props} />

                <ButtonVolumeOnOff {...props} />

                <SliderVolumeVideo  {...props} />

                <TextTimeVideo {...props} />

              </Stack>

              <Stack id={'colright'} direction="row" justifyContent="end" alignItems="center">
                  <ButtonSettingsVideo {...props} />
                  <ButtonFullScreen {...props} />
              </Stack>

          </Stack>

      </div>)
}
export default  VP_Controls

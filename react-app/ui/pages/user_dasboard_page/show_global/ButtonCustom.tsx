
import {Button, PaletteColorOptions} from "@mui/material";
import React from "react";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/styles";



const ButtonCustom = (props:any) => {
  return(
          <Button {...props}>
              {props.children}
          </Button>
  )
}

export default ButtonCustom

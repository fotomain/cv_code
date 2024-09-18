

import {Button, FormControlLabel, Grid, Stack} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {useState} from "react";

const VP_Settings = (props:any) => {

    const initState= {

        auto_hide_controls: props.auto_hide_controls,

    }
    const [state, set_state] = useState(initState);

        return (<>
            <Grid container direction="column" justifyContent={'spacebetween'} alignItems="center"
                  spacing={2}
                   sx={{
                       width:'100%',
                       backgroundColor:'peach',
                   }}
            >
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="auto_hide_controls"
                                checked={state.auto_hide_controls}
                                onChange={(event, checked)=>
                                    set_state((prev_state: any) => {
                                        return {
                                            ...prev_state,
                                            auto_hide_controls: checked
                                        }
                                    })
                                }
                                // onClick={set_state}
                            />
                        }
                        label="Auto hide controls"/>
                </Grid>

                <Grid item id={'buttons1'} width={'100%'} >
                <Stack direction="row" justifyContent={'end'} alignItems="center"
                       width={'100%'}
                       sx={{
                           width:'100%',
                           // backgroundColor:'pink',
                        }}
                >
                    <Button
                        variant={'text'}
                        onClick={() =>{

                            props.set_state((prev_state: any) => {
                                return {
                                    ...prev_state,
                                    open_player_settings:false,
                                }
                            })

                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant={'contained'}
                        onClick={() =>{

                            props.set_state((prev_state: any) => {
                                return {
                                    ...prev_state,
                                    open_player_settings:false,
                                    ...state,

                                }
                            })

                        }}
                    >
                        Ok
                    </Button>
                </Stack>
                </Grid>

            </Grid>
            </>)

}

export default VP_Settings

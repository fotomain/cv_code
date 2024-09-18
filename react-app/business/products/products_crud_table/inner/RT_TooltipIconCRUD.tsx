
import {Tooltip} from "@mui/material";
// import Fade from "@mui/material/Fade";

const RT_TooltipIconCRUD = (props:any) => {
    const {title,...rest_props} = props
  return(
      <Tooltip
          title={title}
          placement="top-end"
          arrow
          // followCursor
          // TransitionComponent={Fade}
          // TransitionProps={{ timeout: 600 }}
          enterDelay={500}
          leaveDelay={200}

          slotProps={{
              popper: {
                  modifiers: [
                      {
                          name: 'offset',
                          options: {
                              offset: [28, -20],
                          },
                      },
                  ],
              },
          }}

          {...rest_props}
      >
          {/*=== p => for disabled */}
          <p>
          {props.children}
          </p>
      </Tooltip>
  )
}

export default RT_TooltipIconCRUD

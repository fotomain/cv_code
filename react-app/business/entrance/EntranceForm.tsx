

import React from "react";

import SignInOrSignUpForm from "./SignInOrSignUpForm";

// https://codesandbox.io/s/mui-tabs-t8bog?file=/src/App.js:437-708

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import {Tabs} from "@mui/material";
import {is_empty} from "../../system_code/code_global/GlobalFunctions";
import {useTheme} from "@mui/styles";

interface TabPanelProps {
  children?: React.ReactNode;
  what_index_show: number;
  current_index: number;
}

const EntranceForm = () => {

  const [tab_number, set_tab_number] = React.useState(0);


  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    set_tab_number(newValue);

  };

  function TabFormContainer(props: TabPanelProps) {
    const { children, current_index, what_index_show, ...props_rest } = props;

    return (
        <div
            role="tabpanel"
            hidden={current_index !== what_index_show}
            id={`simple-tabpanel-${what_index_show}`}
            aria-labelledby={`simple-tab-${what_index_show}`}
            {...props_rest}
        >
          {current_index === what_index_show && (
              <Box sx={{ p: 0 }}>
                <div>{children}</div>
              </Box>
          )}
        </div>
    );
  }

  function TabProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,

    };
  }

  const theme = useTheme()
  let style_form={}
  if(!is_empty(theme)){
    style_form={backgroundColor:theme?.palette?.background?.default}
  }

  return (
    <div id='div_EntranceForm' className="relative bg-white-main w-full overflow-hidden flex flex-col items-center justify-start py-5 px-0 box-border min-w-[360px] text-left text-5xl text-c-main-black font-f-menu-disktop"
         style={{...style_form}}
    >

              {/*===DOC https://codesandbox.io/s/trxs6g?file=/Demo.tsx:718-851*/}
              <Box sx={{ width: 'auto', borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab_number} aria-label="basic tabs example"
                      onChange={handleChange}
                >
                  <Tab label="Sign In" {...TabProps(0)} sx={{width: '50%'}} />
                  <Tab label="Sign Up" {...TabProps(1)} sx={{width: '50%'}} />
                </Tabs>
                <div className="mt-[20px]" >
                  <TabFormContainer current_index={tab_number} what_index_show={0}>
                    <SignInOrSignUpForm
                        entrance_mode='sign_in_mode'
                    />
                  </TabFormContainer>
                  <TabFormContainer current_index={tab_number} what_index_show={1}>
                    <SignInOrSignUpForm
                        entrance_mode='sign_up_mode'
                    />
                  </TabFormContainer>
                </div>
              </Box>

    </div>
  );
};

export default EntranceForm;

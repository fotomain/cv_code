import React from "react";
import Box from "@mui/material/Box";


import UserOrders from "./user_orders/UserOrders";
import UserProfile2 from "./user_profile/UserProfile2";
import WooProductsAdminPage from "../../../business/products/WooProductsAdminPage/WooProductsAdminPage";

interface TabPanelProps {
  children?: React.ReactNode;
  what_index_show: number;
  current_index: number;
}

const TabFormContainer = (props: TabPanelProps) => {
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
            <Box
                sx={{ p: 0 }}
            >
              <div>{children}</div>
            </Box>
        )}
      </div>
  );
}

const UserDasboardCustomPages = (props:any) => {

  console.log('=== props.tab_active_number ',props.tab_active_number)

  return(<>

    <TabFormContainer current_index={props.tab_active_number} what_index_show={0}>
      <UserOrders />
    </TabFormContainer>
    <TabFormContainer current_index={props.tab_active_number} what_index_show={1}>
      <UserProfile2 />
    </TabFormContainer>
    <TabFormContainer current_index={props.tab_active_number} what_index_show={2}>
      Settings
    </TabFormContainer>
    {/*<TabFormContainer current_index={props.tab_active_number} what_index_show={4}>*/}

    {/*</TabFormContainer>*/}


  </>)
}

export default UserDasboardCustomPages

import React from "react";
import {tw_col_center, tw_row_center} from "../../../../system_code/tw/tw_tools";



const FlexTests = () => {

    return(
        <div className={tw_row_center}>
                Flex tests
                <div className={tw_col_center+' p-[4px] bg-yellow-100 '}>

                    {/*<textarea className={' overflow-scroll scroll-auto '}>Data 111 Data 111 Data 111 Data 111 Data 111 Data 111</textarea>*/}
                    <div className={' text-overflow overflow-hidden whitespace-nowrap '}>Data 11</div>
                    <div className={' text-overflow overflow-hidden whitespace-nowrap '}>Data 2222</div>
                    <div className={' text-wrap '}>Data 333333</div>
                </div>
                <div className={tw_col_center+' p-[4px] bg-green-100 '}>
                    <div className={tw_row_center+' bg-green-100 flex-wrap gap-[5px]'}>
                        <div>Data 9</div>

                        <div>Data 9</div>

                        <div>Data 9</div>
                    </div>
                </div>
            </div>

    )
};

export default FlexTests


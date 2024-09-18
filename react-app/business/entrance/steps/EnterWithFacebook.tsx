
import React from "react";

const EnterWithFacebook = (props:any) => {


    {/*============== facebook_button*/}
    {/*===DOC https://about.twitter.com/en/who-we-are/brand-toolkit*/}


    return (
      <div className=" flex flex-row items-center justify-center
            hover:cursor-pointer
          "
           onMouseEnter={(e)=> {

               // in_state('on_hover_google',true)

           }}
           onMouseLeave={(e)=> {

               // in_state('on_hover_google',false)

           }}

      >


          <div className=" flex flex-row items-center justify-center
            hover:cursor-pointer
          ">

              <img
                  {...props}
                  className={"w-auto h-[35px]"}
                  alt=""
                  src={"/images_is/Facebook_Logo_Primary.png"}
              />

          </div>


      </div>
  );
};

export default EnterWithFacebook

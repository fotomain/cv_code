import { FunctionComponent } from "react";

const ProfileImage: FunctionComponent = () => {
  return (
    <div className="overflow-hidden flex flex-row items-center justify-start
        pt-[15px]
        md:pt-[50px]
        px-[30px] pb-0 box-border max-w-[350px] max-h-[250px]
    ">
        <div className={'md:flex sm:hidden xs:hidden'}>
          <img
            className="rounded-[50%] relative
                w-[200px] h-[200px] object-cover"
            alt=""
            src="/user_dashboard/image-6@2x.png"
          />
        </div>
        <div className={'2xl:hidden xl:hidden lg:hidden md:hidden sm:flex xs:flex'}>
            <img
                className="rounded-[50%] relative
                    w-[50px] h-[50px] object-cover"
                alt=""
                src="/user_dashboard/image-6@2x.png"
            />
        </div>
    </div>
  );
};

export default ProfileImage;

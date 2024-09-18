
const Spacer = (props:any) => {

  const {id,data,...props_rest} = props

  return (

        // id='use_desktop_mode'
        <div
            id={id}
            className={'  '+data}
            {...props_rest}
            // align-self-start
             // style={{
             //   alignSelf:'flex-start'
             // }}
        >
        </div>

  );
};

export default Spacer;

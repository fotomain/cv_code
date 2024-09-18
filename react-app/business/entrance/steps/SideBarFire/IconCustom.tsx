
//rsi

import React from 'react';

//=== DOC
//=== DOC https://github.com/google/material-design-icons
// GO https://fonts.google.com/icons
// SEARCH admin
// !!! copy name from android

const IconCustom = (props:any) => {


    const IconLocal = props.children
    const type_of_icon = typeof IconLocal

    return(
        <>
            {!('string' === type_of_icon) ? '' :
                <i style={
                    {...props.style,
                     ...{

                    }}
                 }
                    className='material-icons'
                >
                    {props.children}
                </i>
            }

            {(props.children && 'string' === type_of_icon) ? '' :
                <IconLocal
                    style={
                        {...props.style,
                            ...{


                            }}
                    }
                />
            }

        </>
    )
};


export default IconCustom

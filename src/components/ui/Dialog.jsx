import React, {forwardRef} from 'react';

const Dialog = forwardRef((props, ref) => {
   return <dialog ref={ref} className='rounded-md w-1/2 min-w-[600px] p-6' {...props}/>
});

export default Dialog;
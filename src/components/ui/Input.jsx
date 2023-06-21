import React from 'react';
import {cva} from "class-variance-authority";
import {cn} from "../../helpers/cn";

const inputVariants = cva(
   'p-2 rounded-md bg-slate-200 w-full outline-slate-300',
   {
      variants: {
         marginTop: {
            default: 'mt-4',
            none: ''
         }
      }
   },
   {
      default: {
         marginTop: 'default'
      }
   }
)
const Input = ({marginTop, className, ...props}) => {
   return (
      <input
         type="text"
         className={cn(inputVariants({marginTop: marginTop || 'default', className}))}
         {...props}
      />
   );
};

export default Input;
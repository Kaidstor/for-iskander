import React from 'react';
import {cva} from "class-variance-authority";
import {cn} from "../../helpers/cn";


export const buttonVariants = cva(
   'p-2 rounded-md bg-slate-200 hover:bg-slate-300 focus:outline focus:outline-2 outline-slate-500'
)

const Button = ({className, ...props}) => {
   return (
      <button className={cn(buttonVariants({className}))} {...props} />
   );
};

export default Button;
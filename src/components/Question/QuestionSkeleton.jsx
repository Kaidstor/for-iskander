import React from 'react';

const QuestionSkeleton = ({className, ...props}) => {
   return (
      <div className={ `${className} text-center border-2 border-slate-400 border-dashed mt-2 p-1 rounded-xl`} {...props}/>
   );
};

export default QuestionSkeleton;
import React from 'react';
import {PolarArea} from "react-chartjs-2";
import {data as chartData, options, saveChart} from '../helpers/chartHelpers'
import {useQuery} from "@tanstack/react-query";
import {getNextQuestion} from "../http/questionsApi";
const Index = () => {

   const {data, isLoading} = useQuery({queryKey: ['question'], queryFn: getNextQuestion})

   return (
      <>
         {isLoading ?
            'Loading'
            :
            data ?
               <div>{data.id}</div>
               :
               <div>no questions</div>
         }
         <div className='w-full h-full flex justify-center items-center'>
            <div className='w-1/4'>
               <PolarArea onClick={e => saveChart(e)} options={options} data={chartData}/>
            </div>
         </div>
      </>
   );
};

export default Index;
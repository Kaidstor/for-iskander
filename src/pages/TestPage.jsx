import React, {useRef} from 'react';
import {PolarArea} from "react-chartjs-2";
import {data4 as chartData, options, saveChart} from '../helpers/chartHelpers'
import QuestionBlock from "../components/Question/QuestionBlock";

const TestPage = () => {
   // const {data, isLoading} = useQuery({queryKey: ['getChart'], cacheTime: 0, queryFn: getChartData, refetchOnWindowFocus: false})
   const chartRef = useRef(null)

   return (
      <>
         <div className='p-4 flex flex-col justify-center items-center gap-6'>
            <QuestionBlock className='w-full h-fit' chartRef={chartRef}/>
         </div>


         <div className='relative w-full h-[400px] '>
            <PolarArea onClick={e => saveChart(e)} options={options} data={chartData} ref={chartRef}/>
         </div>
      </>
   );
};

export default TestPage;


// <div className="h-[200px]"></div>
// <div className='relative w-full h-[600px]'>
//    {
//       <PolarArea onClick={e => saveChart(e)} options={options} data={chartData2} ref={chartRef}/>
//    }
// </div>
// <div className="h-[200px]"></div>
// <div className='relative w-full h-[600px]'>
//    {
//       <PolarArea onClick={e => saveChart(e)} options={options} data={chartData3} ref={chartRef}/>
//    }
// </div>
// <div className="h-[200px]"></div>
// <div className='relative w-full h-[600px]'>
//    {
//       <PolarArea onClick={e => saveChart(e)} options={options} data={chartData4} ref={chartRef}/>
//    }
// </div>
// <div className="h-[200px]"></div>
import React from 'react';
import Button from "../ui/Button";
import {getNextQuestion} from "../../http/questionsApi";
import {useQuery} from "@tanstack/react-query";
import {getCategories} from "../../http/categoryApi";

const QuestionBlock = ({className, chartRef}) => {
   const {data: question, isLoading} = useQuery({queryKey: ['question'], queryFn: getNextQuestion})

   function getBgColors(values){
      for(const value of values){

      }
   }
   function updateChart(chartData) {
      chartRef.current.resize()
      chartRef.current.config.data.datasets[0].data = chartData[1]
      chartRef.current.config.data.labels = chartData[0]
      chartRef.current.config.data.datasets[0].backgroundColor = ['#00800080', '#FF000030']
      console.log(chartRef.current.config.data.datasets[0].data)
      chartRef.current.update()
   }

   async function answer(value) {
      // await answerTheQuestion(question.id, question.categoryId, 1).then(d => console.log(d))
      // chartRef.current.config.data.datasets[0].backgroundColor = [1, 2, 3, 4]
      const categoriesTemp = await getCategories()
      const categories = new Map(categoriesTemp)

      const answers = {"1": [["3", 0.2]], "-1": [["2", 1], ["2", 1]]}
      const chartData = [[], []]
      for (let cat of categories) {
         if (answers.hasOwnProperty(cat[0])) {
            const sum = answers[cat[0]].reduce((acc, el) => acc + el[1], 0)
            chartData[0].push(cat[1])
            chartData[1].push(sum)
         }
      }

      updateChart(chartData)
   }

   return (
      <div className={className}>
         {isLoading ?
            'Loading'
            :
            question ?
               <div className='flex flex-col gap-2 items-start'>
                  <p className='text-xl text-justify mb-4'>{question.text || 'No text, please report this to developer'}</p>
                  <div className='flex items-center'><p className='w-[20px]'>1.</p><Button onClick={() => answer(1)}>Да</Button></div>
                  <div className='flex items-center'><p className='w-[20px]'>2.</p><Button onClick={() => answer(0)}>Нет</Button></div>
                  <div className='flex items-center'><p className='w-[20px]'>3.</p><Button onClick={() => answer(0.2)}>Не знаю</Button></div>
               </div>
               :
               <div>no questions</div>
         }
      </div>
   );
};

export default QuestionBlock;
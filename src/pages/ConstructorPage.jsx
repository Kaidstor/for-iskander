import React, {useEffect, useReducer, useRef, useState} from 'react';
import {PolarArea} from "react-chartjs-2";
import {saveChart} from "../helpers/chartHelpers";
import {NavLink} from "react-router-dom";

const options = {
   responsive: true,
   aspectRatio: false,
   plugins: {
      legend: {
         display: false,
         position: 'top',
      },
      title: {
         display: true,
         text: 'test'
      }
   },
   scales: {
      r: {
         grid: {
            z: 10,
            lineWidth: 1,
            color: '#b3b3b3'
         },
         ticks: {
            font: {
               size: 10
            },
           z: 20, backdropColor: '#ffffff90',
         },
         min: 0,
         max: 100,
         pointLabels: {
            display: true,
            centerPointLabels: true,
            font: {
               size: 12,
               weight:600
            }
         },
         z: 3
      }
   },
}
export const data = {
   labels: [],
   datasets: [
      {
         label: 'Оценка',
         data: [],
         backgroundColor: [],
         borderWidth: 1,
         borderColor: 'black',
         borderDashOffset: 1
      },
   ],
};


// Требования к организационно-распорядительным документам по безопасности значимых объектов
// Требования к силам обеспечения безопасности значимых объектов КИИ
// Ограничение доступов
// Защита информационной ИС и ее компонентов


   function reducer(state, {action, data}) {
   console.log(action, data)
   if (action === 'update_count'){
      const leavesCount = Object.keys(state || []).length
      try{
         if (data.count > leavesCount){
            if (!leavesCount){
               for (const index in [...Array(data.count).keys()])
                  state[`leaf_${index}`] = [`name_${index}`, 0]

               return state
            }
            const next_leaf_index = Object.keys(state).length

            const addState = {}
            for (const index in [...Array(data.count - leavesCount).keys()])
               addState[`leaf_${next_leaf_index + +index}`] = [`name_${next_leaf_index + +index}`, 0]

            return {
               ...state,
               ...addState
            }
         }
         else {
            if (data.count === 0) return {}
            const newState = {}

            for (const index in [...Array(data.count).keys()])
               newState[`leaf_${index}`] = [`name_${index}`, 0]

            return newState
         }
      }
      catch (e){
         console.log(e.message)
         return {}
      }
   }
   else if(action === 'update_name'){
      const leaf = `leaf_${data.leaf_index}`
      const leaf_percent = state[leaf][1]
      return {
         ...state,
         [leaf]: [data.value, leaf_percent]
      }
   }
   else if(action === 'update_percent'){
      try{
         const leaf = `leaf_${data.leaf_index}`
         const leaf_name = state[leaf][0]
         return {
            ...state,
            [leaf]: [leaf_name, data.value]
         }
      }
      catch (e) {
         console.log('error updating')
      }
   }
}
function numberToColorHsl(i, color = 240) {
   //value from 0 to 1
   const value = 1 - (1 - i)
   var hue=(value*color).toString(10);
   return ["hsl(",hue,",90%,70%)"].join("");
}

const ConstructorPage = () => {
   const [leaves, setLeaves] = useState(0)
   const [color, setColor] = useState(0)
   const chartRef = useRef(null)
   const [inputs, dispatch] = useReducer(reducer, {})

   useEffect(() => {
      const data = []
      const labels = []
      const colors = []

      Object.keys(inputs).forEach(key => {
         labels.push(inputs[key][0])
         data.push(inputs[key][1])
      })

      for (const d in data)
         colors.push(numberToColorHsl(+data[d] / 100, color * 5))

      chartRef.current.config.data.datasets[0].data = data
      chartRef.current.config.data.labels = labels
      chartRef.current.config.data.datasets[0].backgroundColor = colors
      chartRef.current.update()
   }, [inputs, color])

   return (
      <>
         <header className='mx-auto mt-8 w-fit'>
            <NavLink className='px-4 py-2' style={({isActive}) => isActive ? {textDecoration: 'underline'} : {}} to='/create'>Вопросы</NavLink>
            <NavLink className='px-4 py-2' style={({isActive}) => isActive ? {textDecoration: 'underline'} : {}} to='/test'>Тест</NavLink>
            <NavLink className='px-4 py-2' style={({isActive}) => isActive ? {textDecoration: 'underline'} : {}} to='/constructor'>Конструктор отчётов</NavLink>
         </header>
         <div className='relative w-full flex flex-col max-w-7xl mx-auto h-[550px]'>
            <div className='w-1/2 my-12 gap-2 flex flex-col max-w-7xl mx-auto items-center'>
               <input
                  className='w-[300px] border-2 border-gray-200'
                  type="text"
                  value={leaves}
                  placeholder='Введите кол-во групп'
                  onChange={e => {
                     setLeaves(e.target.value)
                     dispatch({
                        action: 'update_count',
                        data: {count: +e.target.value || 0}
                     })
                  }}
               />
               <input
                  className='w-[300px]'
                  type="range"
                  min={0}
                  max={120}
                  value={color}
                  onChange={e => {
                     setColor(e.target.value)
                  }}
               />
               {
                  [...Array(+leaves || 0).keys()].map(el =>
                     <div key={el} className='flex items-center gap-4'>
                        <input type="text" onChange={(e) => {
                           dispatch({
                              action: 'update_name',
                              data: {
                                 leaf_index: el,
                                 value: e.target.value
                              }
                           })
                        }}/>
                        <input type="range" value={inputs?.[`leaf_${el}`]?.[1] || 0} min={0} max={100} onChange={(e) => {
                           dispatch({
                              action: 'update_percent',
                              data: {
                                 leaf_index: el,
                                 value: e.target.value
                              }
                           })
                        }}/>
                        <div className='w-[50px]'>{inputs?.[`leaf_${el}`]?.[1] || 0} %</div>
                     </div>
                  )
               }
               {/*{JSON.stringify(inputs)}*/}
            </div>

            <div className='w-full min-h-[900px] my-auto'>
               <PolarArea
                  onClick={e => saveChart(e)}
                  options={options}
                  data={data}
                  ref={chartRef}
               />
            </div>
         </div>
      </>

   );
};

export default ConstructorPage;
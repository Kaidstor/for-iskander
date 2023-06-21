import React, {useContext, useState} from 'react';
import {CategoryContext} from "../../context/CategoryContext";
import {questionCategoryUpdate} from "../../http/questionsApi";
import QuestionSkeleton from "./QuestionSkeleton";
import {QuestionsHeadContext, QuestionsHeadLevelContext} from "../../context/QuestionsHeadContext";
import {sortQuestions} from "./helpers/utils";
import QuestionWithChildren from "./QuestionWithChildren";

const QuestionItem = ({question}) => {
   const [category, setCategory] = useState(question.categoryId || '')
   const headLevel = useContext(QuestionsHeadLevelContext)
   const categories = useContext(CategoryContext)
   const heads = useContext(QuestionsHeadContext)
   const isGroup = question.type === 'group'

   function setActive(element, on= false){
      element.classList.remove(on ? 'bg-blue-100' : 'bg-slate-600')
      element.classList.remove(on ? 'text-slate-600' : 'text-blue-100')

      element.classList.add(on ? 'bg-slate-600' : 'bg-blue-100')
      element.classList.add(on ? 'text-blue-100' : 'text-slate-600')
   }

   const [conditions, setConditions] = useState(question.answers ?? [
      ['да', 1],
      ['нет', 0],
      ['не знаю', 0.2]
   ])

      return (
      <>
         {question.index !== 1 &&
            <QuestionSkeleton className='question__item_over'>
               Вставить между вопросами #{question.index} и предыдущим
            </QuestionSkeleton>
         }

         <div
            className='question__main bg-slate-200 p-2 rounded-xl flex gap-4 items-center justify-between hover:bg-slate-300'
            data-id={question.id}
            data-index={question.index}
            data-head={question.headId}
            data-headlevel={headLevel}
         >
            {/*<p className='text-justify'>#{question.index} | #{question.id} | {question.text}</p>*/}
            <p className='text-justify'>#{question.index} | {question.text}</p>
            <div className='flex gap-2 '>

               <div className='flex gap-2'>
                  {
                     heads[question.id]?.length > 0 && conditions.map((el, i) =>
                        <div
                           className={`conditions-${question.id} question__condition cursor-pointer whitespace-nowrap bg-white p-1 rounded-md nav_link_main_outline`}
                           key={i}
                           onClick={e => {
                              if (e.target.classList.contains('bg-blue-100')){
                                 document.querySelectorAll(`[data-head="${question.id}"]`).forEach(el => {
                                    if(!el.classList.contains('question__main')) {
                                       el.classList.add('hidden')
                                       el.parentNode.classList.add('hidden')
                                    }
                                 })
                                 console.log(e.target)
                                 setActive(e.target, true)
                              }
                              else{
                                 document.querySelectorAll(`.conditions-${question.id}`).forEach(el => {
                                    setActive(el, true)
                                    el.parentNode.classList.remove('hidden')
                                 })

                                 e.target.parentNode.classList.remove('hidden')
                                 setActive(e.target)

                                 document.querySelectorAll(`[data-head="${question.id}"]`).forEach(el => {
                                    // console.log()
                                    if(!el.classList.contains('question__main')) {
                                       if (el.dataset.headcondition == i) el.classList.remove('hidden')
                                       else el.classList.add('hidden')

                                       el.parentNode.classList.remove('hidden')
                                    }
                                 })
                              }
                           }}>
                           {el[0]}
                        </div>
                     )
                  }
               </div>

               <select
                  className='rounded-md ml-2 border-gray-300 border-[2px] h-[35px] px-1'
                  name="category"
                  value={category}
                  onChange={e => {
                     const value = e.target.value
                     questionCategoryUpdate(question.id, e.target.value)
                        .then(d => d[0] === 1 && setCategory(value))
                  }}
               >
                  <option value="-1">Нет категории</option>
                  {categories?.map(el => <option key={el.id} value={el.id}>{el.name}</option>)}
               </select>
            </div>
         </div>

         <div className='flex'>
            {
               conditions?.map((el, i) =>
                  <QuestionSkeleton className='question__item_sub ml-4' data-conditionid={i} key={i}>Вопрос #{question.id}, ответ: {el}</QuestionSkeleton>
               )
            }
         </div>

         <QuestionSkeleton className='question__item_under'>Добавить под вопросом #{question.index}</QuestionSkeleton>
         {
            heads[question.id] &&
            <QuestionsHeadLevelContext.Provider value={headLevel + 1}>
               <div className={'ml-6 mt-2 question_sub flex flex-col gap-2 ' + (!isGroup && 'hidden')}>
                  {
                     heads[question.id].sort(sortQuestions)?.map(questionChild => <QuestionWithChildren
                        key={questionChild.id}
                        className={!isGroup && 'hidden'}
                        question={questionChild}
                     />)
                  }
               </div>
            </QuestionsHeadLevelContext.Provider>
         }
      </>
   )
};

export default QuestionItem;
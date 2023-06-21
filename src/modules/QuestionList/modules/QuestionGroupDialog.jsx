import React, {forwardRef, useState} from 'react';
import Button, {buttonVariants} from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import {useQuery} from "@tanstack/react-query";
import {createQuestionsGroups, getQuestionsGroups} from "../../../http/questionsApi";

const titles = {
   merge: 'Объединить по условию',
   add: 'Добавить в существующую',
   new: 'Создать новую'
}

const QuestionGroupDialog = forwardRef(({questions, refetch}, ref) => {
   const {data} = useQuery({
      queryKey: ['questionsGroups'],
      queryFn: getQuestionsGroups
   })

   const [name, setName] = useState('')
   const [tab, setTab] = useState(null)

   function addGroup(){
      const preparedQuestions = new Map()
      for(const question of questions.current){
         const headLvl = question.dataset.headlevel
         if (preparedQuestions.has(headLvl))
            preparedQuestions.set(headLvl, [...preparedQuestions.get(headLvl), [question.dataset.id, question.dataset.index]])
         else preparedQuestions.set(headLvl, [[question.dataset.id, question.dataset.index]])
      }
      for(let i = 0; i < 100; i++){ // TODO sort and get lower headId for group
         const index = String(i)
         if (preparedQuestions.has(index)) {
            createQuestionsGroups(name, preparedQuestions.get(index)).then(d => {
               if (d.message === 'ok')
                  setTab(null)
                  closeDialog()
                  refetch()
            })
            break
         }
      }
   }

   function closeDialog() {
      ref.current.close()
      questions.current.forEach(el => el.classList.remove('active'))
      questions.current = null
   }

   return (
      <dialog ref={ref} className='rounded-xl relative'>
         <p className='text-xl text-center'>{!tab ? "Группа" : titles[tab]}</p>

         {
            !tab ?
               <div className='flex flex-col mt-4 gap-4'>
                  <Button onClick={() => setTab('merge')}>Объединить по условию</Button>
                  {data && <Button onClick={() => setTab('add')}>Добавить в существующую</Button>}
                  <Button onClick={() => setTab('new')}>Создать новую</Button>
                  <Button onClick={() => closeDialog()}>Отмена</Button>
               </div>
               :
               <>
                  {
                     tab === 'merge' &&
                     <div className='mt-4'>
                        <div className='mt-1 flex gap-4 items-center justify-center'>
                           <Button onClick={() => setTab(null)}
                                   className='w-[40px] h-[40px] rounded-full button__back'></Button>
                           <Button className='w-[40px] h-[40px] rounded-full'>1</Button>
                           <Button className='w-[40px] h-[40px] rounded-full'>2</Button>
                           <Button className='w-[40px] h-[40px] rounded-full'>3</Button>
                           <Button className='w-[40px] h-[40px] rounded-full'>4</Button>
                        </div>
                     </div>
                  }
                  {
                     tab === 'add' &&
                     <div className='mt-2'>
                        <div className='flex justify-between mt-2'>
                           <Button>Добавить</Button>
                           <Button onClick={() => setTab(null)}>Назад</Button>
                        </div>
                        <select className={buttonVariants({className: 'w-full'})}>
                           {data.map(el => <option value={el.id} key={el.id}>{el.text}</option>)}
                        </select>
                     </div>
                  }

                  {
                     tab === 'new' &&
                     <>
                        <div className='mt-4'>
                           <Input className='mt-1 w-[300px]' value={name} onChange={e => setName(e.target.value)}/>
                        </div>

                        <div className='mt-4 flex justify-between'>
                           <Button onClick={() => {
                              addGroup()
                              // closeDialog()
                           }}>Сохранить</Button>
                           <Button onClick={() => {
                              setTab(null)
                           }}>Назад</Button>
                        </div>
                     </>
                  }
               </>
         }
      </dialog>
   );
});

export default QuestionGroupDialog;
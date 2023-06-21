import React, {useRef} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getQuestions} from "../../http/questionsApi";
import {QuestionsHeadContext, QuestionsHeadLevelContext} from "../../context/QuestionsHeadContext";
import QuestionWithChildren from "../../components/Question/QuestionWithChildren";
import {RefetchQuestionsContext} from "../../context/RefetchQuestionsContext";
import onMouseDown from "./helpers/onMouseDown";
import {sortQuestions} from "../../components/Question/helpers/utils";
import QuestionGroupDialog from "./modules/QuestionGroupDialog";

const QuestionList = () => {
   const {data, isLoading, refetch} = useQuery({queryKey: ['questions'], queryFn: getQuestions})
   const dialogRef = useRef(null)
   const questionsRef = useRef(null)

   return (
      <div
         className='question__container flex flex-col gap-2 py-4 px-8 rounded-md bg-gray-100'
         onMouseDown={e => onMouseDown(e, dialogRef, questionsRef)}
      >
         {isLoading ? 'Загрузка..' : <RefetchQuestionsContext.Provider value={refetch}>
            <QuestionsHeadContext.Provider value={data}>
               <QuestionsHeadLevelContext.Provider value={0}>
                  {// Выбираем те вопросы, которые не имеют зависимостей.
                     Object.keys(data).length > 0 ? data[null].sort(sortQuestions)?.map(question => {
                           return <QuestionWithChildren
                              key={question.id}
                              question={question}
                           />
                        })
                        : <div onClick={() => console.log(data)}>На данный момент не было создано вопросов</div>
                  }
               </QuestionsHeadLevelContext.Provider>
            </QuestionsHeadContext.Provider>
         </RefetchQuestionsContext.Provider>}

         <QuestionGroupDialog questions={questionsRef} refetch={refetch} ref={dialogRef}/>
      </div>
   );
};

export default QuestionList;
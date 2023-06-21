import React from 'react';
import {useQuery} from "@tanstack/react-query";
import QuestionAdd from "../components/Question/QuestionAdd";
import CategoryAdd from "../components/Category/CategoryAdd";
import {getCategoriesRow} from "../http/categoryApi";
import {CategoryContext} from "../context/CategoryContext";
import CategoryItem from "../components/Category/CategoryItem";
import QuestionList from "../modules/QuestionList/QuestionList";

const QuestionsPage = () => {
   const {data: categories, isLoading: isCategoriesLoading} = useQuery({
      queryKey: ['categories'],
      queryFn: getCategoriesRow
   })


   return (
      <CategoryContext.Provider value={categories}>

         <h1 className='mx-auto mb-4 font-bold text-7xl'>Вопросы</h1>

         <div className='flex gap-4'>
            <QuestionAdd/>
            <CategoryAdd/>
         </div>

         <QuestionList/>
         <div>
            {isCategoriesLoading ?
               'Загрузка..'
               :
               categories?.map(category => <CategoryItem key={category.id} category={category}/>)
            }
         </div>
      </CategoryContext.Provider>
   );
};

export default QuestionsPage;
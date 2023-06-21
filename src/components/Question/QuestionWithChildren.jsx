import React, {useContext} from 'react';
import {addClass, getChildren, getElementBelow, QuestionsUpdate} from "./helpers/utils";
import QuestionItem from "./QuestionItem";
import {RefetchQuestionsContext} from "../../context/RefetchQuestionsContext";

const QuestionWithChildren = ({className, question}) => {
   const refetch = useContext(RefetchQuestionsContext)


   function dragStartHandler(e) {
      e.preventDefault()
   }
   function mouseDownHandler(e) {
      if (e.target.classList.contains('question__condition') || e.target.localName === 'select' || e.button !== 0) return

      let currentDroppable,
         currentDroppableMain,
         currentElement

      const question = e.currentTarget

      const children = getChildren(question)

      const shiftX = e.clientX - question.getBoundingClientRect().left
      const shiftY = e.clientY - question.getBoundingClientRect().top

      question.style.width = question.offsetWidth + 'px';
      question.style.opacity = '.5';
      question.style.position = 'absolute';
      question.style.zIndex = 3;

      moveAt(e.pageX, e.pageY);

      function moveAt(pageX, pageY) {
         question.style.left = pageX - shiftX + 'px';
         question.style.top = pageY - shiftY + 'px';
      }
      function onMouseMove (e) {
         const elemBelow = getElementBelow(e, question)
         if (!elemBelow) return // Если выходим за пределы окна, то не будем ничего делать

         let droppableBelow = elemBelow.closest('.question__item')
         let droppableBelowMain = elemBelow.closest('.question__main')

         currentElement = elemBelow
         currentDroppableMain = droppableBelowMain ? droppableBelowMain : currentDroppableMain

         if (currentDroppable !== droppableBelow && currentDroppable)
            addClass(currentDroppable)

         currentDroppable = droppableBelow

         if(currentDroppable){
            const shiftDroppableY = e.clientY - currentDroppableMain.getBoundingClientRect().top
            const condition = question.offsetLeft - currentDroppable.offsetLeft > 30

            if (shiftDroppableY < currentDroppableMain?.offsetHeight / 2)
               addClass(droppableBelow, 'active_top')
            else if (condition)
               addClass(droppableBelow, 'active_bottom-child')
            else
               addClass(droppableBelow, 'active_bottom')
         }


         moveAt(e.pageX, e.pageY)
      }
      const onMouseUp = () => {
         document.removeEventListener('mousemove', onMouseMove)
         document.removeEventListener('mouseup', onMouseUp)

         if (currentDroppable) {
            addClass(currentDroppable)
            QuestionsUpdate(currentElement, question, currentDroppable).then(
               d => d.message === 'updated' && refetch()
            )
         }

         question.style.opacity = '1'
         question.style.position = ''
         question.style.width = ''

         if (children){
            children.style.position = ''
            children.style.visibility = ''
         }
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
   }

   return (
      <>
         <div
            onDragStart={e => dragStartHandler(e)}
            onMouseDown={e => mouseDownHandler(e)}
            className={'question__item ' + className}
            data-id={question.id}
            data-index={question.index}
            data-head={question.headId}
            data-headcondition={question.headCondition}
            draggable
         >
            <QuestionItem question={question}/>
         </div>
      </>);
};

export default QuestionWithChildren;
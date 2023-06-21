import {setOverQuestions, setSubQuestion, setUnderQuestions, swapQuestions} from "../../../http/questionsApi";

export const sortQuestions = (a, b) => a.index > b.index ? 1 : -1

export function getChildren(draggable) {
   const nextElement = draggable.nextElementSibling

   if (nextElement)
      if (nextElement.classList.contains('question_sub')) {
         nextElement.style.position = 'absolute'
         nextElement.style.visibility = 'hidden'

         return nextElement
      }
   return null
}

export async function QuestionsUpdate(element, draggableQ, droppableQ) {
   const action = getAction(element)

   const droppable = {
         id: droppableQ.dataset.id,
         index: droppableQ.dataset.index,
         head: droppableQ.dataset.head || null,
         headCondition: droppableQ.dataset.headcondition || null,
         conditionId: element.dataset.conditionid || null
      },
      draggable = {
         id: draggableQ.dataset.id,
         index: draggableQ.dataset.index,
         head: draggableQ.dataset.head || null,
         headCondition: draggableQ.dataset.headcondition || null,
         conditionId: element.dataset.conditionid || null
      }

   switch (action) {
      case 'over':
         return await setOverQuestions(draggable, droppable)

      case 'under':
         return await setUnderQuestions(draggable, droppable)

      case 'sub':
         return await setSubQuestion(draggable, droppable)

      case 'swap':
         return await swapQuestions(draggable, droppable)

      default:
         return null
   }
}

export function getElementBelow(e, question) {
   question.hidden = true
   const elemBelow = document.elementFromPoint(e.clientX, e.clientY)
   question.hidden = false
   return elemBelow
}

export function addClass(el, className = null) {
   if (!el.classList.contains(className)) {
      el.classList.remove('active_top')
      el.classList.remove('active_bottom')
      el.classList.remove('active_bottom-child')

      if (className)
         el.classList.add(className)
   }
}

function getAction(element) {
   if (element) {
      const classes = element.classList
      const classesParent = element.parentNode.classList
      if (classes.contains('question__item_over'))
         return 'over'
      if (classes.contains('question__item_sub'))
         return 'sub'
      if (classes.contains('question__item_under'))
         return 'under'
      if (classes.contains('question__main'))
         return 'swap'

      if (classesParent.contains('question__item_over'))
         return 'over'
      if (classesParent.contains('question__item_sub'))
         return 'sub'
      if (classesParent.contains('question__item_under'))
         return 'under'
      if (classesParent.contains('question__main'))
         return 'swap'
   }

   return null
}
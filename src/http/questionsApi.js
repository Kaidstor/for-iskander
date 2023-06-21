import {$host} from "../http";

export async function getQuestionsGroups() {
   const {data} = await $host.get('/api/question/groups')
   console.log(data)
}
export async function createQuestionsGroups(name, questionsIds) {
   const {data} = await $host.post('/api/question/createGroup', {name, questionsIds})
   console.log(data)
}
export async function getChartData(){
   const {data} = await $host.get('/api/question/chartData')
   console.log(data)
}
export async function getQuestions(){
   const {data} = await $host.get('/api/question/all')

   console.log(data.reduce((acc, item) => {
      acc[item.headId] = item.questions
      return acc
   }, {}))

   return data.reduce((acc, item) => {
      acc[item.headId] = item.questions
      return acc
   }, {})
}
export async function getNextQuestion(){
   const {data} = await $host.get('/api/question/next')
   return data
}
export async function createQuestion(text){
   const {data} = await $host.post('/api/question/create', {text})
   return data
}
export async function questionCategoryUpdate(questionId, categoryId){
   const {data} = await $host.post('/api/question/setCategory', {questionId, categoryId})
   return data
}
export async function answerTheQuestion(questionId, category, answer){
   const {data} = await $host.post('/api/question/answer', {questionId, category, answer})
   return data
}
export async function swapQuestions(draggable, droppable) {
   const {data} = await $host.post('/api/question/swap', {draggable, droppable})
   return data
}
export async function setSubQuestion(draggable, droppable) {
   const {data} = await $host.post('/api/question/subset', {draggable, droppable})
   return data
}
export async function setOverQuestions(draggable, droppable) {
   const {data} = await $host.post('/api/question/over', {draggable, droppable})
   return data
}
export async function setUnderQuestions(draggable, droppable) {
   const {data} = await $host.post('/api/question/under', {draggable, droppable})
   return data
}

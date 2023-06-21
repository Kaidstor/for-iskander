import {$host} from "./index";

export async function createCategory(name){
   const {data} = await $host.post('/api/category/create', {name})
   return data
}

export async function getCategories(){
   const {data} = await $host.get('/api/category/all')
   data.push({id: '-1', headId: null, name: 'Без категории'})

   return data.map(el => {
      return [el.id, el.name]
   })
}

export async function getCategoriesRow(){
   const {data} = await $host.get('/api/category/all')
   data.push({id: '-1', headId: null, name: 'Без категории'})

   return data
}
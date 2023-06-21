import {$host} from "../http";

export async function getSession() {
   const {data} = await $host.get('/api/cookie')
   return data
}


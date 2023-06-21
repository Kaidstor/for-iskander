import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import {useEffect} from "react";

import {ArcElement, Chart as ChartJS, Legend, RadialLinearScale, Tooltip,} from 'chart.js';
import {getSession} from "./helpers/getSession";
import QuestionsPage from "./pages/questionsPage";
import LayoutMain from "./components/LayoutMain";
import TestPage from "./pages/TestPage";
import ConstructorPage from "./pages/ConstructorPage";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function App() {
   useEffect(() => {
      getSession().then(data => console.info(data.message))
   }, [])

   return (
      <Routes>
         <Route path='/' element={<Layout/>}>
            <Route path='create' element={<QuestionsPage/>}/>
            <Route path='/test' element={<TestPage/>}/>
            <Route path='*' element={<div>not found</div>}/>
         </Route>

         <Route path='/constructor' element={<ConstructorPage/>}/>

         <Route index element={<LayoutMain/>}/>
      </Routes>
   )
}

export default App;

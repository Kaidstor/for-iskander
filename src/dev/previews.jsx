import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import TestPage from "../pages/TestPage";
import QuestionBlock from "../components/Question/QuestionBlock";

const ComponentPreviews = () => {
   return (
      <Previews palette={<PaletteTree/>}>
         <ComponentPreview path="/TestPage">
            <TestPage/>
         </ComponentPreview>
         <ComponentPreview path="/QuestionBlock">
            <QuestionBlock/>
         </ComponentPreview>
      </Previews>
   )
}

export default ComponentPreviews
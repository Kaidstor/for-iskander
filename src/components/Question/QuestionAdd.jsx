import React from 'react';
import {createQuestion} from "../../http/questionsApi";
import AddByName from "../AddByName";

const QuestionAdd = () => <AddByName createFunction={createQuestion} btnText='Добавить вопрос' title='Введите вопрос'/>

export default QuestionAdd;
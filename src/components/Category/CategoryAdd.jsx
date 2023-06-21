import React from 'react';
import AddByName from "../AddByName";
import {createCategory} from "../../http/categoryApi";

const CategoryAdd = () => <AddByName createFunction={createCategory} btnText='Добавить категорию' title='Введите категорию' />
export default CategoryAdd;
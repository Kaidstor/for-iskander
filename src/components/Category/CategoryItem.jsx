import React from 'react';

const CategoryItem = ({category}) => {
   return (
      <div onClick={() => console.log(category)}>
         #ID {category.id} | {category.name}
      </div>
   );
};

export default CategoryItem;
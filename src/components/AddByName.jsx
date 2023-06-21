import React, {useRef, useState} from 'react';
import Button from "./ui/Button";
import Input from "./ui/Input";
import Dialog from "./ui/Dialog";

const AddByName = ({createFunction, title, btnText='Добавить'}) => {
   const modalRef = useRef(null)
   const [name, setName] = useState('')

   return (
      <>
         <button className='p-2 rounded-md nav_link_main' onClick={()=>modalRef.current.showModal()}>{btnText}</button>
         <Dialog ref={modalRef}>
            <p className='text-2xl font-bold'>{title}</p>
            <Input
               placeholder='Ввод'
               value={name}
               onChange={e=>setName(e.target.value)}
            />
            <div className='flex flex-row mt-4 gap-4'>
               <Button className='w-full' onClick={()=>modalRef.current.close()}>Назад</Button>
               <Button className='w-full' onClick={() => createFunction(name).then(() => {
                  window.location.reload()
                  modalRef.current.close()
               })}>Добавить</Button>
            </div>
         </Dialog>
      </>
   );
};

export default AddByName;
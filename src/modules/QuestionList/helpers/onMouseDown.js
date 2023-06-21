export default (e, dialogRef, questionsRef) => {
   if (!e.target.classList.contains('question__container')) return

   document.onselectstart = () => false
   let groupItems
   const elems = [...document.querySelectorAll('.question__main')].filter(el => el.getBoundingClientRect().top !== 0)

   const startX = e.clientX
   const startY = e.clientY

   const selection = document.createElement('div')
   selection.style.position = 'absolute';
   selection.style.background = 'rgba(56, 189, 248, .4)'
   selection.style.border = '2px solid rgba(56, 189, 248, .5)'
   selection.style.top = '0'
   selection.style.left = '0'

   document.body.appendChild(selection)

   moveAt(e)

   function moveAt(e) {
      let y = e.clientY
      let x = e.clientX
      let yMax = startY
      let xMax = startX

      if (e.clientX > startX) {
         x = startX
         xMax = e.clientX
         selection.style.width = e.clientX - startX + 'px'
      }
      else {
         selection.style.left = e.clientX + 'px'
         selection.style.width = startX - e.clientX + 'px'
      }

      if (e.clientY > startY) {
         y = startY
         yMax = e.clientY
         selection.style.height = e.clientY - startY + 'px'
      }
      else {
         selection.style.top = e.clientY + 'px'
         selection.style.height = startY - e.clientY + 'px'
      }
      const group = []
      let lvlmin = 100

      elems.forEach(el => {
         const pos = el.getBoundingClientRect()
         if (!((pos.top >= y || pos.bottom >= y) && (pos.top <= yMax || pos.bottom <= yMax))) {el.classList.remove('active'); return }
         if (!((pos.right >= x || pos.left >= x) && (pos.right <= xMax || pos.left <= xMax))) {el.classList.remove('active'); return }

         const lvl = +el.dataset.headlevel
         if (lvlmin > lvl) {
            lvlmin = lvl

            group.forEach(el => {
               const lvl = +el.dataset.headlevel

               if (lvl > lvlmin){
                  // el.parentNode.parentNode.classList.add('hidden')
                  // console.log(el.dataset.head)
                  document.querySelectorAll(`.conditions-${el.dataset.head}`).forEach(el => {
                     if (el.classList.contains('bg-blue-100')){
                        el.click()
                     }
                  })
               }
            })
         }

         el.classList.add('active')

         group.push(el)
      })

      groupItems = group
   }
   document.onmousemove = moveAt

   document.onmouseup = () => {
      document.onmousemove = null
      document.onselectstart = null
      selection.remove()

      if (groupItems.length) {
         if(groupItems.length > 1){
            questionsRef.current = groupItems
            dialogRef.current.showModal()
         }
         else
            groupItems.forEach(el => el.classList.remove('active'))
      }
      document.onmouseup = null
   }
}
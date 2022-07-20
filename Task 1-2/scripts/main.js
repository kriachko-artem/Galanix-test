//Добавляем дату и время на сайт
function setTime(){
    document.querySelector('.date').innerText = new Date()
    .toLocaleString([],
        {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'}
    )
}
setTime()
setInterval(()=>{
    setTime()
},1000)

//Считаем и добавляем количество картинок
const imgsNumber = document.querySelectorAll('img').length;
document.querySelector('.number-images').innerHTML = `На странице ${imgsNumber} картинок.`

function openImg(){
    const list = this.closest('ul');
    const popup = document.createElement('div');
    const holder = document.createElement('div');
    const closeButton = document.createElement('button');
    closeButton.classList.add('close')
    closeButton.innerText = 'Close'
    holder.append(closeButton)
    holder.classList.add('img-holder')
    popup.classList.add('popup')
    holder.append(this.cloneNode())
    popup.append(holder)

    list.append(popup)
    gsap.to(popup,{
        opacity: 1,
    })


    //Закрываем попап
    closeButton.addEventListener("click", closePopup)
    function closePopup(){
            gsap.to(popup,{
                opacity: 0,
                onComplete:()=>popup.remove()
            })
    }
}
document.querySelectorAll('img').forEach(item=>item
        .addEventListener('click',openImg)
)

//Bonus

// Добавляем кнопку удаления
const deleteButton = document.createElement("span")
deleteButton.className = 'delete'
deleteButton.innerText = 'X'
deleteButton.onclick = deleteItem
document.querySelectorAll('.image-list__item').forEach(item=>item
    .append(deleteButton.cloneNode(true)))

document.querySelectorAll('.delete').forEach(item=>item
    .addEventListener('click',deleteItem))

//Запоминаем изначальный массив элементов
const originList = Array.from(document.querySelectorAll('.image-list__item'))

//Обновляем на данные из хранилища
document.querySelector('.image-list').innerHTML = '';
const listFromStorage = JSON.parse(localStorage.getItem('image-list'));

function updateList(boolean= true){
    //Если true, то выводим список из памяти
    if (boolean){
        originList.map(item=>{
            if (listFromStorage.includes(item.id)) {
                document.querySelector('.image-list').append(item)
            }
        })
    // В противном случае восстанавливаем изначальный список
    } else {
        originList.map(item => document.querySelector('.image-list').append(item))
        localStorage.setItem('image-list',JSON.stringify(originList.map(item=>item.id)))
        console.log(localStorage)
    }
}
updateList()
//Восстанавливаем изначальный список
document.querySelector('.restore').addEventListener('click',()=>updateList(false))


//Удаляем элементы и обновляем хранилище оставшихся элементов
function deleteItem(){
    const item = this.closest('li');
    item.remove()
    const list = Array.from(document.querySelectorAll('.image-list .image-list__item'))
        .map((item,index)=>{
            console.log(index)
            return item.id
        })
    localStorage.setItem('image-list',JSON.stringify(list))
    console.dir(localStorage.getItem('image-list'))
}



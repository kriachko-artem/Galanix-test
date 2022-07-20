const url = 'http://universities.hipolabs.com/search?country=';

const form = document.querySelector('#search-form');
const formInput = document.querySelector('#form-input');
const tableBlock = document.querySelector('#table');

let checkboxesFromStorage;
updateCheckbox()

console.log(checkboxesFromStorage)

if (localStorage.getItem('universities')) getData(localStorage.getItem('universities'))
function getData(value){

    fetch(url+value)
        .then(response=>{
            return response.json()
        })
        .then((data=>{
            data.length!==0?createTable(data):ifDataEmpty()
        }))
}

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    const value = formInput.value.toLowerCase();
    if (value) {
        if (localStorage.getItem('universities')!==value){
            restoreStorage()
            updateCheckbox()
    }
        localStorage.setItem('universities',value)
        getData(value)
    }

})
function ifDataEmpty(){
    localStorage.setItem('universities','')
    tableBlock.innerHTML = ''
    formInput.value = ''
    const h2 = document.createElement('h2');
    h2.className = 'empty-message'
    h2.innerText = 'Unfortunately no results'
    tableBlock.append(h2)
}

function createTable(content){
    checkboxesFromStorage
    tableBlock.innerHTML = ''
    const restoreButton = document.createElement('button');
    restoreButton.innerText = 'restore'
    tableBlock.append(restoreButton)
    restoreButton.addEventListener('click',()=>{
        restoreStorage()
        tableBlock.innerHTML = ''
        formInput.value = ''
    })


    const table = document.createElement('table');
    const caption = document.createElement('caption');
    caption.innerText = `Universities of ${content[0].country}`


    const rowColsName = document.createElement('tr');
    rowColsName.className = 'cols-name'

    const name = document.createElement('th');
    name.innerText = 'University name'

    const site = document.createElement('th');
    site.innerText = 'Site'
    const checked = document.createElement('th');
    const span = document.createElement('span');
    span.id = 'checked-numbers'
    span.innerText = checkboxesFromStorage.length
    checked.innerText = `Количество `
    checked.append(span)

    table.append(caption)
    rowColsName.append(name)
    rowColsName.append(site)
    rowColsName.append(checked)
    table.append(rowColsName)


    function addNewRow(elem,index){
        const row = document.createElement('tr');

        const tdName = document.createElement('td');
        tdName.className = 'name'
        tdName.innerText = elem.name;

        const tdSite = document.createElement('td');
        tdSite.className = 'site'

        const checkedTd = document.createElement('td');
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox';
        checkbox.id = index
        if (checkboxesFromStorage.length){
            checkboxesFromStorage.forEach(item=>{
            if (item===checkbox.id)
                checkbox.checked = true
        })}


        checkbox.addEventListener('click',setNumbersCheckbox)

        checkedTd.append(checkbox)

        elem.web_pages.map(item=>{
            const link = document.createElement('a');
            link.href = item;
            link.innerText = item
            tdSite.append(link)
        })

        row.append(tdName)
        row.append(tdSite)
        table.append(row)
        row.append(checkedTd)
    }
    content.map((item,index)=>addNewRow(item,index))
    tableBlock.append(table)


}

//Bonus

function restoreStorage(){
    localStorage.setItem('universities','')
    localStorage.setItem('universities-checked','')
}
function updateCheckbox(){
    checkboxesFromStorage = localStorage.getItem('universities-checked')
    return checkboxesFromStorage &&= JSON.parse(localStorage.getItem('universities-checked'));
}
function setNumbersCheckbox(){
    const checked = Array.from(document.querySelectorAll('input'))
        .filter(item => {
            if ((item.type === 'checkbox') && (item.checked === true)) return item
        });
    document.querySelector('#checked-numbers').innerHTML = checked.length
    localStorage
        .setItem('universities-checked',JSON.stringify(checked
                .map(item=>{
                    return item.id
                })))
}

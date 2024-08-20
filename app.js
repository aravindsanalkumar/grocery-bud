// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.querySelector('#grocery');
const container = document.querySelector('.grocery-container')
const submitBtn = document.querySelector('.submit-btn')
const list  = document.querySelector('.grocery-list')
const clearBtn = document.querySelector('.clear-btn')

// edit option
let editElement;
let editFlag = false;
let editId = '';


// ****** EVENT LISTENERS **********
// submit form
form.addEventListener('submit',addItem);
clearBtn.addEventListener('click',clearItems);

// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if(value !== '' && editFlag === false){
        console.log('add item');
        const element = document.createElement('article');
        element.classList.add('grocery-item');
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `<p class="title">${value}</p>
                            <div class="btn-container">
                            <button type="btn" class="edit-btn"><i class="fas fa-edit"></i></button>
                            <button type="btn" class="delete-btn"><i class="fas fa-trash"></i></button>
                            </div>`;

        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        deleteBtn.addEventListener('click',deleteItem);
        editBtn.addEventListener('click',editItem);
                            
        list.appendChild(element);
        displayAlert('item added to the list','success')
        container.classList.add('show-container');
        addToLocalStorage(id,value);
        setBackToDefault();
    }
    else if(value !== '' && editFlag === true){
        console.log('editing');
        editElement.innerHTML = value;
        displayAlert('value changed','success');
        setBackToDefault();
    }
    else{
        displayAlert('please enter value','danger');
    }
}

//display alert
function displayAlert(text,action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`)

    //remove alert
    setTimeout(function(){
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`)
    },1000);
}

function addToLocalStorage(id,value){
    console.log('added to local storage');
}

function removeFromLocalStorage(id){
    console.log('removed from local storage');
}

function editLocalStorage(id,value){

}

function setBackToDefault(){
    console.log('set back to default');
    grocery.value = '';
    editFlag = false;
    editId = '';
    submitBtn.textContent = 'submit';

}

function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item);
        });
    }
    console.log('removed');
    container.classList.remove('show-container');
    displayAlert('empty list','danger');
    setBackToDefault();
}

function deleteItem(e){
    console.log('delete');
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    console.log('id:'+ id)
    list.removeChild(element);
    console.log(list.children);
    console.log(list.children.length);
    if(list.children.length === 0){
        //container.classList.remove('show-container');
        console.log('xxxxxxx');
    }
    displayAlert('item removed','danger');
    setBackToDefault();
}

function editItem(e){
    console.log('edit');
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    console.log(editElement.innerHTML);
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id;
    submitBtn.textContent = 'edit';


}
// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********

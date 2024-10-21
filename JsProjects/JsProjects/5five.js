const notesContainer = document.querySelector('.notes-container');
const createBtn = document.querySelector('#create-btn');
const notes = document.querySelectorAll('.input-box');

function showNotes(){
    notesContainer.innerHTML = localStorage.getItem('notes');
}
showNotes();

function updateStorage(){
    localStorage.setItem('notes',notesContainer.innerHTML);
}

createBtn.addEventListener('click',function(){
    let inputBox = document.createElement('p');
    let img = document.createElement('img');
    inputBox.className = 'input-box';
    inputBox.setAttribute('contenteditable','true');
    img.src = "https://cdn1.iconfinder.com/data/icons/material-core/18/delete-256.png";
    notesContainer.appendChild(inputBox).appendChild(img);
})

notesContainer.addEventListener('click',function(e){
    if(e.target.tagName === 'IMG'){
        e.target.parentElement.remove();
        updateStorage();
    }
    else if(e.target.tagName === 'P'){
        notes = document.querySelectorAll('.input-box');
        notes.forEach(function(nt){
            nt.onkeyup = function(){
                updateStorage();
            }
        });
    }
})


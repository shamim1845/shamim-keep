const addButton = document.querySelector("#add");

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('.textarea');
    const notes = [];
    textAreaData.forEach((note) => {
        return notes.push(note.value)
    })
    console.log(notes);

    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');
   
    const htmlData = `
        <div class="operation">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt "></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="textarea ${text ? "hidden" : ""}"></textarea>`;

note.insertAdjacentHTML ('afterbegin', htmlData);
    // console.log(note);

    //getting reference
   const editButton =  note.querySelector('.edit');
   const deleteButton =  note.querySelector('.delete');
   const mainDiv =  note.querySelector('.main');
   const textArea =  note.querySelector('.textarea');

   deleteButton.addEventListener('click', () => {
       note.remove();
       updateLSData();
   })
   //toggle using edit button
      textArea.value = text;
      mainDiv.innerHTML = text;
   editButton.addEventListener('click', () => {
       mainDiv.classList.toggle('hidden');
       textArea.classList.toggle("hidden");
   })

   textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSData();
   })



     document.body.appendChild(note);
}
//getting data back from local storage
const notes = JSON.parse(localStorage.getItem("notes"));
console.log(notes);
if(notes) { notes.forEach((notet) => addNote(notet))};


addButton.addEventListener('click', () => addNote())


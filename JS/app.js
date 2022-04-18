// console.log("Welcome to Notes App");
// After reloading it'll show all the notes
showNotes();

// if user adds any note then store it to the local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e){
    let addText = document.getElementById("addText");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    //push() appends another value to an array
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";
    addTitle.value = "";
    // console.log(notesObj);

    showNotes();
})

//Function to show elements from localStoreage
function showNotes() {
    let notes = localStorage.getItem("notes");
    // notesObj = []
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    // notes is an array because in localStorage it is stored as an array
    notesObj.forEach(function(element, index){
        html += `
            <div class="noteCard card my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">Note ${element.title}</h5>
                <p class="card-text">${element}</p>
                <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
                </div>
            </div>
        `;
    })

    let notesElm = document.getElementById('notes');
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }else{
        notesElm.innerHTML = `<h3 style="color:red">Nothing to show! Use "Add a Note" section to add notes</h3>`;
    }
}


//Function to delete a note
function deleteNote(index){
    // console.log("I'm deleting", index);

    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }

    //splice() method adds and/or removes an element from an array
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj))
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function(){
    let inputVal = search.value;
    // console.log("Input event Fired", inputVal);

    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }
    })

})

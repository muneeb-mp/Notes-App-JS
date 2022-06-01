
showNotes();    //To show saved notes when we reload page
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");  //fetch notes from local storage

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));   //Local storage does not support arrays, so convert into string.
    addTxt.value = "";  //Empty textbox after user clicks on add note button
    // console.log(notesObj);  //Display notes array

    showNotes();    //function to display notes
});

//Function to show notes from local storage
function showNotes() {
    let notes = localStorage.getItem("notes");  //fetch notes from local storage
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";  //Initialize an empty html element
    notesObj.forEach(function (element, index) {
        html += `
            <div class="card noteCard my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note #${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>
            `;
    });

    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `
            <i>List is Empty</i>
        `;
    }
}


// Function to delete a note

function deleteNote(index) {
    // console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");  //fetch notes from local storage
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase;
    // console.log("I/P event fired, ", inputVal);

    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;

        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
});
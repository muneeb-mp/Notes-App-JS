
showNotes();    //To show saved notes when we reload page
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");  //fetch notes from local storage

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    // Added obj which contains title and body
    let myObj = {
        title: addTitle.value,
        desc: addTxt.value
    };
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));   //Local storage does not support arrays, so convert into string.
    addTitle.value = "";
    addTxt.value = "";  //Empty textbox after user clicks on add note button

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
                    <h3 class="card-title"><b>${element.title}</b></h3>
                    <p class="card-text">${element.desc}</p>
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


// To search notes from search box
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase;

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
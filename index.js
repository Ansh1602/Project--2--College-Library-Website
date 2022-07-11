console.log("this is index.js");

/* Todos
1. Store all the data to the LocalStorage
2. Give another colum as an option to delete the book 
3. Add a scroll bar to the view
*/

// Constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

// Display Constructor
function Display() {}

// Add methods to display prototype
Display.prototype.add = function(book){
    console.log("Adding to ui");
    let tableBody = document.getElementById('tableBody');
    let uiString = `
                    <tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                    </tr> 
    `;
    tableBody.innerHTML += uiString;
};


// Implementing CLear function
Display.prototype.clear = function(){
    let libraryForm = document.getElementById("libraryForm"); 
    libraryForm.reset();
};


// Implementing CLear function
Display.prototype.validate = function(book){
    if(book.name.length < 3 || book.author.length < 3){
        return false;
    }
    else{
        return true;
    }
}

Display.prototype.show = function(type, displayMessage){
    let message = document.getElementById("message");
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Holy guacamole!</strong> ${displayMessage}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`

    setTimeout(function(){
        message.innerHTML = '';
    }, 2000);
}

// Add Event Listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  e.preventDefault();
  console.log("You have submitted library Form");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;

  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");
  let type;

  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }

  let book = new Book(name, author, type);
  console.log(book);

  let display = new Display();

  if(display.validate(book)){

    display.add(book);
    display.clear();
    display.show('success', ' Your book has been successfully added');
  }
  else{
      // Show error to user
      display.show('danger', ' Sorry you cannot add this book. ');
  }
}

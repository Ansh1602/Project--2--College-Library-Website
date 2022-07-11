console.log("This is a ES6 version of project 1");


class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

class Display {
    
   add(book) {
    // console.log("Adding to ui");
    let tableBody = document.getElementById("tableBody");
    let uiString = `
                        <tr>
                                <td>${book.name}</td>
                                <td>${book.author}</td>
                                <td>${book.type}</td>
                        </tr> 
        `;
    tableBody.innerHTML += uiString;
  }

  clear() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
  }

  validate(book) {
    if (book.name.length < 3 || book.author.length < 3) {
      return false;
    } else {
      return true;
    }
  }

  show(type, displayMessage) {
    let message = document.getElementById("message");
    let boldText;
    if (type == "success") {
      boldText = "Success";
    } else {
      boldText = "Warning";
    }
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText} Holy guacamole!</strong> ${displayMessage}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>`;

    setTimeout(function () {
      message.innerHTML = "";
    }, 4000);
  }
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

  if (display.validate(book)) {
    display.add(book);
    // display.clear();
    display.show("success", " Your book has been successfully added");
  } else {
    // Show error to user
    display.show("danger", " Sorry you cannot add this book. ");
  }

  // If user adds a book, add it to the localStorage

  let bookName = document.getElementById("bookName");
  let authorr = document.getElementById("author");
  let books = localStorage.getItem("books");
  if (books == null) {
    booksArr = [];
  } else {
    booksArr = JSON.parse(books);
  }

  let myArr = {
    name: bookName.value,
    author: authorr.value,
  };

  booksArr.push(myArr);
  localStorage.setItem("books", JSON.stringify(booksArr));
  display.clear();
}

// Reviving data from local localStorage
function showBooks() {
  let books = localStorage.getItem("books");
  if (books == null) {
    booksArr = [];
  } else {
    booksArr = JSON.parse(books);
  }
  
}

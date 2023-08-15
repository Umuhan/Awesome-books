// Book class: Represents a Book
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
//  UI class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.querySelector(".display-books-container");
    const displayBook = document.createElement("div");
    displayBook.classList.add("display-book");
    displayBook.innerHTML = `
  
        <h4>${book.title}</h4>
        <h5>${book.author}</h5>
      
      <button class="delete">Remove</button>`;
    list.appendChild(displayBook);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    // div.classList.add("alert-container");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".library-container");
    const form = document.querySelector(".input-container");
    container.insertBefore(div, form);

    // vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
  }
}

// Store class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(title) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector(".form").addEventListener("submit", (e) => {
  //  prevent actual submit
  e.preventDefault();

  // get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;

  // validate
  if (title === "" || author === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    //   instantiate book
    const book = new Book(title, author);

    //   Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    //  clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document
  .querySelector(".display-books-container")
  .addEventListener("click", (e) => {
    // remove book from UI
    UI.deleteBook(e.target);

    // remove book from store
    Store.removeBook(e.target.parentElement.firstElementChild.textContent);

    // show success message
    UI.showAlert("Book Removed", "success");
  });

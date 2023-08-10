class LibraryApp {
  constructor() {
    this.books = [];
    this.displayBooksContainer = document.querySelector(
      '.display-books-container',
    );
    this.titleInput = document.querySelector('#title');
    this.authorInput = document.querySelector('#author');
    this.addBtn = document.querySelector('.add');

    this.addBtn.addEventListener('click', () => this.addBook());
    this.loadBooks();
    this.displayBooks();
  }

  addBook() {
    const uniqueId = Math.floor(Math.random() * Date.now()).toString(16);
    const title = this.titleInput.value;
    const author = this.authorInput.value;
    if (uniqueId && title && author) {
      const book = { uniqueId, title, author };
      this.books.push(book);
      this.saveBooks();
      this.displayBook(book);
      this.clearInputs();
    }
  }

  displayBooks() {
    this.books.forEach((book) => this.displayBook(book));
  }

  displayBook(book) {
    const displayBook = document.createElement('div');
    displayBook.classList.add('display-book');

    displayBook.innerHTML = `
      <div class='display-book-details'>
        <h4>'${book.title}' by</h4>
        <h5>${book.author}</h5>
      </div>
      <button class="remove">Remove</button>
    `;

    const removeBtn = displayBook.querySelector('.remove');
    removeBtn.addEventListener('click', () => this.removeBook(book));
    this.displayBooksContainer.appendChild(displayBook);
  }

  removeBook(book) {
    this.books = this.books.filter(
      (b) => b.uniqueId !== book.uniqueId || b.title !== book.title || b.author !== book.author,
    );
    this.saveBooks();
    this.clearDisplay();
    this.displayBooks();
  }

  saveBooks() {
    localStorage.setItem('library', JSON.stringify(this.books));
  }

  loadBooks() {
    const storedBooks = JSON.parse(localStorage.getItem('library')) || [];
    this.books = storedBooks;
  }

  clearInputs() {
    this.titleInput.value = '';
    this.authorInput.value = '';
  }

  clearDisplay() {
    this.displayBooksContainer.innerHTML = '';
  }
}

const libraryApp = new LibraryApp();
libraryApp.clearInputs();

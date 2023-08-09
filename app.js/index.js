/* eslint-disable no-unused-vars */
const colorItem = document.querySelector('body');
// colorItem.style.backgroundColor = "blue";
const form = document.querySelector('form');
const bookInfo = document.querySelector('.all-books');
const title = document.querySelector('#input-title');
const author = document.querySelector('#input-author');

let bookArr = [];



function addBook() {
  const eachBook = {};
  eachBook.id = bookArr.length;
  eachBook.title = title.value;
  eachBook.author = author.value;

  bookArr.push(eachBook);
  bookDisplay();

  const jsonData = JSON.stringify(bookArr);
  localStorage.setItem('form', jsonData);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBook();
});

window.addEventListener('load', () => {
  const getJsonData = localStorage.getItem('form');
  if (getJsonData) {
    bookArr = JSON.parse(getJsonData);
  }
  bookDisplay();
});

function removeBook(index) {
  bookArr.splice(index, 1);
  bookDisplay();
  const jsonData = JSON.stringify(bookArr);
  localStorage.setItem('form', jsonData);
}

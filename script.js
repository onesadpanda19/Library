const myLibrary = [];
const libraryDiv = document.querySelector(".library");
const libraryForm = document.querySelector('form')


// finish connecting form to script with tests! look into hijacking info from the form to submit into book function


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', '295 pages', 'read')
const endersGame = new Book('Enders Game', 'Orson Scott Card', '324', 'read' )

/**
 * - takes in user input (strings) creates a book object and adds them to an array (myLibrary)
 * @param {string} title - Title of the book to add to library
 * @param {string} author - Author of the book
 * @param {string} pages - How many pages the book has
 * @param {string} read - If the book has bee read or not
 * @return nothing at the moment
 */
function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
}
console.log(theHobbit)
addBookToLibrary('gloop', 'me', '3', 'read')

console.log(myLibrary)

const form = document.querySelector('.bookForm')


form.addEventListener('submit',(e) =>{
    e.preventDefault();
    const newTitle = data.get('title');
    const newAuthor = data.get('author');
    const newPages = data.get('pages')
    const newRead = data.get('read')


    console.log(newTitle)
    console.log(newAuthor)
    console.log(newPages)
    console.log(newRead)
})


const myLibrary = [];

const libraryDiv = document.querySelector(".library");
const libraryForm = document.querySelector('form')


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', '295', 'read')
const endersGame = new Book('Enders Game', 'Orson Scott Card', '324', 'read' )

myLibrary.push(theHobbit)
myLibrary.push(endersGame)


/**
 * - takes in user input (strings) creates a book object and adds them to an array (myLibrary)
 * @param {string} title - Title of the book to add to library
 * @param {string} author - Author of the book
 * @param {string} pages - How many pages the book has
 * @param {string} read - If the book has bee read or not
 * @return push newBook
 */
function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
}


const form = document.querySelector('.bookForm')

form.addEventListener('submit',(e) =>{
    const data = new FormData(form)
    e.preventDefault();
    const newTitle = data.get('title');
    const newAuthor = data.get('author');
    const newPages = data.get('pages')
    const newRead = data.get('read')
    if (newTitle === "") {
      return window.alert("input a valid Title")
    }
    if (newAuthor === "") {
      return window.alert("input a valid Author")
    }
    if (newPages === "") {
      return window.alert("input a valid Number")
    }
    if (newRead === null) {
      return window.alert("input a valid choice")
    }




    addBookToLibrary(newTitle, newAuthor, newPages, newRead)

    removeBooks()
    displayLibrary()
})

let theHobbitBook = myLibrary[0]
let endersGameBook = myLibrary[1];

function removeBooks () {
    let remove = document.querySelectorAll(".activeBook")
    remove.forEach((oldBook) =>{
        libraryDiv.removeChild(oldBook)
    })
}

function displayLibrary () {
    deleteAll()

    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        const div = document.createElement("div")
        let removeButton = document.createElement('button') 
        let toggle = document.createElement("button");

        // Setting up the div (card)
        div.dataset.index = i;
        div.classList.toggle("activeBook")
        div.textContent = `Title:${book.title}, Author:${book.author}, Pages:${book.pages} pages, Read Status:${book.read}`;
        
        
        // Setup remove button
        removeButton.textContent = "Remove"
        removeButton.addEventListener("click", removeFromLibrary)
        
        // Setup toggle button
        toggle.textContent = "Toggle Read"
        toggle.addEventListener("click", toggleRead)
        
        // Add everything to page
        libraryDiv.appendChild(div)
        div.appendChild(removeButton)
        div.appendChild(toggle)


        
    }
}

/**
 * - takes in an event (click)
 * finds the read status 
 * changes the status 
 * @param {*} e 
 * @returns undefined
 */

function toggleRead (e) {
    let selectRead = myLibrary[e.target.parentNode.dataset.index].read

    if (selectRead == "read") {
        myLibrary[e.target.parentNode.dataset.index].read = "unread"
        
        displayLibrary();
     } else {
        myLibrary[e.target.parentNode.dataset.index].read = "read"

        displayLibrary();
    }

    console.log(selectRead);
}
/**
 * - takes in an event (click), and finds the parent of the element being clicked. 
 * finds the parent node
 * finds the data at index value
 * removes it from page
 * @param {*} e
 * @returns undefined
 */

function removeFromLibrary (e) {
    let removeElement = e.target.parentNode; 
    myLibrary.splice(removeElement.dataset.index, 1)
    libraryDiv.removeChild(removeElement) 
    displayLibrary(); 
}

/**
 * - finds the "library" and sets the content to ""
 */

function deleteAll(){
    let e = document.querySelector(".library");
    e.innerHTML = ""
}


displayLibrary()



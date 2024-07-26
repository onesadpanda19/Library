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

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', '295', 'read')
const endersGame = new Book('Enders Game', 'Orson Scott Card', '324', 'read' )

myLibrary.push(theHobbit)
myLibrary.push(endersGame)
console.log(myLibrary)
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

const form = document.querySelector('.bookForm')

/**look into formData mdm data is undefined */

form.addEventListener('submit',(e) =>{
    const data = new FormData(form)
    // when form is submitted
    e.preventDefault();
    const newTitle = data.get('title');
    const newAuthor = data.get('author');
    const newPages = data.get('pages')
    const newRead = data.get('read')

    addBookToLibrary(newTitle, newAuthor, newPages, newRead)

    console.log(newTitle)
    console.log(newAuthor)  
    console.log(newPages)
    console.log(newRead)
    console.log(myLibrary)

    removeBooks()
    displayLibrary()
})


// on each execution of the loop, grab the matching index (book)
//* add new card for each item looped over, start there
// [hobbit, endersGame]
let theHobbitBook = myLibrary[0]
let endersGameBook = myLibrary[1];

function removeBooks () {
    let remove = document.querySelectorAll(".activeBook")
    remove.forEach((oldBook) =>{
        libraryDiv.removeChild(oldBook)
    })
}

/* Issue:
  When adding a book to the library,
  it duplicates

  Solution:
  Remove old books, before adding new books

  when adding book (.addEventListener) -> check for old books -> remove old books -> displayLibrary()
*/

function displayLibrary () {
    deleteAll()

    for (let i = 0; i < myLibrary.length; i++) {
        // Block executes once for every item in the library
        // Grab each item during the loop iteration
        // Variable i will be the number of the loop, indexed at 0
        let book = myLibrary[i];
        const div = document.createElement("div")
      
        div.dataset.index = i;
        div.classList.toggle("activeBook")
        console.log(book);
        let removeButton = document.createElement('button') 
        removeButton.textContent = "Remove"
        div.textContent = `Title:${book.title}, Author:${book.author}, Pages:${book.pages} pages, Read Status:${book.read}`;
        libraryDiv.appendChild(div)
        div.appendChild(removeButton)
        removeButton.addEventListener("click", removeFromLibrary)
        let toggle = document.createElement("button")
        toggle.textContent = "Toggle Read"
        toggle.addEventListener("click", toggleRead)
        div.appendChild(toggle)
    }
}



function toggleRead (e) {
    let selectRead = myLibrary[e.target.parentNode.dataset.index].read
    console.log(selectRead);
}

/*
 if selectread is "read" then set string equal to "unread"
 if selectread is "unread" then set string equal to "read"


*/

/*  

    Problem: When click remove button, it removes book from page
    1) We have the button
    2) We add an event listener, that will fire when clicking the remove
    3) We have an event handler function
    4) We have a way to get the button being clicked (event.target) removeButton 
    5) We need the parent of removeButton, because that is the book element that we want to remove
    6) We need somehow, inside this function, to link the removeButton being clicked, to the parent (so we can remove the parent)
    7) Google: js how to identify parent element of button being clicked
    8) https://stackoverflow.com/questions/42213858/how-can-i-get-parent-id-by-onclick-on-a-child-in-js

    <div id="rnd()"><button id="myBtn">Click</button></div>
    <script>
        document.getElementById("myBtn").onclick = function(e){
            alert(e.target.parentNode);
        }
    </script>
*/

function removeFromLibrary (e) {
    let removeElement = e.target.parentNode;
    // REMOVE ELEMENT: { dataset: { index: 0 } }
    console.log(removeElement.dataset.index) // 0 || 1
    //      0         1             0
    // [{HOBBIT: 0}, {ENDERS: 1}] -> [{ENDERS: 1}, {NEW: 2}]  LOOP -> [{ENDERS: 0}, {NEW: 1}]
    myLibrary.splice(removeElement.dataset.index, 1)
    // splice mdn to solve 
    console.log(removeElement)
    libraryDiv.removeChild(removeElement) //now i need to remove it from the array
    
    displayLibrary(); //not working, adds things back while trying to delete
    // Only removes one element, then readds all elements back to page, leaving behind whatever other elements there were
    // 1st path: Nuke all elements, then displayLibrary. 2nd: New function, that doesn't readd elements, just fixes the index
}

function deleteAll(){
    let e = document.querySelector(".library");
    e.innerHTML = ""
}

displayLibrary()


/*
let j = 0

while (myLibrary.length > j) {
    let book = myLibrary[j];

    j++
}

const newDataArray = myLibrary.map((book, i) => {
    console.log(book);

    book.data = `This is book number ${i}`

    return book;
});

console.log('NEW ARRAY ', newDataArray);
myLibrary.forEach((book) => {
    console.log(book)

add buttons to remove a book from the library and change read status
});

*/
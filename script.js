const myLibrary = [];
const container = document.querySelector(".container");
const cardContainer = document.querySelector(".card-container");
const addBookBtn = document.querySelector(".add-book button");
const dialog = document.querySelector("dialog");
const inputTitle = dialog.querySelector("#book-title");
const inputAuthor = dialog.querySelector("#book-author");
const inputPages = dialog.querySelector("#book-page-number");
const submitBtn = dialog.querySelector("dialog button");
const checkbox = dialog.querySelector('input[type="checkbox"]');
let title = "";
let author = "";
let pages = "";
let isRead = false;
addBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

submitBtn.addEventListener("click", (e) => {
    if(dialog.querySelector("form").checkValidity()){
        e.preventDefault();
        title = inputTitle.value;
        author = inputAuthor.value;
        pages = inputPages.value;
        isRead = checkbox.checked;
        addBookToLibrary(myLibrary, title, author, pages, isRead);
        dialog.close();
        resetForm();
        displayBook(myLibrary);
    }
});

dialog.addEventListener("close", (e) => {
    document.activeElement.blur();
});

cardContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("read") || e.target.classList.contains("not-read")){
        const readCard = e.target.closest(".card");
        const title = readCard.querySelector(".title").textContent.substring(7);
        if(e.target.classList.contains("read")){
            changeReadState(title, myLibrary);
            e.target.textContent = "Not read"
        }
        else{
            changeReadState(title, myLibrary);
            e.target.textContent = "Read";
        }
        e.target.classList.toggle("read");
        e.target.classList.toggle("not-read");
    }
    else if(e.target.classList.contains("remove")){
        const removeCard = e.target.closest(".card");
        if(removeCard){
            const title = removeCard.querySelector(".title").textContent.substring(7);
            removeFromLibrary(title, myLibrary);
            removeCard.remove();
        }
    }
});

class Book{
    constructor(title, author, pagesNumber, isRead){
        this.title = title;
        this.author = author;
        this.pagesNumber = pagesNumber;
        this.isRead = isRead;
    }
}


function addBookToLibrary(library, title, author, pagesNumber, isRead){
    const book = new Book(title, author, pagesNumber, isRead);
    library.push(book);
}

function displayBook(library){
    const len = library.length;
    const card = document.createElement("div");
    card.classList.add("card");
    const book = document.createElement("div");
    book.classList.add("book");
    const title = document.createElement("div");
    title.classList.add("title");
    const author = document.createElement("div");
    author.classList.add("author");
    const pagesNumber = document.createElement("div");
    pagesNumber.classList.add("pages-number");
    const buttons = document.createElement("div");
    buttons.classList.add("buttons");
    const isRead = document.createElement("button");
    if(library[len-1].isRead === true){
        isRead.classList.add("read");
        isRead.textContent = "Read";
    }
    else if(library[len-1].isRead === false){
        isRead.classList.add("not-read");
        isRead.textContent = "Not read";
    }
    const remove = document.createElement("button");
    remove.classList.add("remove");
    title.textContent = "Title: " + library[len-1].title;
    author.textContent = "Author: " + library[len-1].author;
    pagesNumber.textContent = "Number of Pages: " + library[len-1].pagesNumber;
    remove.textContent = "Remove";
    book.append(title, author, pagesNumber);
    buttons.append(isRead, remove);
    card.append(book, buttons);
    cardContainer.appendChild(card);
}

function changeReadState(title, library){
    library.forEach((book) => {
        if(book.title === title){
            book.isRead = !(book.isRead);
        }
    });
}

function removeFromLibrary(title, library){
    library.forEach((book, index) => {
        if(book.title === title){
            library.splice(index, 1);
        }
    });
}

function resetForm(){
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    checkbox.checked = false;
}






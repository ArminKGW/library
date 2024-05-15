const myLibrary = [];
const container = document.querySelector(".container");
const cardContainer = document.querySelector(".card-container");

addBookToLibrary(myLibrary);
displayBook(myLibrary);


const readButtons = document.querySelectorAll(".read, .not-read");
readButtons.forEach((item) => {
    if(item.classList.contains("read")){
        item.textContent = "Read";
    }
    else if(item.classList.contains("not-read")){
        item.textContent = "Not read";
    }
});
readButtons.forEach((item) => {
    item.addEventListener("click", (event) => {
        item.classList.toggle("read");
        item.classList.toggle("not-read");
        if(item.classList.contains("read")){
            item.textContent = "Read";
        }
        else{
            item.textContent = "Not read";
        }
    });
});


const removeButtons = document.querySelectorAll(".remove");
removeButtons.forEach((item) => {
    item.addEventListener("click", (event) => {
        const removeCard = item.closest(".card");
        if(removeCard){
            removeCard.remove();
        }
    });
});

function Book(title, author, pagesNumber, isRead){
    this.title = title;
    this.author = author;
    this.pagesNumber = pagesNumber;
    this.isRead = isRead;
}


function addBookToLibrary(library){
    const book1 = new Book("book1", "man", 100, true);
    const book2 = new Book("book2", "ali", 200, false);
    const book3 = new Book("book3", "sepehr", 300, true);
    const book4 = new Book("book4", "sobhan", 400, true);
    const book5 = new Book("book5", "majid", 500, false);
    library.push(book1);
    library.push(book2);
    library.push(book3);
    library.push(book4);
    library.push(book5);
}

function displayBook(library){
    for(let i = 0; i < library.length; i++){
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
        if(library[i].isRead === true){
            isRead.classList.add("read");
        }
        else if(library[i].isRead === false){
            isRead.classList.add("not-read");
        }
        const remove = document.createElement("button");
        remove.classList.add("remove");
        title.textContent = "Title: " + library[i].title;
        author.textContent = "Author: " + library[i].author;
        pagesNumber.textContent = "Number of Pages: " + library[i].pagesNumber;
        remove.textContent = "Remove";
        book.append(title, author, pagesNumber);
        buttons.append(isRead, remove);
        card.append(book, buttons);
        cardContainer.appendChild(card);
    }
}






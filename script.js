function Book(title, author, pages) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.status = "done" // initial value for read status
}

const sampleBook = new Book("Harry Potter", "J.K Rowling", 749);

const myLibrary = [
  sampleBook
];

function addBookToLibrary(newBook) {
  myLibrary.push(newBook)
}


const cardContainer = document.querySelector(".card-container");
function renderBook() {
  cardContainer.innerHTML = "";
  myLibrary.forEach((newBook, index) => {
    let statusLabel;

    if(newBook.status === "done"){
      statusLabel = "Done"
    }
    if(newBook.status === "to-read"){
      statusLabel = "To read"
    }
    if(newBook.status === "incomplete"){
      statusLabel = "Incomplete"
    }

    const card = document.createElement("div");
    card.classList.add("card");

    const div1 = document.createElement("div");
    const title = document.createElement("h4");
    title.textContent = "Title"
    const titleResult = document.createElement("div")
    titleResult.classList.add("res-title", "result");
    titleResult.textContent = newBook.title;

    const div2 = document.createElement("div");
    const author = document.createElement("h4");
    author.textContent = "Author"
    const authorResult = document.createElement("div");
    authorResult.classList.add("res-author", "result");
    authorResult.textContent = newBook.author;

    const div3 = document.createElement("div");
    const noOfPages = document.createElement("h4");
    noOfPages.textContent = "No. Of Pages"
    const noOfPagesResult = document.createElement("div")
    noOfPagesResult.classList.add("res-no-of-pages", "result");
    noOfPagesResult.textContent = newBook.pages;

    const div4 = document.createElement("div");
    const cardStatus = document.createElement("h4");
    cardStatus.textContent = "Status";
    const cardStatusResult = document.createElement("div")
    cardStatusResult.classList.add("res-status", "result");
    cardStatusResult.textContent = statusLabel;

    const div5 = document.createElement("div");
    div5.classList.add("button-container");
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-button");
    editBtn.textContent = "EDIT";
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-button")
    removeBtn.textContent = "REMOVE";
    

    removeBtn.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      renderBook();
      console.log("Book Remove")
    })

    div1.appendChild(title);
    div1.appendChild(titleResult);
    div2.appendChild(author);
    div2.appendChild(authorResult);
    div3.appendChild(noOfPages);
    div3.appendChild(noOfPagesResult);
    div4.appendChild(cardStatus);
    div4.appendChild(cardStatusResult);
    div5.appendChild(editBtn);
    div5.appendChild(removeBtn);
    card.appendChild(div1);
    card.appendChild(div2);
    card.appendChild(div3);
    card.appendChild(div4);
    card.appendChild(div5);
    cardContainer.appendChild(card);

  });
}


const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#number-of-pages");
const addBookBtn = document.querySelector(".add-book-btn")


addBookBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const titleValue = inputTitle.value;
  const authorValue = inputAuthor.value;
  const pagesValue = parseInt(inputPages.value, 10);
  const statusValue = document.querySelector('input[name="status"]:checked').value;

  const newBook = new Book(titleValue, authorValue, pagesValue);
  newBook.status = statusValue;
  addBookToLibrary(newBook);
  renderBook();
  
  console.log("Book Added")
  console.log(statusValue)
});


renderBook();

 
function Book(title, author, pages) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.status = "Done" // initial value for read status
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
   
      if(newBook.status === "Done" || newBook.status === "done"){
        statusLabel = "Done"
      }else if(newBook.status === "To read" || newBook.status === "to read"){
        statusLabel = "To read"
      }else if(newBook.status === "Incomplete" || newBook.status === "incomplete"){
        statusLabel = "Incomplete"
      }else {
        statusLabel = "Invalid status"
      }
    
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;

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
    noOfPagesResult.classList.add("res-pages");
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

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "SAVE";
    saveBtn.classList.add("save-button");
    
    editBtn.addEventListener("click", (event) => {
      //Retrieve a specific card
      event.preventDefault();
      const currentBook = myLibrary[index];
      const cardBox = editBtn.closest(".card");
  
      for(let key in currentBook){
        if(currentBook.hasOwnProperty(key)) {
  
          const cardResult = cardBox.querySelector(`.res-${key}`);
  
          const newInput = document.createElement("input");
          newInput.value = currentBook[key];
          newInput.classList.add(`${key}-card-input`, "edit-input");

          if(key === "pages"){
            newInput.type = "number";
            newInput.min = 1;
          }else {
            newInput.type = "text";
          }
          
          if(cardResult){
            cardResult.replaceWith(newInput);
          }
  
          newInput.focus();
  
          newInput.addEventListener("keyup", (event) => {
            if(event.key === "Enter"){
                currentBook[key] = key === "pages" ? parseInt(newInput.value) : newInput.value;
              renderBook();
              
            }  
          });
  
          editBtn.replaceWith(saveBtn);
         
          saveBtn.addEventListener("click", () => {
            currentBook[key] = key === "pages" ? parseInt(newInput.value) : newInput.value;
            renderBook();
          });
        }
      }
  
      console.log("edit button is clicked")
  
    });

    removeBtn.addEventListener("click", () => {
      const dataIndex = card.dataset.index;
      myLibrary.splice(dataIndex, 1);
      renderBook();
      console.log(`Book Remove ${dataIndex}`)
    });

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
const addBookBtn = document.querySelector(".add-book-btn");
const form = document.querySelector("form")

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const titleValue = inputTitle.value;
  const authorValue = inputAuthor.value;
  const pagesValue = parseInt(inputPages.value, 10);
  const statusValue = document.querySelector('input[name="status"]:checked').value;
  const firstStatus = statusValue.split(",")[0].trim();

  const newBook = new Book(titleValue, authorValue, pagesValue);
  newBook.status = firstStatus;
  addBookToLibrary(newBook);
  renderBook();

/*   inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = ""; */
  form.reset();

  console.log("Book Added")
  console.log(statusValue)
});


renderBook();

 
//Constructor function for book. To be able to access the book object in the myLibrary
function Book(title, author, pages) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.status = "Done" // initial value for read status
}

//sample book data to have a initial data and declare it into the myLibrary and this serve as to be the access for book object from book constructor
const sampleBook = new Book("Harry Potter", "J.K Rowling", 749);

//myLibrary array serve as a storage for books data
const myLibrary = [
  sampleBook
];

//addBookToLibrary function. This function use to push or add the new book that is create from form to myLibrary array
function addBookToLibrary(newBook) {
  myLibrary.push(newBook)
}


const cardContainer = document.querySelector(".card-container");
//add a function for the card or book card
function renderBook() {
  cardContainer.innerHTML = ""; // to prevent duplicates
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
    const cardStatusResult = document.createElement("div");
    const statusResContainer = document.createElement("div");
    statusResContainer.classList.add("status-result-box");
    cardStatusResult.classList.add("res-status", "result");
    cardStatusResult.textContent = statusLabel;

    const toggleIconContainer = document.createElement("div");
    toggleIconContainer.style.cssText = `
    background-image: url("assets/images/rotate-3d-variant.svg");
    width: 20px;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
    margin-top: 3px;
    `;

    const div5 = document.createElement("div");
    div5.classList.add("button-container");
   /*  const editBtn = document.createElement("button");
    editBtn.classList.add("edit-button");
    editBtn.textContent = "EDIT"; */

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-button")
    removeBtn.textContent = "REMOVE";

    /* const saveBtn = document.createElement("button");
    saveBtn.textContent = "SAVE";
    saveBtn.classList.add("save-button"); */
    
    //add event listener for the edit button on the card
    /* editBtn.addEventListener("click", (event) => {
      //stops the default behavior of the button. like refreshing the page
      event.preventDefault();
      //gets the information about the specific book that is need to be edited from the library
      const currentBook = myLibrary[index];
      //finds the card on the page that shows the book details 
      const cardBox = editBtn.closest(".card");
      
      //loop through the current book to look for each detail of the book
      for(let key in currentBook){
        // checks if currentBook actually has the property you're looking at
        if(currentBook.hasOwnProperty(key)) {
          //find the spot on the card that shows the book detail(like where the title or number or etc.)
          const cardResult = cardBox.querySelector(`.res-${key}`);
          
          //create a new input element
          const newInput = document.createElement("input");
          //fills the new input element value with the current book information
          newInput.value = currentBook[key];
          //add class name to style the input
          newInput.classList.add("edit-input");

          //checks if the key is pages then the input type is number otherwise the input type is text
          if(key === "pages"){
            newInput.type = "number";
            newInput.min = 1; // input number validation to just have a minimum value and to not allow negative values
          }else {
            newInput.type = "text";
          }
          
          //if the card result exist the replace it with new input element that created earlier
          if(cardResult){
            cardResult.replaceWith(newInput);
          }
          
          //Puts the cursor inside the new input box, so the user can start typing right away.
          newInput.focus();
  
          //add event listener for new input and update the values if the enter key is pressed
          newInput.addEventListener("keyup", (event) => {
            if(event.key === "Enter"){
              currentBook[key] = key === "pages" ? parseInt(newInput.value) : newInput.value;
              renderBook();
              
            }  
          });
          
          //replace the edit button with the save button that has been created before the event listener above
          editBtn.replaceWith(saveBtn);
         
          //add event listener for the save button. To save the edited data after clicking the save button
          saveBtn.addEventListener("click", () => {
            currentBook[key] = key === "pages" ? parseInt(newInput.value) : newInput.value;
            renderBook();
          });
        }
      }
  
      console.log("edit button is clicked")
  
    }); */

    //toggle event listener. Allows the user to change the status by clicking the icon
    toggleIconContainer.addEventListener("click", () => {
      if(cardStatusResult.textContent === "Done" || cardStatusResult.textContent === "done"){
        cardStatusResult.textContent = "To read";
      }else if(cardStatusResult.textContent === "To read" || cardStatusResult.textContent === "to read") {
        cardStatusResult.textContent = "Incomplete";
      }else if(cardStatusResult.textContent === "Incomplete" || cardStatusResult.textContent === "incomplete") {
        cardStatusResult.textContent = "Done"
      }
      console.log("toggle")
      console.log(cardStatusResult.textContent)
    });

    //allows the user to remove a book or a card
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
    //div4.appendChild(cardStatusResult);
    div4.appendChild(statusResContainer);
    //div5.appendChild(editBtn);
    div5.appendChild(removeBtn);
    card.appendChild(div1);
    card.appendChild(div2);
    card.appendChild(div3);
    card.appendChild(div4);
    card.appendChild(div5);
    cardContainer.appendChild(card);
    statusResContainer.appendChild(cardStatusResult);
    statusResContainer.appendChild(toggleIconContainer);

  });
}
 

const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#number-of-pages");
const addBookBtn = document.querySelector(".add-book-btn");
const form = document.querySelector("form")

//form submit event listener
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

//initial render of the renderBook function
renderBook();

 
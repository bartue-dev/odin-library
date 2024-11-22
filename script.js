
const myLibrary = []

class Book {
  constructor (title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = "Done";

    //card container
    this.cardContainer = document.querySelector(".card-container");
  
  }

  addBookToLibrary(newBook) {
    myLibrary.push(newBook)
    console.log(myLibrary)
  }

  renderBook() {
    this.cardContainer.innerHTML = ""; // to prevent duplicates
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
  
      const removeBtn = document.createElement("button");
      removeBtn.classList.add("remove-button")
      removeBtn.textContent = "REMOVE";
  
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
        this.renderBook();
        console.log(`Book Remove ${dataIndex}`)
      });
  
      div1.appendChild(title);
      div1.appendChild(titleResult);
      div2.appendChild(author);
      div2.appendChild(authorResult);
      div3.appendChild(noOfPages);
      div3.appendChild(noOfPagesResult);
      div4.appendChild(cardStatus);
      div4.appendChild(statusResContainer); 
      div5.appendChild(removeBtn);
      card.appendChild(div1);
      card.appendChild(div2);
      card.appendChild(div3);
      card.appendChild(div4);
      card.appendChild(div5);
      this.cardContainer.appendChild(card);
      statusResContainer.appendChild(cardStatusResult);
      statusResContainer.appendChild(toggleIconContainer);
  
    });
  }

}

const book = new Book("Harry Potter", "J.K Rowling", 749);
book.addBookToLibrary(book);
book.renderBook();


class HandleForm {
  constructor(formClassName) {
    this.form = document.querySelector(formClassName);
    this.inputTitle = document.querySelector("#title");
    this.inputAuthor = document.querySelector("#author");
    this.inputPages = document.querySelector("#number-of-pages");
    this.addBookBtn = document.querySelector(".add-book-btn");
    this.form = document.querySelector("form");
    this.errorTitle = document.querySelector(".error-title");
    this.errorAuthor = document.querySelector(".error-author");
    this.errorPages = document.querySelector(".error-pages");
    


    this.inputNumValidation();
    this.eventListeners();
  }

  eventListeners() {
    this.form.addEventListener("submit", (event) => {

        this.inputValidation();

        event.preventDefault();

        const titleValue = this.inputTitle.value;
        const authorValue = this.inputAuthor.value;
        const pagesValue = parseInt(this.inputPages.value, 10);
        const statusValue = document.querySelector('input[name="status"]:checked').value;
        const firstStatus = statusValue.split(",")[0].trim();
  
        const newBook = new Book(titleValue, authorValue, pagesValue);
        newBook.status = firstStatus;
        newBook.addBookToLibrary(newBook);
        newBook.renderBook();
  
        this.form.reset();
  
        console.log("Book Added");
      
      
    });
  }

  inputNumValidation() {
    this.inputPages.addEventListener("keyup", () => {
      if(this.inputPages.validity.rangeUnderflow){
        this.inputPages.setCustomValidity("Invalid number of Pages")
      }else {
        this.inputPages.setCustomValidity("");
      }
    });
  }

  inputValidation() {
    let isValid = true;

    if (this.inputTitle.value === "") {
        this.errorTitle.classList.add("error");
        isValid = false;
    } else {
      this.errorTitle.classList.remove("error");
    }

    if (this.inputAuthor.value === "") {
      this.errorText.classList.add("error");
      isValid = false;
    } else {
    this.errorText.classList.remove("error");
    }

    if (this.inputPages.value === "") {
      this.errorPages.classList.add("error");
      isValid = false;
    } else {
      this.errorPages.classList.remove("error");
    }

    return isValid;
  }
}

const myForm = new HandleForm("form")


 
let myLibrary = []; //stores data of the objecys into the array
let tb1 = document.getElementById("tableBody");

if(localStorage.getItem('myLibrary')) {//for retrieving saved items on lines 4 - 9
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
} 

render();
localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

function Book(title, author, pages, read){ // the constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

}

function addBookToLibrary(){ //function takes in user input and stores the new object into an array
    let title_value = title.value;
    let author_value = author.value;
    let pages_value = pages.value;
    let read_value = read.value;
   
    myLibrary.push(new Book (title_value, author_value, pages_value, read_value));
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));//saves value into local storage
    render(); //passes through render function
}

function render(){
    let tb1 = document.getElementById("tableBody");

    while (tb1.firstChild) {
      tb1.removeChild(tb1.firstChild);
    }
  
    myLibrary.forEach((book, index) => {//prints each book element into table
      let row = tb1.insertRow(index);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      

      cell1.innerHTML = book.title;
      cell2.innerHTML = book.author;
      cell3.innerHTML = book.pages;
      cell4.innerHTML = renderBookIsReadButton(book.read, index);

      cell5.innerHTML = `<button class="delete-button button-hover"onclick="removeBook(${index})">Delete</button>`;
     
    }) 
}

function toggleIsBookRead(index){
    book.read = !book.read;
    myLibrary[index] = book;
    render();
}

function removeBook(index){//removes book from list on table and in local storage
    myLibrary.splice(index, 1);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    render();
}

function renderBookIsReadButton(isRead, index) {
    let readButton = '';
    if(isRead) {
      readButton = `<button onclick="toggleIsBookRead(${index})" class="read-button button-hover" id="book_${index}">Read</button>`; 
    } else {
      readButton = `<button onclick="toggleIsBookRead(${index})" class="not-read-button button-hover" id="book_${index}">Not Read</button>`; 
    }
    return readButton;
  }

  function toggleIsBookRead(index) { //function toggles read/not read button
    let book = myLibrary[index]; 
    book.read = !book.read; 
    myLibrary[index] = book; 
    render();
  }

//Get the modal
let modal = document.getElementById("myModal");

//Button opens up the modal
let addBookBtn = document.getElementById("addBook");

//closes modal
let span = document.getElementsByClassName("close")[0];

//when user clicks the button it opens up the modal
addBookBtn.onclick = function() {
    modal.style.display = "block";
}

//When user clicks on the x, it closes the modal
span.onclick = function() {
    modal.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

function clear(){
    title.value = "";
    author.value ="";
    pages.value = "";
    read.value = "Select";
    
}


  //Declare submit button from modal
  let submitBtn = document.getElementById("submit");
  let title = document.getElementById("bookTitle");
  let author = document.getElementById("Author");
  let pages = document.getElementById("Pages");
  let read = document.getElementById("Read");
 
 
  
  
  
  
  
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addBookToLibrary();
    modal.style.display = "none";
    clear();
  });






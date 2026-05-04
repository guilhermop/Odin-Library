console.log("JS file is loading");

const myLibrary = [];

function Book(title, author, pages, recommendation, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.recommendation = recommendation;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, recommendation, read) {
    const newBook = new Book(title, author, pages, recommendation, read);
    myLibrary.push(newBook);
}

function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    myLibrary.splice(index, 1);
    displayBooks();
}

function displayBooks() {
    const libraryDiv = document.getElementById("library");
    libraryDiv.innerHTML = "";

    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-id", book.id);

        card.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Recommended:</strong> ${book.recommendation ? "Yes" : "No"}</p>
            <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
            <button class="toggleReadBtn" data-id="${book.id}">${book.read ? "Mark Unread" : "Mark Read"}</button>
            <button class="removeBtn" data-id="${book.id}">Remove</button>
        `;

        libraryDiv.appendChild(card);
    });
}

// --- DIALOG ---
const dialog = document.getElementById("bookDialog");
const newBookBtn = document.getElementById("newBookBtn");
const cancelBtn = document.getElementById("cancelBtn");
const bookForm = document.getElementById("bookForm");

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    dialog.close();
});

// --- SINGLE CLICK LISTENER ---
document.getElementById("library").addEventListener("click", (event) => {
    const id = event.target.getAttribute("data-id");

    if (event.target.classList.contains("removeBtn")) {
        removeBook(id);
    }

    if (event.target.classList.contains("toggleReadBtn")) {
        const book = myLibrary.find(book => book.id === id);
        book.toggleRead();
        displayBooks();
    }
});

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const recommendation = document.getElementById("recommendation").checked;
    const read = document.getElementById("read").checked; // ✓

    addBookToLibrary(title, author, pages, recommendation, read);
    displayBooks();

    bookForm.reset();
    dialog.close();
});

// --- INITIAL BOOKS ---
addBookToLibrary("1984", "Orwell", 328, true, true);
addBookToLibrary("Life and death of a fool", "Erasmus", 498, true, false);
addBookToLibrary("The Hobbit", "Tolkien", 310, true, true);

console.log(myLibrary);
displayBooks();
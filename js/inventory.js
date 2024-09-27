// Fetch books and populate inventory list
function fetchBooks() {
  fetch('http://localhost:8080/books')
    .then(response => response.json())
    .then(books => {
      const inventoryList = document.getElementById('inventory-list');
      inventoryList.innerHTML = ''; // Clear previous list

      books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.innerHTML = `
                    <p><strong>${book.title}</strong> by ${book.author} (ISBN: ${book.isbn}) - $${book.price}</p>
                    <button onclick="editBook(${book.id})">Edit</button>
                    <button onclick="deleteBook(${book.id})">Delete</button>
                `;
        inventoryList.appendChild(bookItem);
      });
    });
}

// Call fetchBooks on page load
document.addEventListener('DOMContentLoaded', fetchBooks);

// Add new book functionality
document.getElementById('add-book-button').addEventListener('click', () => {
  document.getElementById('book-form').style.display = 'block';
  document.getElementById('form-title').textContent = 'Add New Book';
  clearForm();
});

document.getElementById('save-book-button').addEventListener('click', () => {
  const book = {
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    isbn: document.getElementById('isbn').value,
    price: document.getElementById('price').value
  };

  fetch('http://localhost:8080/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(book)
  })
    .then(() => {
      clearForm();
      fetchBooks(); // Refresh list after adding book
    });
});

function editBook(id) {
  fetch(`http://localhost:8080/books/${id}`)
    .then(response => response.json())
    .then(book => {
      document.getElementById('title').value = book.title;
      document.getElementById('author').value = book.author;
      document.getElementById('isbn').value = book.isbn;
      document.getElementById('price').value = book.price;
      document.getElementById('form-title').textContent = 'Edit Book';
      document.getElementById('book-form').style.display = 'block';
      document.getElementById('save-book-button').onclick = function() {
        updateBook(id);
      };
    });
}

function updateBook(id) {
  const updatedBook = {
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    isbn: document.getElementById('isbn').value,
    price: document.getElementById('price').value
  };

  fetch(`http://localhost:8080/books/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedBook)
  })
    .then(() => {
      clearForm();
      fetchBooks(); // Refresh list after updating book
    });
}

function deleteBook(id) {
  fetch(`http://localhost:8080/books/${id}`, {
    method: 'DELETE'
  })
    .then(() => fetchBooks()); // Refresh list after deleting book
}

function clearForm() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
  document.getElementById('price').value = '';
  document.getElementById('book-form').style.display = 'none';
}

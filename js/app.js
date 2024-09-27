document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:8080/books')
    .then(response => response.json())
    .then(books => {
      const booksContainer = document.getElementById('books');
      books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.innerHTML = `<strong>${book.title}</strong> by ${book.author} - $${book.price}`;
        booksContainer.appendChild(bookDiv);
      });
    })
    .catch(error => console.error('Error fetching books:', error));
});

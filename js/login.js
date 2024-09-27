document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => {
      if (response.ok) {
        window.location.href = 'index.html';
      } else {
        alert('Login failed. Please try again.');
      }
    })
    .catch(error => console.error('Login error:', error));
});

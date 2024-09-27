document.getElementById('recovery-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const newPassword = document.getElementById('newPassword').value;

  fetch('http://localhost:8080/recover-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, newPassword })
  })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Error:', error));
});

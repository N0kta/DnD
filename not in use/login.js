const form = document.getElementById('log-form')
form.addEventListener('submit', loginUser);

async function loginUser(event) {
  event.preventDefault();

  const name = document.getElementById('LName').value

  await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name
    })
  }).then((res) => res.json())
}
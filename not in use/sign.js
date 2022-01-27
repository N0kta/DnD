const form = document.getElementById('sign-form')
form.addEventListener('submit', signup);

async function signup(event) {
  event.preventDefault();

  const name = document.getElementById('Sname').value
  console.log('of')

  await fetch('/api/sign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name
    })
  }).then((res) => res.json())
}
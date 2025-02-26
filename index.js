const query = document.querySelector('#query');
const data = document.querySelector('#data')
const submit = document.querySelector('#submit');
const content = document.querySelector('.result');

submit.addEventListener("click", async (e) => {
  e.preventDefault();
  const queryData = query.value;
  const data = await fetch('http://localhost:3000/chat', {
    method: 'POST',
    headers: {
      "Content-Type": "text/plain",
    },
    body: queryData
  })
    .then((response) => { return response.json() })
    .then((result) => { content.innerHTML = `<p>${result.data}</p>` })
})
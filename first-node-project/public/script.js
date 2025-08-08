document.getElementById('fetchData').addEventListener('click', () => {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            document.getElementById('data').innerText = data.message;
        })
        .catch(error => console.log('Error:', error));
});

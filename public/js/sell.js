// collect value from the sell from
// send a post request to the API endpoint
// if succesful, redirect to the family page

const sellFormHandler = async (event) => {
    event.preventDefautl();

    const family = document.querySelector('#id').value;
    const instrumentName = document.querySelector('#instrument-name').value;
    const description = document.querySelector('#description').value;
    const image = document.querySelector('#myfile').value;
    const price = document.querySelector('#price').value;

    if (family && instrumentName && description && image && price) {
        const response = await fetch ('api/sell', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/family');
          } else {
            alert(response.statusText);
          }
    }
};

document
    .querySelector('.sell-form')
    .addEventListener('submit', loginFormHandler);
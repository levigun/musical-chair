// collect value from the sell from
// send a post request to the API endpoint
// if succesful, redirect to the family page
    console.log("hi");
const sellFormHandler = async (event) => {
    console.log("hello");
    event.preventDefault();

    const family_id = document.querySelector('#family').value;
    const instrument_name = document.querySelector('#instrument-name').value;
    const description = document.querySelector('#description').value;
    //const image = document.querySelector('#myfile').value;
    const price = document.querySelector('#price').value;

    console.log(family_id, instrument_name, description, price);

    if (family_id && instrument_name && description && price) {
        const response = await fetch ('api/sell', {
            method: 'POST',
            body: JSON.stringify({ family_id, instrument_name, description, price }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/family');
          } else {
            alert(response.statusText);
          }
    }
};
console.log(document.querySelector('.sell-form'));
document.querySelector('.sell-form').addEventListener('submit', sellFormHandler)
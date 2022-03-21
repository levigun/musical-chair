// collect value from the sell from
// send a post request to the API endpoint
// if succesful, redirect to the family page
const sellFormHandler = async (event) => {
  console.log("hello");
  event.preventDefault();

  const payload = {
    family_id: document.querySelector('#family').value,
    instrument_name: document.querySelector('#instrument-name').value,
    description: document.querySelector('#description').value,
    price: document.querySelector('#price').value,
  }

  

  /// form data
  const formData = new FormData();

  for (const key in payload) {

    const value = payload[key];
    if (!value) {
      throw new Error(key + ' must be filled!');
      // notify the user to fill in all fields
    }
    formData.append(key, value);
  }

  const image = document.querySelector('#myfile').files[0];

  if (!image) {
    alert('fill in img u fucked up');
    return;
  }

  formData.append('image', image);

  
  console.log(formData);

  
  const response = await fetch('/api/sell', {
    method: 'POST',
    body: formData,
    // headers: { 'Content-Type': 'multipart/form-data', 'Accept': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/family');
  } else {
    alert(response.statusText);
  }

};
console.log(document.querySelector('.sell-form'));
document.querySelector('.sell-form').addEventListener('submit', sellFormHandler)
const axios = require('axios');

// Function to make the API request using a Promise
function getUserData() {
  return new Promise((resolve, reject) => {
    axios.get('https://randomuser.me/api/')
      .then(response => {
        resolve(response.data.results[0]); // Resolve with the first user data object
      })
      .catch(error => {
        reject(error); // Reject with the error if the API call fails
      });
  });
}

// Function to handle the success message
function handleSuccess(data) {
  console.log('API call succeeded!');
  console.log('User Data:', data);
}

// Function to handle the error message
function handleError(error) {
  console.error('API call failed!');
  console.error('Error:', error.message);
}

// Calling the API and handling the result using Promises
getUserData()
  .then(handleSuccess)
  .catch(handleError);

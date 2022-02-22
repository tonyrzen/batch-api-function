const axios = require('axios');
const data = require('./data');
// Import what you need here from the batchVariables file that you create


// Set the initial delay and increment dependant on rate-limiting
let delay = 0;
const increment = 1200;

/**
 * 
 * @param {Array|Strings} arr 
 * @description used to run batch API calls that should be on a timer or throttled to prevent DDOS.
 */
async function batchApi(arr, url, config) {
  // an empty array to house our promises
  const promises = [];

  // We must map through the array and build a promise for each item || object in the array
  arr.map((item) => {
    const call = new Promise((resolve) => setTimeout(resolve, delay)).then(
      async () => {
        try {
          await axios
            // This URL should be modified as necessary.
            .get(`${url}`, config)
            .then((res) => console.log(res.data.email === item.account_name ? 'valid' : 'invalid'))
        } catch (error) {
            console.log(error.message)
        }
      }
    );
    
    // increment the delay
    delay += increment;

    // insert new promise into the promise array
    promises.push(call);
  });

  // call all promises with Promise.all()
  Promise.all(promises);
}

// Don't forget to call your function with the correct data and config variables

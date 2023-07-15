import axios from 'axios';

var connectionString = 'http://elysium.azurewebsites.net/api/Village';
// api endpoint: http://elysium.azurewebsites.net/api/Village

export const getVillages = () =>{
    axios.get(connectionString)
    .then(response => {
        // Handle the response data
        console.log(response.data);
        return response.data;
    })
    .catch(error => {
        // Handle any errors
        console.error(error);
    });
}
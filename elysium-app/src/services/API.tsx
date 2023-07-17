import { Village } from '../models/Village';


var connectionString = 'http://elysium.azurewebsites.net/api/Village';


export const getVillages = async (): Promise<Village[]> => {
    const response = await fetch(connectionString);
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.json();
    console.log(data);
    return data;
}



  
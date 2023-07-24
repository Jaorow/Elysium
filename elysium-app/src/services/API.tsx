import { Village } from '../models/Village';


var connectionString = 'http://elysium.azurewebsites.net/api/';


const getVillages = async (): Promise<Village[]> => {
    const response = await fetch(connectionString + "Village");
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.json();
    console.log(data);
    return data;
}

const getLogin = async (username: string, password: string): Promise<boolean> => {
    if (username === "test" && password === "test"){
        return true;
    } else {
        return false;
    }
    // const response = await fetch(connectionString + "Users");
    // if (!response.ok) {
    //     throw new Error(response.statusText);
    // }

    // const data = await response.json();
    // console.log(data);
    // return data;
}

export { getVillages, getLogin };
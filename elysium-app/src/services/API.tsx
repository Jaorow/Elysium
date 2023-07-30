import { Village } from '../models/Village';


// var connectionString = 'http://elysium.azurewebsites.net/api/';
var connectionString = 'http://localhost:5129/api/';

const getVillages = async (): Promise<Village[]> => {
    const response = await fetch(connectionString + "Village");
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.json();
    console.log(data);
    return data;
}

interface LoginResponse {
    isLoggedIn: boolean;
    jwt: string;
  }
  
  const getLogin = async (username: string, password: string): Promise<LoginResponse> => {
    if (username === "test" && password === "test") {
      // Replace the 'test' value with the actual JWT obtained from your server
      const jwt = "test";
      return { isLoggedIn: true, jwt };
    } else {
      return { isLoggedIn: false, jwt: "" };
    }
  };
  
    // const response = await fetch(connectionString + "Users");
    // if (!response.ok) {
    //     throw new Error(response.statusText);
    // }

    // const data = await response.json();
    // console.log(data);
    // return data;

export { getVillages, getLogin };
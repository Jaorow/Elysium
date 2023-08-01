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
  
  interface registerResponse {
	exists: boolean;
	jwt: string;
  }


  const postNewUser = async (username: string, password: string): Promise<registerResponse> => {
	const usernames = await fetch(connectionString + "usernames");
  
	if (username in usernames) {
	  return { exists: true, jwt: "",};

	} if (username !in usernames) {
		fetch(connectionString+"User", {
			// Update this URL to match your endpoint
			method: "POST",
			// Origin: "http://localhost:5127",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
				"username": username,
				"password": password,
				"jwt": generateRandomString(64),
			}),
		  })
			.then((response) => response.json())
			.then((data) => {
			  console.log("Register Success:", data);
			  return { exists: false, jwt: data.jwt,};
			})
			.catch((error) => {
			  console.error("There was an error!", error);
			  // Handle error (e.g., show an error message to the user)
			});
	  return { exists: false, jwt: "",};
	}

	return { exists: false, jwt: "",};

  }
  function generateRandomString(length: number) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let randomString = '';
	for (let i = 0; i < length; i++) {
	  const randomIndex = Math.floor(Math.random() * characters.length);
	  randomString += characters.charAt(randomIndex);
	}
	return randomString;
  }

export { getVillages, getLogin };
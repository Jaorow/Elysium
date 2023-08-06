import { Village } from '../models/Village';


var connectionString = 'http://elysium2.azurewebsites.net/api/';
// var connectionString = 'http://localhost:5129/api/';

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
	username: string;
  }

  interface User{
	username: string;
	password: string;
	jwt: string;
	villages: Village[];
  }

  const getLogin = async (username: string, password: string): Promise<LoginResponse> => {

	const response = await fetch(connectionString + "User/username/"+username);

	console.log("Login endpoint called")
	if (!response.ok) {
	  	console.log("Login failed as response not ok")
		return { isLoggedIn: false, jwt: "", username: "" };
	}

	const data = await response.json();
	const user: User = data as User;

	console.log(user);

	if (user.password === password) {
	  // Replace the 'test' value with the actual JWT obtained from your server
	  const jwt = user.jwt;
	  console.log("Login successful - "+{ isLoggedIn: true, jwt: jwt, username: username })
	  return { isLoggedIn: true, jwt: jwt, username: username };
	} else {
	  return { isLoggedIn: false, jwt: "", username: "" };
	}
  };

  const getJwtForUser = async (username: string): Promise<string> => {
	const response = await fetch(connectionString + "User/username/"+username);
	const data = await response.json();
	const user: User = data as User;
	return user.jwt;
  }


  interface registerResponse {
	exists: boolean;
	jwt: string;
	username : string;
  }


  const postNewUser = async (username: string, password: string): Promise<registerResponse> => {
	console.log("new user being posted");
  
	try {
	  const usernamesResponse = await fetch(connectionString + "User/usernames");
	  const usernames: string[] = await usernamesResponse.json();
	  const jwt = generateRandomString(64);
	  console.log(usernames);

	  if (usernames.includes(username)) {
		console.log("Username already exists");
		return { exists: true, jwt: "", username : "" };

	  } else {
		console.log("Username does not exist");
		const response = await fetch(connectionString + "User", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({
			username: username,
			password: password,
			jwt: jwt,
		  }),
		});
  
		const data = await response.json();
		console.log("Register Success:", data);
		return { exists: false, jwt: data.jwt, username: username };
	  }
	} catch (error) {
	  console.error("There was an error!", error);
	  // Handle error (e.g., show an error message to the user)
	  return { exists: false, jwt: "", username : "" };
	}
  };


  function generateRandomString(length: number) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let randomString = '';
	for (let i = 0; i < length; i++) {
	  const randomIndex = Math.floor(Math.random() * characters.length);
	  randomString += characters.charAt(randomIndex);
	}
	return randomString;
  }

//   const postNewUser = async (username: string, password: string): Promise<registerResponse> => {

  const addToFaves = async (villageId: number, username: string) => {
		// POST: api/User/bob/village/1
		console.log("add to faves called");
		const response = await fetch(connectionString + "User/username/"+username+"/FavoriteVillage/"+villageId, {
			method: "POST",
			});
		console.log(response);
		// alert(response.json());


	// console.log("add to faves called");
	// const response = await fetch(connectionString + "Village/"+id);

	// alert(response.json());
  }  

//   Get user at /api/User/username/{username}
  const getUser = async (username: string): Promise<User> => {
	try {
		const response = await fetch(connectionString + "User/username/"+username);
		const data = await response.json();
		const user: User = data as User;
		return user;
	} catch (error) {
		console.error("There was an error!", error);
		// Handle error (e.g., show an error message to the user)
		return { username: "", password: "", jwt: "", villages: [] };
	}

  }

export {getVillages, getLogin, getJwtForUser, postNewUser, addToFaves, getUser};
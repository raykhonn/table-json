import { User } from "./types";

const endPoint = "https://jsonplaceholder.typicode.com/users";

export const delay = (time = 2000) => new Promise((res) => setTimeout(res, time));

export const getUsers = async () => {
	await delay(2000); 

	const res = await fetch(endPoint);
	const users: User[] = await res.json();
	return users;
};

export const getUser = async (userID: string) => {
	await delay(2000);

	const res = await fetch(`${endPoint}/${userID}`);
	const user: User = await res.json();
	return user;
};



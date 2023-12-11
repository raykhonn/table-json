import "./main.css";
import { getUser, getUsers } from "./user";
import { User } from "./types";

const usersContainer = document.getElementById("users");
const userContainer = document.getElementById("user");
const loader = document.querySelector(".loader");

function allUsers(users: User[]) {
  const tbody = usersContainer.querySelector("tbody");
  const title = usersContainer.querySelector("#title");
  tbody.innerHTML = "";
  title.innerHTML = `Users List - ${users.length} users`;

  const fragment = document.createDocumentFragment();
  for (const { id, username, email, address, website } of users) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
							<td>${id}</td>
							<td>${username}</td>
							<td>${email}</td> 
							<td>${website}</td>
							<td>${address.city}</td>
		`;

    const td = document.createElement("td");

    const infoBtn = document.createElement("button");
    infoBtn.classList.add("btn", "btn-info", "me-2");
    infoBtn.innerText = "Info";
    infoBtn.onclick = () => (location.href = `${location.origin}?userID=${id}`);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-danger");
    deleteBtn.innerText = "Delete";

    deleteBtn.onclick = () => {
      const filteredUsers = users.filter((user) => user.id !== id);
      allUsers(filteredUsers);
    };

    td.append(infoBtn, deleteBtn);
    tr.append(td);
    fragment.append(tr);
  }

  tbody.append(fragment);
}

function oneUser({ id, username, email, address, website }: User) {
  const tbody = userContainer.querySelector("tbody");
  const title = userContainer.querySelector("#title");
  tbody.innerHTML = "";
  title.innerHTML = `Username: ${username}`;

  const tr = document.createElement("tr");
  tr.innerHTML = `
							<td>${id}</td>
							<td>${username}</td>
							<td>${email}</td>
							<td>${website}</td>
							<td>${address.city}</td>
		`;

  tbody.append(tr);
}

async function init() {
  const userID = location.search.split("?userID=")[1];

  if (userID) {
    const user = await getUser(userID);
    loader.classList.add("d-none");
    userContainer.classList.remove("d-none");
    oneUser(user);
  } else {
    const users = await getUsers();
    loader.classList.add("d-none");
    usersContainer.classList.remove("d-none");
    allUsers(users);
  }
}

init();

const p = new Promise((resolve, reject) => {
  reject(new Error("Something went wrong"));
});

p.then((response) => {
  console.log("response = ", response);
})
  .then((res) => {
    console.log("res = ", res);
  })
  .catch((reason) => {
    console.log("reason = ", reason);
  });

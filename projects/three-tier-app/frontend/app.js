const API_URL = "/api/users";

const userForm = document.getElementById("userForm");
const userList = document.getElementById("userList");

// Load users from backend
async function loadUsers() {
    try {
        const response = await fetch(API_URL);
        const users = await response.json();

        userList.innerHTML = "";

        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.name} - ${user.email}`;
            userList.appendChild(li);
        });
    } catch (error) {
        console.error("Could not load users:", error);
    }
}

// Add a new user
userForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email })
        });

        if (!response.ok) {
            throw new Error("Could not add user");
        }

        userForm.reset();
        loadUsers();

    } catch (error) {
        alert(error.message);
    }
});

// Load users when page opens
loadUsers();

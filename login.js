const form = document.getElementById("loginForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("All fields are required");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.status === 200) {
      alert("Login Successful ✅");
    } 
    else if (response.status === 401) {
      alert("Wrong Password ❌");
    } 
    else if (response.status === 404) {
      alert("User Not Found ❌");
    } 
    else {
      alert(data.message);
    }

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
});
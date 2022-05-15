function logout() {
	sessionStorage.setItem("email", "");
	window.location.replace("login.html");
	alert("You have been logged out of your account.")
}


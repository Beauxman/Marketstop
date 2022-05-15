function login() {
	let semail = document.getElementById("email").value
	let spassword = document.getElementById("password").value
	
	const xhr = new XMLHttpRequest()
	xhr.open('GET', `http://localhost:3000/api/accounts?email=${semail}&password=${spassword}`)
	xhr.responseType = 'json'
	
	const stObj = {email: semail, password: spassword};
	
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response)
			if (this.response.length > 0)
			{
				alert("Logging in.")
				sessionStorage.setItem("email", this.response[0].email);
				window.location.replace("browse.html");
			}
			else
			{
				alert("Invalid credentials.")
			}
		}
	}

	xhr.send(null)
}


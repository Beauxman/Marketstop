function view() {
	if (sessionStorage.getItem("email") == null || sessionStorage.getItem("email") == "")
	{
		alert("Please login before browsing.")
		window.location.replace("login.html")
	}
	
	let params = new URLSearchParams(document.location.search);
	let title = params.get("title");
	criteria = title
	
	const xhr = new XMLHttpRequest()
	xhr.open('GET', `http://localhost:3000/api/posts?title=${criteria}`)
	xhr.responseType = 'json'
	
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response)
			
			document.getElementById("title").innerText = this.response[0].title
			document.getElementById("price").innerText = this.response[0].price
			document.getElementById("location").innerText = this.response[0].location
			document.getElementById("image").src = this.response[0].image
			document.getElementById("description").innerText = this.response[0].description
		}
	}

	xhr.send(null)
}


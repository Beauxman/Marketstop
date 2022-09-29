function browse() {
	if (sessionStorage.getItem("email") == null || sessionStorage.getItem("email") == "")
	{
		alert("Please login before browsing.")
		window.location.replace("login.html")
	}
	
	const xhr = new XMLHttpRequest()
	xhr.open('GET', `http://localhost:3000/api/posts/all`)
	xhr.responseType = 'json'
	
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response)
			
			for (let i = 0; i < this.response.length; i++) { 
				main = document.getElementById("main")
				div = document.createElement("div")
				img = document.createElement("img")
				title = document.createElement("a")
				
				div.innerText = "";
				div.className = "col-sm-3"
				div.style = "height: 250px; margin-bottom: 50px;"
				img.style = "height: 80%; width: 100%;"
				main.appendChild(div)
				
				img.src = this.response[i].image
				div.appendChild(img)
				
				title.innerText = this.response[i].title
				title.href = `view.html?title=${this.response[i].title}`
				div.appendChild(title)
			}
			
		}
	}

	xhr.send(null)
}


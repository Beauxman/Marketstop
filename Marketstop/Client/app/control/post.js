function post() {
	let stitle = document.getElementById("title").value
	let sprice = document.getElementById("price").value
	let slocation = document.getElementById("location").value
	let sdescription = document.getElementById("description").value
	let simage = document.getElementById("image").value
	
	console.log(`test: ${stitle} ${sprice} ${slocation} ${sdescription} ${simage}`)
	console.log("sending request:")
	
	const xhr = new XMLHttpRequest()
	xhr.open('POST', 'http://localhost:3000/api/posts')
	const stObj = {title: stitle, price: sprice, location: slocation, description: sdescription, image: simage};

	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.onreadystatechange = function() {
		if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			window.location.replace("browse.html");
			alert("Post successful.")
		}
	}
	const jsonStr = JSON.stringify(stObj)
	console.log(jsonStr)
	xhr.send(jsonStr)
}


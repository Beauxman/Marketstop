
document.getElementById('newStudent').addEventListener('click', function(event){
	event.preventDefault()
	const xhr = new XMLHttpRequest()
	xhr.open('GET', 'http://localhost:4020/newStudent.html')

	xhr.responseType = 'text'
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response)
			
			// 2. Use DOM API to populate the <body> section of index.html
			const body = document.getElementsByTagName('body')[0]
			body.innerHTML = this.response 
		}
	}
	xhr.send()
		
})

function goDetails(id) {
	console.log('Calling goDetails function ...' + id)
	const xhr = new XMLHttpRequest()
	xhr.open('GET', `http://localhost:3000/api/students/${id}`)
	xhr.responseType = 'json'
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response)
			const context = this.response
			const xhr1 = new XMLHttpRequest()
			xhr1.open('GET', 'http://localhost:4020/studentDetail.tbs')
			xhr1.responseType = 'text'
			xhr1.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					const body = document.getElementsByTagName('body')[0]
					console.log(this.response)
					const template = Handlebars.compile(this.response)
					console.log('Before: ' + context[0].dob)
					context[0].dob = context[0].dob.substring(0, 10)
					console.log('After: ' + context[0].dob)
					const html = template(context[0]) 
					console.log(html) 
					body.innerHTML = html 					
				}
			}	
			xhr1.send()
		}
	}
	xhr.send()
}

document.getElementById('studentList').addEventListener('click', function(event){
	event.preventDefault()
	console.log('studentList link clicked')
	// 
	const xhr = new XMLHttpRequest()
	xhr.open('GET', 'http://localhost:3000/api/students')
	xhr.responseType = 'json'
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response)
			const context = {students: this.response}
			const body = document.getElementsByTagName('body')[0]
			body.innerHTML = '' 
			// Handlebars implementation
			const xhr1 = new XMLHttpRequest()
			xhr1.open('GET', 'http://localhost:4020/studentList.tbs')
			xhr1.responseType = 'text'
			xhr1.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					const tFile = this.response
					const template = Handlebars.compile(tFile)
					const html = template(context)
					body.innerHTML = html 
					// Add Event Listener to links 
					const links = document.getElementsByTagName('a')
					for (const l of links) {
						l.addEventListener('click', function(event) {
							event.preventDefault()
							console.log(event.target.innerText)
							goDetails(event.target.innerText)
						})
					}
				}
			}
			xhr1.send()
		}
	}
	xhr.send()
})
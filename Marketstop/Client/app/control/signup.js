//For entering Phone

function changePhone1(){
    const phone1 = document.getElementById("phone1").value 
    if(phone1.length === 3){
        document.getElementById("phone2").focus();
    }
}
function changePhone2(){
    const phone2 = document.getElementById("phone2").value 
    if(phone2.length === 4){
        document.getElementById("phone3").focus();
    }
}
function changePhone3(){
    const phone3 = document.getElementById("phone3").value 
    if(phone3.length === 4){
      document.getElementById("sendMessage").focus();
      document.getElementById("sendMessage").setAttribute("style","background-color:#ffffcc;")
      document.getElementById("sendMessage").disabled = false;
    }
}

// 2-factor varification
function initButton(){
  document.getElementById("sendMessage").disabled = true;
  document.getElementById("completion").disabled = true;
  document.getElementById("certificationNumber").innerHTML = "000000";
  document.getElementById("timeLimit").innerHTML = "03:00";
  document.getElementById("sendMessage").setAttribute("style","background-color:none;")
  document.getElementById("completion").setAttribute("style","background-color:none;")
}

let processID = -1;

const getToken = () => {

  
  document.getElementById("completion").setAttribute("style","background-color:#ffffcc;")
  document.getElementById("completion").disabled = false;

  if (processID != -1) clearInterval(processID);
  const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  document.getElementById("certificationNumber").innerText = token;
  let time = 180;
  processID = setInterval(function () {
    if (time < 0 || document.getElementById("sendMessage").disabled) {
      clearInterval(processID);
      initButton();
      return;
    }
    let mm = String(Math.floor(time / 60)).padStart(2, "0");
    let ss = String(time % 60).padStart(2, "0");
    let result = mm + ":" + ss;
    document.getElementById("timeLimit").innerText = result;
    time--;
  }, 50);
};

function checkCompletion(){
  alert("2 factor varification is done.")
  initButton();
  document.getElementById("completion").innerHTML="Authentication completed"
  document.getElementById("signUpButton").disabled = false;
  document.getElementById("signUpButton").setAttribute("style","background-color:#99ffd6;")
}


// For checking signup

function signUpCheck(){

  let email = document.getElementById("email").value
  let name = document.getElementById("name").value
  let password = document.getElementById("password").value
  let passwordCheck = document.getElementById("passwordCheck").value
  let area = document.getElementById("area").value
  let check = true;

  // check e-mail
  if(email.includes('@')){
    let emailId = email.split('@')[0]
    let emailServer = email.split('@')[1]
    if(emailId === "" || emailServer === ""){
      document.getElementById("emailError").innerHTML="e-."
      check = false
    }
    else{
      document.getElementById("emailError").innerHTML=""
    }
  }else{
    document.getElementById("emailError").innerHTML="Email is not valid."
    check = false
  }


  // checking name
  if(name===""){
    document.getElementById("nameError").innerHTML="The name is not valid."
    check = false
  }else{
    document.getElementById("nameError").innerHTML=""
  }


  // checking password
  if(password !== passwordCheck){
    document.getElementById("passwordError").innerHTML=""
    document.getElementById("passwordCheckError").innerHTML="The passwords are not the same."
    check = false
  }else{
    document.getElementById("passwordError").innerHTML=""
    document.getElementById("passwordCheckError").innerHTML=""
  }

  if(password===""){
    document.getElementById("passwordError").innerHTML="Enter the password."
    check = false
  }else{
    //document.getElementById("passwordError").innerHTML=""
  }
  if(passwordCheck===""){
    document.getElementById("passwordCheckError").innerHTML="Re-Enter the password."
    check = false
  }else{
    //document.getElementById("passwordCheckError").innerHTML=""
  }


  // Location
  if(area === "Choose location."){
    document.getElementById("areaError").innerHTML="Choose location."
    check = false
  }else{
    document.getElementById("areaError").innerHTML=""
  }
  
  if(check){
    document.getElementById("emailError").innerHTML=""
    document.getElementById("nameError").innerHTML=""
    document.getElementById("passwordError").innerHTML=""
    document.getElementById("passwordCheckError").innerHTML=""
    document.getElementById("areaError").innerHTML=""
    
    alert("Account is Created.")
	signUp()
  }
}

function signUp()
{
	let semail = document.getElementById("email").value
	let spassword = document.getElementById("password").value
	
	//console.log(`test: ${email} ${password}`)
	//console.log("sending request:")
	
	const xhr = new XMLHttpRequest()
	xhr.open('POST', 'http://localhost:3000/api/accounts')
	const stObj = {email: semail, password: spassword};

	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.onreadystatechange = function() {
		if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			window.location.replace("login.html");
		}
	}
	const jsonStr = JSON.stringify(stObj)
	//console.log(jsonStr)
	xhr.send(jsonStr)
}
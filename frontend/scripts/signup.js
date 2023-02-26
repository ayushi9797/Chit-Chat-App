// const url= "https://gray-tired-gharial.cyclic.app/"



const signupBtn= document.getElementById('loginBTN');

const registerUser= async()=>{
    const fname= document.getElementById('fName').value;
    const lname= document.getElementById('lName').value;
    const email= document.getElementById('email').value;
    const mobile= document.getElementById('mbl').value;
    const password= document.getElementById('pass').value;
    
    localStorage.setItem("lfirstName", JSON.stringify(fname))

    const user={fname,lname,email,mobile,password}

    try {
        const res= await fetch("http://localhost:2423/users/register",{
            method:'POST',
            body: JSON.stringify(user),
            headers:{
                'Content-type': "application/json"
            }
        });
       
        console.log("Register Succesfully");
      window.location.href= 'login.html'
        
    } catch (error) {
        console.log("Error while Register");
        console.log(error);
    }
}

signupBtn.onclick=()=>{
  registerUser();
}
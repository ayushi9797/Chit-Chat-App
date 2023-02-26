
   const loginBtn= document.getElementById('loginBtn')
   
   const loginUser= async()=>{
   
    const email= document.getElementById('email').value;
    const password= document.getElementById('passwrd').value;
    
    const user={email,password}

    try {
        const res= await fetch("http://localhost:2423/users/login",{
            method:'POST',
            body: JSON.stringify(user),
            headers:{
                'Content-type': "application/json"
            }
        });
       
        console.log("Login Succesfully");
      window.location.href= 'index2.html'
        
    } catch (error) {
        console.log("Error while Register");
        console.log(error);
    }
}

loginBtn.onclick=()=>{
  loginUser();
}
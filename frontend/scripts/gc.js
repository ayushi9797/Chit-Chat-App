// const groupname = document.getElementById("groupname");
// const username  = document.getElementById("username");
// const btn = document.getElementById("btn");
// const GName = document.getElementById("Group-Name");

// let selectedUsers =[];

// const staticDatas = async()=>{
//     try {
//         const data  = await fetch(`http://localhost:8080/chat`);
//         let modData = await data.json();
//             console.log(modData);
        
//             modData.forEach((el) => {
//                 let div= document.createElement("li");
//                     div.setAttribute("class", "gname");
//                 let Name = document.createElement("h3");
//                     Name.innerText = el.chatName;
        
//                     div.onclick = () =>{
//                         console.log(el);
//                         selectedUsers.push(el);
//                     }
            
//                 div.append(Name);
//                 GName.append(div);
//             });
            
//       } catch (error) {
//         console.log(error);
//       }
// }
// staticDatas();

// btn.onclick = async() =>{
//     // console.log(groupname.value);
//     // console.log(username.value);
// console.log(selectedUsers);
//     try {
//         const data  = await fetch(`http://localhost:8080/chat/group`, {
//             method: "POST",
//             body:JSON.stringify({name: groupname.value,
//                 users: JSON.stringify(selectedUsers.map((u) => u._id))}),
//                 headers: {
//                     'Content-type': 'application/json'
//                   }
//         });
//         console.log(data);

//         try {
//             const data  = await fetch(`http://localhost:8080/chat`);
//             let modData = await data.json();
//                 console.log(modData);
            
//                 modData.forEach((el) => {
//                     let div= document.createElement("li");
//                         div.setAttribute("class", "gname");
//                     let Name = document.createElement("h3");
//                         Name.innerText = el.chatName;
            
//                         div.onclick = () =>{
//                             console.log(el);
//                             selectedUsers.push(el);
//                         }
                
//                     div.append(Name);
//                     GName.append(div);
//                 });
                
//           } catch (error) {
//             console.log(error);
//           }
//       } catch (error) {
//         console.log(error);
//       }
// }

// username.onkeyup = async() =>{
//     try {
//         const data  = await fetch(`http://localhost:8080/user?search=${username.value}`);
//         let modData = await data.json();
//         console.log(modData);
//         append(modData);
//       } catch (error) {
//         console.log(error);
//       }

      
// }
// // craeting a group with users from db

// const append = (data) =>{
//     let container = document.getElementById("debouncebox");
//     data.forEach((el) => {
//         let div= document.createElement("div");
//             div.setAttribute("class", "box");
//         let Name = document.createElement("h3");
//             Name.innerText = el.name;

//             div.onclick = () =>{
//                 console.log(el);
//                 selectedUsers.push(el);
//             }
    
//         div.append(Name);
//         container.append(div);
//     });
// };






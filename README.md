## Project
> tangy-gese-4843

## Project name
> Chit--chat-application


# Chit Chat App
- Collaborative Project
   - Contributors
   - Ayushi Soni(Team Lead)
   - Dilip Sanap
   - Pavan Ingalagi
   - Manthan Pelne
   - Aniket Babariaya


## Objective
  -  Chat Chat is messaging app can support one-on-one and group chat functionality
   
   
   
   ![chit-chat-app](https://user-images.githubusercontent.com/112810259/230863588-6a8be60f-62e8-43f9-a187-d94c7faa5180.png)


# Tech Stack

 # FRONTEND
- React
- 

 # Backend
- Node.js
- Express
- MongoDb Atlas
- Mongoose
- Moment
- Socket.io

# Deployed link
https://chit-chat-app-buur.onrender.com





API endpoints
<!-- To start the server "npm start "-->
NO need to give token . Taken care by redis.cliet.Get

# Register
localhost:5000/register
-name
-email
-pass
-pic link

# login
localhost:5000/login
-email
-pass

1.***To Get All Users data
localhost:5000/user/

2.***To get data user by search

localhost:5000/user?search={name/email}

# Message Section (Individual)
<!-- Message Route -->

<!-- 1.Sending a Message Route -->
localhost:5000/message/
-POST request


<!-- 2.To get all chat in that room -->
-GET request

localhost:5000/message/:chatId


# Group Chat
<!--Access The Chat  -->

1.get All chat
localhost:5000/chat
-post

2.get all chat
localhost:5000/chat
-GET

<!-- 3.Create A group Chat -->
localhost:5000/chat/group
<!-- Need to provide -->
-name of Group
-add members

<!-- 4.Rename The Group -->
localhost:5000/chat/renameGroup
<!-- Need to provide -->
-chatId i.e. group ID
- new Name

<!-- 5.remove Member from Group -->
localhost:5000/chat/removeFromGroup
<!-- Need to provide -->
-chatId of group
-userId of member

<!-- 6.add Member from Group -->
localhost:5000/chat/addToGroup
<!-- Need to provide -->
-chatId
-_id of member

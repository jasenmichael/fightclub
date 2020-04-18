# FIGHTCLUB

### Bugs
- fix get socket user data when logging in with valid token
- 

### To Do:
- chat component
- chat sound effects - change sound
- all data in store
- chat componenet
- server status
- api routes
  - POST /register {name, email, passsword} //create tmp user, sned email with verification code
  - POST /users/:name/verify {emailKey} //verifies email key, and creates user
  - POST /users/add {user} //
  - DELETE /users/:name/delete
  - GET /users/:name/stats


#### Store
- public
  - pvpgn {status, version, channels, users, users_online}
- authenticated
  - pvpgn.gateway {name, zone, ip}
- 



### Pages

### Components
- Login
- User
- Pvpgn
  - Status
  - Gateway
- Chat
  - Messages
  - Users 
- Nav
  - Top
  - Left
  - Right
  - Bottom 

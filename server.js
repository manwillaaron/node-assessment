const express = require("express");
const uCtrl = require("./usersCtrl");
const app = express();
app.use(express.json());

const serverPort = 3000

// 'GET' /api/user
app.get('/api/user', uCtrl.getUser)
// 'GET' /api/user/ + userId
app.get('/api/user/:userId', uCtrl.getUserWithId)
// 'GET' /api/admin
app.get('/api/admin', uCtrl.getAdminUsers)
// 'GET' /api/nonadmin
app.get('/api/nonadmin', uCtrl.getNonAdmin)
// 'GET' /api/type/ + userType
app.get('/api/type/:userType', uCtrl.getUserByType)
// 'PUT' /api/user/ + userId
app.put('/api/user/:userId', uCtrl.updateInfo)
// 'POST' /api/user
app.post('/api/user', uCtrl.addUser)
// 'DELETE' /api/user/ + userId
app.delete('/api/user/:userId', uCtrl.deleteUser)

app.listen(serverPort, () =>{
    console.log(`server is listening on ${serverPort}`);
})

const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const formatMessage = require('./utils/mesasges');
const { userJoin, getCurrentUser,userLeave,getRoomUsers } = require('./utils/users');

const app = express();
const http = require("http").createServer(app);
const io = require('socket.io')(http, {
  cors: {origin : '*'}
});

var corsOptions = {
  origin: ["http://localhost:4200"],
  credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "taxi-app",
    secret: "COOKIE_SECRET",
    httpOnly: true
  })
);
mongoose.connect("mongodb://localhost:27017/taxi",{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000, 
    family: 4 
}).then(() => {
    console.log('database connected');
}).catch(error => {
    console.log('database not connected',error);
})

app.get("/", (req, res) => {
  res.json({ message: "hello world." });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/read.routes")(app);
require("./app/routes/create.routes")(app);
require("./app/routes/email.routes")(app);
require("./app/routes/update.routes")(app);


io.on('connection', (socket) => {
  socket.on('joinRoom', ({username,room}) => {
    const user = userJoin(socket.id,username,room);
    socket.join(user.room);
    socket.emit('message',formatMessage("taxiapp",'user joined'));
    socket.broadcast.to(user.room).emit('message',formatMessage('taxibot', ` ${user.username} joined the chat`));
  });
  socket.on('chatMessage', (message) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message',formatMessage(user.username,message));
  });
  socket.on('disconnect',() => {
    io.emit('message',formatMessage('taxibot','user disconnected'));
  });  
});

http.listen(3000, () => {
  console.log(`Server is running on port 3000.`);
});

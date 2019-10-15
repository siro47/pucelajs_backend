const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: '10mb' }));

app.post('/message', (req,res,next) => {
    io.emit("premMessage", req.body.msg);
    res.status(201).json({});
});

http.listen(3000);
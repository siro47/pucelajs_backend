const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyparser = require('body-parser');
const randomSentence = require('random-sentence');


app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: '10mb' }));

setInterval(() => {
    if (Math.random() <= 0.1)
        io.emit("stdMessage", randomSentence({words: 5}))
}, 20);

app.post('/message', (req,res,next) => {
    io.emit("premMessage", req.body.msg);
    res.status(201).json({});
});

http.listen(3000);
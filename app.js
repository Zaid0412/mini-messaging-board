const { getRandomName, getNRandomNames, names } = require('fancy-random-names');
const msgControllers = require('./controllers/msgControllers')
const db = require('./db/queries')
const express = require('express')
const path = require("node:path");
const app = express()
const PORT = 3000
const getTime = (date) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const time = new Date().toLocaleString("en-US", { timeZone}).split(',')
  const parts = time[1].split(':')
  const [hour, mins, secs] = parts
  const [_, AmPm] = secs.split(' ')
  return `${time[0]} ,${hour}:${mins} ${AmPm}`
}
// const changeNameBtn = document.querySelector('.change-name-btn')
// const changeNameDialog = document.querySelector('.change-name-dialog')

let userName = getRandomName()

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => { 
    msgControllers.getMsgs().then(msgs => {
      const messages = []
      msgs.map(msg => {
        messages.push({
          text: msg.text,
          user: msg.username,
          added: msg.added,
          time: getTime(msg.added)
        })
      })
      console.log(messages)
      res.render("index", {messages, userName});
    })
});

app.post('/new', (req, res) => {
  if (req.body.messageText) { 
    db.insertMsg(req.body.messageText, userName, new Date())
    res.redirect('/')
  }
})


app.post('/username', (req, res) => {
  console.log(req.body)
  userName = req.body.newUsername
  res.redirect('/')
})

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})


const testFunc = () => {
  console.log('test function!')
}
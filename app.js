const { getRandomName, getNRandomNames, names } = require('fancy-random-names');
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
const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date(),
      time: getTime(new Date)
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date(),
      time: getTime(new Date)
    }
];

// const changeNameBtn = document.querySelector('.change-name-btn')
// const changeNameDialog = document.querySelector('.change-name-dialog')

let userName = getRandomName()

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", {messages, userName});
});

app.post('/new', (req, res) => {
  if (req.body.messageText) { 
    messages.push({ text: req.body.messageText, user: userName, added: new Date(), time: getTime(new Date())});
    console.log(messages)
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
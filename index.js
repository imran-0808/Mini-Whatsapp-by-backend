const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js"); //import chat.js file
const methodOverride = require("method-override"); //import method override

app.set("views", path.join(__dirname, "views")); //path required
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); //used for serve the file, ki hum file ko kaha se serve karenge, jaise yaha public se karenge
app.use(express.urlencoded({ extended: true })); //it used for parsing the data, by this body se jo bhi data aata hai POST req (req.body) mein use acche se access kar sakte hain
app.use(methodOverride("_method")); //and here used method override   

//setup mongoose here
main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
} //.

//Denoted data
let chat1 = new Chat({
  from: "azam",
  to: "imran",
  msg: "send me your exam sheets",
  created_at: new Date(),
});

chat1.save().then((res) => {
  console.log(res);
}); //.

// index Route
app.get("/chats", async (req, res) => {
  //create chat route
  let chats = await Chat.find(); //yaha find methos se all objects show ho jayengi
  // console.log(chats);
  res.render("index.ejs", { chats }); //yaha index.ejs ko render kiya aur chats ko pass kar diya
});

//New Route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//Create Route
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });
  newChat
    .save()
    .then((res) => {
      console.log("chat was saved");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats"); //redirect on /chat URL
});

// Edit Route, used for chat update
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

//Update Route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );

  console.log(updatedChat)
  res.redirect("/chats")
});

//Destroy Route for deleting the chat
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat)
  res.redirect("/chats")
})
  
//   setup express.js
app.get("/", (req, res) => {
  res.send("Express is working");
});

app.listen(8080, () => {
  console.log("server is listening on port 8080");
}); //.

const mongoose = require("mongoose");
const Chat = require("./models/chat.js");//import chat.js file

        //mongoose setup
main().then((res) => {
    console.log("Connection successfully");
}).catch(err => {
    console.log(err);
})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats = [ //store the data in array 
{
  from: "suhail",
  to: "arif",
  msg: "teach me opps concept",
  created_at: new Date(), 
},
{
  from: "taif",
  to: "rehman",
  msg: "give me business idea",
  created_at: new Date(), 
},
{
  from: "faim",
  to: "sameer",
  msg: "give me some money",
  created_at: new Date(), 
},
{
  from: "akram",
  to: "sultan",
  msg: "send me your exam sheets",
  created_at: new Date(), 
},
]

Chat.insertMany(allchats);//here insert the data

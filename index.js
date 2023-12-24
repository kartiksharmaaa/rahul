const {
    MessageAttachment,
    Client,
    Collection,
  } = require("discord.js-selfbot-v13");
const express = require("express");
const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

require("./accounts/sohail.js");